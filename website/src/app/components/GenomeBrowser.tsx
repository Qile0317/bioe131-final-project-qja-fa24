// 'use client';
// import { createViewState, JBrowseLinearGenomeView } from '@jbrowse/react-linear-genome-view';

// // export default function GenomeBrowser({ genomeUrl }: GenomeBrowserProps) {
// export default function GenomeBrowser({assemblyName = "China_(Wuhan).fna"}) {
//   const loc: string = assemblyName.slice(0, -4);
//   const state = createViewState({
//     assembly: {
//       name: assemblyName,
//       sequence: {
//         type: 'ReferenceSequenceTrack',
//         trackId: `Reference Track (${assemblyName})`,
//         adapter: {
//           type: 'IndexedFastaAdapter',
//           fastaLocation: {
//             uri: `./genome_data/${loc}/${assemblyName}`
//           },
//           faiLocation: {
//             uri: `./genome_data/${loc}/${assemblyName}.fai`
//           }
//         }
//       }
//     },
//     tracks: [
//         {
//             type: 'FeatureTrack',
//             trackId: 'genes',
//             name: 'Genes',
//             assemblyNames: [`${assemblyName}`],
//             category: ['Genes'],
//             adapter: {
//                 type: 'Gff3TabixAdapter',
//                 gffGzLocation: {
//                 uri: `./genome_data/${loc}/${loc}_genes.gff.gz`,
//                 },
//                 index: {
//                   location: {
//                       uri: `./genome_data/${loc}/${loc}_genes.gff.gz.tbi`,
//                   },
//                 },
//             }
//         },
//     ],
//     defaultSession: {
//       name: 'COVID-19 Browser',
//       view: {
//         id: 'linearGenomeView',
//         type: 'LinearGenomeView'
//       }
//     }
//   });

//   return (
//     <div className="w-full h-[600px] bg-white rounded-lg shadow-lg p-4">
//       <JBrowseLinearGenomeView viewState={state} />
//     </div>
//   );
// }
