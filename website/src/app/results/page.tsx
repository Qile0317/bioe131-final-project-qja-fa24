'use client';
import { useState, useEffect, Suspense } from 'react';
import { parse } from 'papaparse';
import alasql from 'alasql';
import { useSearchParams } from 'next/navigation';
import WorldMap from '../components/WorldMap';
import GenomeBrowser from '../components/GenomeBrowser';

type TabularDataRow = {
  id: string;
  [key: string]: string | number;
}

function createTabularDataRowArray(jsonArray: any[]): TabularDataRow[] {
  return jsonArray.map((item) => {
    const { id, ...rest } = item;
    return {
      id: String(id),
      ...rest
    };
  });
}

function column(data: TabularDataRow[], columnName: string): (string | number)[] {
  return data.map(row => row[columnName]);
}

function ResultsPage() {
  
  const [selectedGenome, setSelectedGenome] = useState<string>("China_(Wuhan).fna"); // TODO should be the first in filtered db

  // load metadata into array of jsons with papaparse
  const [metadata, setMetadata] = useState<TabularDataRow[]>([]);
  useEffect(() => {
    const filePath = process.env.NEXT_PUBLIC_BASE_PATH + "/genome_data/metadata.csv";
    parse(filePath, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (results) {
        setMetadata(createTabularDataRowArray(results.data));
      },
      error: function (error) {
        console.error("Error parsing CSV:", error);
      }
    });
  }, []);

  // handle metadata filtering
  const searchParams = useSearchParams();
  const metadataQuery = searchParams.get('metadata') || null;
  useEffect(() => {
    if (metadata.length > 0) {
      const query = "SELECT * FROM ?" +
        (metadataQuery !== null ? " WHERE " + decodeURIComponent(metadataQuery as string) : "");
      const result = alasql(query, [metadata]);
      setMetadata(result);
    }
  }, [metadata, metadataQuery]);

  const [selectedResult, setSelectedResult] = useState(metadata[0]);
  
  const handleDownload = () => {
    console.log('Downloading results');
  };

  // tab content on the rhs
  const [activeTab, setActiveTab] = useState('Geolocation');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-3 gap-8">

        {/* Results List */}
        <div className="border border-gray-700 rounded p-4 col-span-1">
          <h2 className="text-2xl font-bold mb-4">Query Results</h2>
          <div className="overflow-y-auto max-h-[600px]">
            {metadata.map((result) => (
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
            {['Geolocation', 'Jbrowse2'].map((tab) => (
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

          {/* Visualization tabs */}
          <div className="flex-grow bg-gray-800 flex items-center justify-center rounded overflow-y-auto">
            {activeTab === 'Geolocation' && (
              <WorldMap onCountrySelect={(country) => setSelectedGenome(country.genomeAssembly)} />
            )}
            {activeTab === 'Jbrowse2' && (
              <GenomeBrowser assemblyNames={(column(metadata, "country") as string[]).map(c => c + ".fna")} />
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
          </div>
        </div>
      </main>
    </div>
  );
}

const ResultsPageWrapper = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-solid mx-auto mb-6"></div>
          <p className="text-white text-xl">Loading your results...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait while we fetch the data</p>
        </div>
      </div>
    }>
      <ResultsPage />
    </Suspense>
  );
};

export default ResultsPageWrapper;
