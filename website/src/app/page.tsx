"use client";
import { useState } from 'react';

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [metadataQuery, setMetadataQuery] = useState('');

  const handleSearch = () => {
    const targetUrl = metadataQuery
      ? `${basePath}/results?metadata=${encodeURIComponent(metadataQuery)}`
      : `${basePath}/results?fetchAll=true`;
    window.location.href = targetUrl;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Virus Sequence Database</h1>

        <div className="mb-6">
          <label htmlFor="metadata-query" className="block mb-2 font-semibold">
            Metadata SQL Query
          </label>
          <input
            id="metadata-query"
            value={metadataQuery}
            onChange={(e) => setMetadataQuery(e.target.value)}
            placeholder="e.g., country = 'China'"
            className="w-full p-2 border rounded bg-white text-black placeholder-gray-500"
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Search Database (Click with no input for all data)
          </button>
        </div>
      </main>
    </div>
  );
}
