// this is an unfinished and experimental component that demonstrates how to load and parse a zipped database file containing CSV, FASTA, and GFF files.

// 'use client';
// import React, { useState, useEffect, useCallback } from 'react';
// import { unzip } from 'unzipit';
// import Papa from 'papaparse';

// interface DatabaseMetadata {
//   name: string;
//   path: string;
// }

// interface DatabaseEntry {
//   fileName: string;
//   metadata: Record<string, string>;
//   fastaContent: string;
//   gffContent: string;
// }

// const DEFAULT_DATABASES = [
//   {
//     name: 'Default Virus Database',
//     path: '/default-database.zip' // Statically served from public folder
//   }
// ];

// const DatabaseLoader: React.FC = () => {
//   const [databases, setDatabases] = useState<DatabaseMetadata[]>(DEFAULT_DATABASES);
//   const [currentDatabase, setCurrentDatabase] = useState<DatabaseMetadata | null>(DEFAULT_DATABASES[0]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadedDatabase, setLoadedDatabase] = useState<DatabaseEntry[]>([]);

//   const loadDatabase = useCallback(async (databaseMetadata: DatabaseMetadata) => {
//     setIsLoading(true);
//     try {
//       // Fetch the zip file
//       const response = await fetch(databaseMetadata.path);
//       const blob = await response.blob();

//       // Unzip the file
//       const { entries } = await unzip(blob);

//       // Track loaded entries
//       const processedEntries: DatabaseEntry[] = [];

//       // Identify CSV, FASTA, and GFF files
//       const csvFile = Object.keys(entries).find(name => name.endsWith('.csv'));
//       const fastaFiles = Object.keys(entries).filter(name => name.endsWith('.fasta') || name.endsWith('.fna'));
//       const gffFiles = Object.keys(entries).filter(name => name.endsWith('.gff'));

//       // Parse metadata from CSV
//       if (csvFile) {
//         const csvContent = await entries[csvFile].text();
//         const metadata = Papa.parse(csvContent, { header: true }).data as Record<string, string>[];

//         // Match FASTA and GFF files with metadata
//         for (const fastaFileName of fastaFiles) {
//           const baseName = fastaFileName.replace(/\.(fasta|fna)$/, '');
//           const matchingMetadata = metadata.find(row => row.name === baseName);
          
//           const fastaContent = await entries[fastaFileName].text();
//           const gffFileName = gffFiles.find(name => name.startsWith(baseName) && name.endsWith('.gff'));
//           const gffContent = gffFileName ? await entries[gffFileName].text() : '';

//           processedEntries.push({
//             fileName: baseName,
//             metadata: matchingMetadata || {},
//             fastaContent,
//             gffContent
//           });
//         }
//       }

//       setLoadedDatabase(processedEntries);
//       setCurrentDatabase(databaseMetadata);
//     } catch (error) {
//       console.error('Database loading error:', error);
//       // Optionally, add error handling UI
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // Load default database on component mount
//   useEffect(() => {
//     loadDatabase(DEFAULT_DATABASES[0]);
//   }, [loadDatabase]);

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const newDatabase: DatabaseMetadata = {
//         name: file.name,
//         path: URL.createObjectURL(file)
//       };
//       await loadDatabase(newDatabase);
//       setDatabases(prev => [...prev, newDatabase]);
//     }
//   };

//   return (
//     <div className="database-loader">
//       {isLoading ? (
//         <div>Loading database...</div>
//       ) : (
//         <>
//           <div className="database-selector">
//             <label>
//               Select Database:
//               <select 
//                 value={currentDatabase?.name} 
//                 onChange={(e) => {
//                   const selected = databases.find(db => db.name === e.target.value);
//                   if (selected) loadDatabase(selected);
//                 }}
//               >
//                 {databases.map(db => (
//                   <option key={db.name} value={db.name}>{db.name}</option>
//                 ))}
//               </select>
//             </label>
//             <input 
//               type="file" 
//               accept=".zip" 
//               onChange={handleFileUpload} 
//               className="file-upload"
//             />
//           </div>
//           <div>
//             {/* Optional: Display loaded database summary */}
//             Loaded {loadedDatabase.length} entries
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default DatabaseLoader;