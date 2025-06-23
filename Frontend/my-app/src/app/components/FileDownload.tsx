'use client';

import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';


interface FileDownloadProps {
  onDownload: (port: number) => Promise<void>;
  isDownloading: boolean;
}

export default function FileDownload({ onDownload, isDownloading }: FileDownloadProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const { setDownloads, setSpeed } = useStatus();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const port = parseInt(inviteCode.trim(), 10);
    if (isNaN(port) || port <= 0 || port > 65535) {
      setError('Please enter a valid port number (1-65535)');
      return;
    }
    
    try {
      // Update status before starting download
      setDownloads(prev => prev + 1);
      
      // Simulate download progress (replace with actual progress callbacks from your P2P library)
      const progressInterval = setInterval(() => {
        const randomSpeed = Math.random() * 2 + 0.5; // Random speed between 0.5-2.5 MB/s
        setSpeed(prev => ({
          ...prev,
          download: `${randomSpeed.toFixed(1)} MB/s`
        }));
      }, 1000);
      
      await onDownload(port);
      
      // Clean up after download completes
      clearInterval(progressInterval);
      setDownloads(prev => prev - 1);
      setSpeed(prev => ({
        ...prev,
        download: '0 KB/s'
      }));
      
    } catch (err) {
      setError('Failed to download the file. Please check the invite code and try again.');
      setDownloads(prev => prev > 0 ? prev - 1 : 0);
      setSpeed(prev => ({
        ...prev,
        download: '0 KB/s'
      }));
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Receive a File</h3>
        <p className="text-sm text-blue-600 mb-0">
          Enter the invite code shared with you to download the file.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 mb-1">
            Invite Code
          </label>
          <input
            type="text"
            id="inviteCode"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="Enter the invite code (port number)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isDownloading}
            required
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={isDownloading}
        >
          {isDownloading ? (
            <span>Downloading...</span>
          ) : (
            <>
              <FiDownload className="mr-2" />
              <span>Download File</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}