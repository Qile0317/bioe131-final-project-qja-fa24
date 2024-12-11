'use client';
import { useState } from 'react';
import Image from 'next/image';
import WorldMap from '../components/WorldMap';

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
  const [selectedGenome, setSelectedGenome] = useState<string>("China_(Wuhan).fna");
  const [queryResults] = useState(processStaticDatabase());
  const [selectedResult, setSelectedResult] = useState(queryResults[0]);
  const [activeTab, setActiveTab] = useState('Visualization 1');

  const handleDownload = () => {
    console.log('Downloading results');
  };

  const handleJBrowse = () => {
    console.log('Opening in JBrowse');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-3 gap-8">
        {/* Results List */}
        <div className="border border-gray-700 rounded p-4 col-span-1">
          <h2 className="text-2xl font-bold mb-4">Query Results</h2>
          <div className="overflow-y-auto max-h-[600px]">
            {queryResults.map((result) => (
              <div
                key={result.id}
                onClick={() => setSelectedResult(result)}
                className={`p-2 cursor-pointer hover:bg-gray-800 text-white ${
                  selectedResult?.id === result.id ? 'bg-gray-600' : ''
                }`}
              >
                {Object.entries(result).map(([key, value]) =>
                  key !== 'id' ? (
                    <p key={key}>
                      <strong>{key}:</strong> {value}
                    </p>
                  ) : null
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tabbed Visualization and Actions */}
        <div className="border border-gray-700 rounded p-4 col-span-2 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Visualizations</h2>

          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            {['Visualization 1', 'Visualization 2', 'Visualization 3'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded ${
                  activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                } hover:bg-gray-600`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-grow bg-gray-800 flex items-center justify-center rounded">
            {activeTab === 'Visualization 1' && (
              <WorldMap onCountrySelect={(country) => setSelectedGenome(country.genomeAssembly)} />
            )}
            {activeTab === 'Visualization 2' && (
              <Image
                src="/placeholder-chart2.svg"
                alt="Visualization 2 Placeholder"
                width={800}
                height={400}
              />
            )}
            {activeTab === 'Visualization 3' && (
              <Image
                src="/placeholder-chart3.svg"
                alt="Visualization 3 Placeholder"
                width={800}
                height={400}
              />
            )}
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