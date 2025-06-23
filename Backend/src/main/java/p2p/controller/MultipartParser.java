package p2p.controller;

public class MultipartParser {
    private final byte[] data;
    private final String boundary;

    public MultipartParser(byte[] data, String boundary) {
        this.data = data;
        this.boundary = boundary;
    }

    public ParseResult parse() {
        try {
            String dataAsString = new String(data);

            String filenameMarker = "filename=\"";
            int filenameStart = dataAsString.indexOf(filenameMarker);
            if (filenameStart == -1) return null;

            filenameStart += filenameMarker.length();
            int filenameEnd = dataAsString.indexOf("\"", filenameStart);
            String filename = dataAsString.substring(filenameStart, filenameEnd);

            String contentTypeMarker = "Content-Type: ";
            int contentTypeStart = dataAsString.indexOf(contentTypeMarker, filenameEnd);
            String contentType = "application/octet-stream";

            if (contentTypeStart != -1) {
                contentTypeStart += contentTypeMarker.length();
                int contentTypeEnd = dataAsString.indexOf("\r\n", contentTypeStart);
                contentType = dataAsString.substring(contentTypeStart, contentTypeEnd);
            }

            String headerEndMarker = "\r\n\r\n";
            int headerEnd = dataAsString.indexOf(headerEndMarker);
            if (headerEnd == -1) return null;

            int contentStart = headerEnd + headerEndMarker.length();

            byte[] boundaryBytes = ("\r\n--" + boundary + "--").getBytes();
            int contentEnd = findSequence(data, boundaryBytes, contentStart);

            if (contentEnd == -1) {
                boundaryBytes = ("\r\n--" + boundary).getBytes();
                contentEnd = findSequence(data, boundaryBytes, contentStart);
            }

            if (contentEnd == -1 || contentEnd <= contentStart) return null;

            byte[] fileContent = new byte[contentEnd - contentStart];
            System.arraycopy(data, contentStart, fileContent, 0, fileContent.length);

            return new ParseResult(filename, contentType, fileContent);
        } catch (Exception e) {
            System.err.println("Error parsing multipart data: " + e.getMessage());
            return null;
        }
    }

    private int findSequence(byte[] data, byte[] sequence, int startPos) {
        outer:
        for (int i = startPos; i <= data.length - sequence.length; i++) {
            for (int j = 0; j < sequence.length; j++) {
                if (data[i + j] != sequence[j]) continue outer;
            }
            return i;
        }
        return -1;
    }

    public static class ParseResult {
        public final String filename;
        public final String contentType;
        public final byte[] fileContent;

        public ParseResult(String filename, String contentType, byte[] fileContent) {
            this.filename = filename;
            this.contentType = contentType;
            this.fileContent = fileContent;
        }
    }
}
