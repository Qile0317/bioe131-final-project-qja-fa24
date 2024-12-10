'use client';
import { useState } from 'react';
<<<<<<< HEAD
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
=======
>>>>>>> main

export default function CustomizeDatabasePage() {
  const [databaseUrl, setDatabaseUrl] = useState('');
  const [localFile, setLocalFile] = useState<File | null>(null);

  const handleUrlSubmit = () => {
    // Implement database update from URL
    console.log('Updating database from URL:', databaseUrl);
  };

  const handleLocalFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLocalFile(file);
    }
  };

  const handleLocalFileSubmit = () => {
    // Implement database update from local file
    console.log('Updating database from local file:', localFile);
  };

  return (
    <div className="min-h-screen flex flex-col">
<<<<<<< HEAD
      <Navbar />
=======
>>>>>>> main
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Customize Virus Database
        </h1>

        {/* URL Update Section */}
        <div className="mb-8 p-6 border rounded">
          <h2 className="text-2xl font-semibold mb-4">
            Update from URL
          </h2>
          <div className="flex space-x-4">
            <input 
              type="url"
              value={databaseUrl}
              onChange={(e) => setDatabaseUrl(e.target.value)}
              placeholder="Enter database URL"
              className="flex-grow p-2 border rounded"
            />
            <button 
              onClick={handleUrlSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update from URL
            </button>
          </div>
        </div>

        {/* Local File Upload Section */}
        <div className="p-6 border rounded">
          <h2 className="text-2xl font-semibold mb-4">
            Upload Local Database
          </h2>
          <div className="flex space-x-4">
            <input 
              type="file" 
              accept=".csv,.zip" 
              onChange={handleLocalFileUpload}
              className="flex-grow"
            />
            <button 
              onClick={handleLocalFileSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={!localFile}
            >
              Upload Database
            </button>
          </div>
        </div>
      </main>
<<<<<<< HEAD
      <Footer />
=======
>>>>>>> main
    </div>
  );
}
