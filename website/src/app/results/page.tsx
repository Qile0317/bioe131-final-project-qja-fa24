'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

// Placeholder for actual query results
const sampleResults = [
    { name: 'Virus Sample 1', location: 'USA', year: 2022 },
    { name: 'Virus Sample 2', location: 'Europe', year: 2021 },
    { name: 'Virus Sample 3', location: 'Asia', year: 2023 }
  ];
  
  export default function ResultsPage() {
    const [selectedResult, setSelectedResult] = useState(sampleResults[0]);
  
    const handleDownload = () => {
      // Implement download logic
      console.log('Downloading results');
    };
  
    const handleJBrowse = () => {
      // Redirect to JBrowse page
      console.log('Opening in JBrowse');
    };
  
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-2 gap-8">
          {/* Results List */}
          <div className="border rounded p-4">
            <h2 className="text-2xl font-bold mb-4">Query Results</h2>
            <div className="overflow-y-auto max-h-[600px]">
              {sampleResults.map((result) => (
                <div 
                  key={result.name}
                  onClick={() => setSelectedResult(result)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    selectedResult.name === result.name ? 'bg-blue-100' : ''
                  }`}
                >
                  <h3 className="font-semibold">{result.name}</h3>
                  <p>Location: {result.location}</p>
                  <p>Year: {result.year}</p>
                </div>
              ))}
            </div>
          </div>
  
          {/* Visualization and Actions */}
          <div className="border rounded p-4 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">
              {selectedResult.name} Visualization
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
        <Footer />
      </div>
    );
  }