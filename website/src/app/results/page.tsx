'use client';
import { useState } from 'react';
import Image from 'next/image';

// Static database simulation
const staticDatabase = [
  { id: 1, name: 'Virus Sample 1', location: 'USA', year: 2022 },
  { id: 2, name: 'Virus Sample 2', location: 'Europe', year: 2021 },
  { id: 3, name: 'Virus Sample 3', location: 'Asia', year: 2023 },
];

// Static processing function
const processStaticDatabase = () => {
  return staticDatabase.map((entry) => ({ ...entry }));
};

export default function ResultsPage() {
  const [queryResults] = useState(processStaticDatabase());
  const [selectedResult, setSelectedResult] = useState(queryResults[0]);

  const handleDownload = () => {
    console.log('Downloading results');
  };

  const handleJBrowse = () => {
    console.log('Opening in JBrowse');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-2 gap-8">
        {/* Results List */}
        <div className="border rounded p-4">
          <h2 className="text-2xl font-bold mb-4">Query Results</h2>
          <div className="overflow-y-auto max-h-[600px]">
            {queryResults.map((result) => (
              <div 
                key={result.id}
                onClick={() => setSelectedResult(result)}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  selectedResult?.id === result.id ? 'bg-blue-100' : ''
                }`}
              >
                {Object.entries(result).map(([key, value]) => (
                  key !== 'id' && (
                    <p key={key}><strong>{key}:</strong> {value}</p>
                  )
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Visualization and Actions */}
        <div className="border rounded p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">
            {selectedResult?.name} Visualization
          </h2>
          
          {/* Placeholder for Visualization */}
          <div className="flex-grow bg-gray-100 flex items-center justify-center">
            <Image 
              src="/placeholder-chart.svg" 
              alt="Visualization Placeholder" 
              width={400} 
              height={300} 
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex space-x-4 justify-center">
            <button 
              onClick={handleDownload}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download Results
            </button>
            <button 
              onClick={handleJBrowse}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Open in JBrowse
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
