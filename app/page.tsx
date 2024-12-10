'use client';
import { useState } from 'react';
import WorldMap from '../components/WorldMap';
import GenomeBrowser from '../components/GenomeBrowser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [selectedGenome, setSelectedGenome] = useState<string>("China_(Wuhan).fna");
  // var selectedGenome = 'China_(Wuhan).fna';
  // return (
  //   // <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
  //   //   <div className="container mx-auto py-8 w-full max-w-5xl">
  //   //     <h1 className="text-4xl font-bold mb-8 text-center text-slate-800">
  //   //         COVID-19 Global Genome Browser
  //   //     </h1>
        
  //   //     <div className="space-y-8">
  //   //         <div className="w-full max-w-4xl mx-auto">
  //   //         <WorldMap onCountrySelect={(country) => setSelectedGenome(country.genomeUrl)} />
  //   //         </div>
            
  //   //         {selectedGenome ? (
  //   //         <div className="animate-fade-in">
  //   //             <GenomeBrowser genomeUrl={selectedGenome} />
  //   //         </div>
  //   //         ) : (
  //   //         <div className="text-center text-slate-600 opacity-75">
  //   //             Select a country on the map to view its COVID-19 genome data
  //   //         </div>
  //   //         )}
  //   //     </div>
  //   //   </div>
  //   // </div>
    
  //   // <WorldMap onCountrySelect={(country) => setSelectedGenome(country.genomeUrl)} />
  //   // <div className="relative w-64 h-64">
  //   //     <div className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-50">
  //   //       <WorldMap onCountrySelect={(country) => setSelectedGenome(country.genomeUrl)} />
  //   //     </div>
  //   // </div>

  //   <div className="min-h-screen w-full p-4">
  //     <div className="min-h-screen w-full">
  //       <WorldMap onCountrySelect={(country) => setSelectedGenome(country.genomeUrl)} />
  //     </div>
  //   </div>
  // );
return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Virus Genome Database</h1>
        
        {/* FASTA Sequence Search */}
        <div className="mb-6">
          <label htmlFor="fasta-input" className="block mb-2 font-semibold">
            Enter FASTA Sequence or Upload File
          </label>
          <div className="flex space-x-4">
            <textarea 
              id="fasta-input"
              placeholder="Paste FASTA sequence here..."
              className="flex-grow p-2 border rounded bg-white text-black placeholder-gray-500"
              rows={4}
            />
            <input 
              type="file" 
              accept=".fasta,.fna" 
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
            placeholder="e.g., LOCATION = 'USA' AND YEAR > 2020"
            className="w-full p-2 border rounded bg-white text-black placeholder-gray-500"
          />
        </div>

        <div className="text-center">
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Search Database
          </button>
        </div>
      </main>


    {/* <div
      style={{
        backgroundImage: "url('/world-map.svg')",
        backgroundSize: "contain", // Makes the SVG scale proportionally
        backgroundRepeat: "no-repeat", // Prevents tiling
        backgroundPosition: "center", // Centers the SVG
        width: "100vw", // Full viewport width
        height: "50vh" // Adjust height proportionally
      }}
    /> */}
    {/* const setSelectedGenome = (assName: string) => {
      selectedGenome = assName;
    }; */}

    <GenomeBrowser assemblyName={selectedGenome}/>
    <WorldMap onCountrySelect={(country) => setSelectedGenome(country.genomeAssembly)} />
    <Footer />
    </div>
  );
}