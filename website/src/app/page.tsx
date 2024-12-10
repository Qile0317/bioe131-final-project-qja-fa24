'use client';
import { useState } from 'react';

export default function Home() {
  const [fastaSequence, setFastaSequence] = useState('');
  const [metadataQuery, setMetadataQuery] = useState('');
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileUpload(file);
    }
  };

  const handleSearch = () => {
    // If no specific inputs are given, return entire database
    if (!fastaSequence && !metadataQuery && !fileUpload) {
      window.location.href = process.env.NEXT_PUBLIC_BASE_PATH 
        ? `${process.env.NEXT_PUBLIC_BASE_PATH}/results?fetchAll=true`
        : '/results?fetchAll=true';
      return;
    }
  
    // Redirect to results page with search parameters
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    window.location.href = `${basePath}/results?fasta=${encodeURIComponent(fastaSequence)}&metadata=${encodeURIComponent(metadataQuery)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Virus Sequence Database</h1>
        
        {/* FASTA Sequence Search */}
        <div className="mb-6">
          <label htmlFor="fasta-input" className="block mb-2 font-semibold">
            Enter FASTA Sequence or Upload File
          </label>
          <div className="flex space-x-4">
            <textarea 
              id="fasta-input"
              value={fastaSequence}
              onChange={(e) => setFastaSequence(e.target.value)}
              placeholder="Paste FASTA sequence here..."
              className="flex-grow p-2 border rounded bg-white text-black placeholder-gray-500"
              rows={4}
            />
            <input 
              type="file" 
              accept=".fasta,.fna" 
              onChange={handleFileUpload}
              className="self-start"
            />
          </div>
        </div>

        {/* Metadata Query - TODO input sanitization! */}
        <div className="mb-6">
          <label htmlFor="metadata-query" className="block mb-2 font-semibold">
            Metadata SQL Query
          </label>
          <input 
            id="metadata-query"
            value={metadataQuery}
            onChange={(e) => setMetadataQuery(e.target.value)}
            placeholder="e.g., LOCATION = 'USA' AND YEAR > 2020"
            className="w-full p-2 border rounded bg-white text-black placeholder-gray-500"
          />
        </div>

        <div className="text-center">
          <button 
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Search Database
          </button>
        </div>
      </main>
    </div>
  );
}
