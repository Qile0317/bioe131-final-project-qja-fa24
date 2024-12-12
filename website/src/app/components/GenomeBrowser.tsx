'use client';

import React, { useState, useEffect } from 'react';
import { createViewState, JBrowseApp } from '@jbrowse/react-app';
import makeWorkerInstance from '@jbrowse/react-app/esm/makeWorkerInstance';
import '@fontsource/roboto';
import { createRoot, hydrateRoot } from 'react-dom/client';

type ViewModel = ReturnType<typeof createViewState>

export default function GenomeBrowser({ assemblyName = 'China_(Wuhan).fna' }) {

  const [viewState, setViewState] = useState<ViewModel | null>(null);
  
  const loc = assemblyName.slice(0, -4);

  useEffect(() => {
    const state = createViewState({
      config: {
        assemblies: [
          {
            name: assemblyName,
            sequence: {
              type: 'ReferenceSequenceTrack',
              trackId: 'Reference Track (' + assemblyName + ')',
              adapter: {
                type: 'IndexedFastaAdapter',
                fastaLocation: {
                  uri: process.env.NEXT_PUBLIC_BASE_PATH + '/genome_data/' + loc + '/' + assemblyName,
                },
                faiLocation: {
                  uri: process.env.NEXT_PUBLIC_BASE_PATH + '/genome_data/' + loc + '/' + assemblyName + '.fai',
                },
              },
            }
          }
        ],
        tracks: [
          {
            type: 'FeatureTrack',
            trackId: 'genes',
            name: 'Genes',
            assemblyNames: [assemblyName],
            category: ['Genes'],
            adapter: {
              type: 'Gff3TabixAdapter',
              gffGzLocation: {
                uri: process.env.NEXT_PUBLIC_BASE_PATH + '/genome_data/' + loc + '/' + loc + '_genes.gff.gz',
              },
              index: {
                location: {
                  uri: process.env.NEXT_PUBLIC_BASE_PATH + '/genome_data/' + loc + '/' + loc + '_genes.gff.gz.tbi',
                },
              },
            },
          },
        ],
        defaultSession: {
          name: 'COVID-19 Browser',
          margin: 0,
          views: [
            {
              id: 'linearGenomeView',
              type: 'LinearGenomeView',
              tracks: [
                {
                  type: 'ReferenceSequenceTrack',
                  configuration: 'Reference Track (China_(Wuhan).fna)',
                },
                {
                  type: 'FeatureTrack',
                  configuration: 'Genes',
                },
              ],
            },
          ]
        },
      },
      makeWorkerInstance,
      hydrateFn: hydrateRoot,
      createRootFn: createRoot,
    })
    setViewState(state);
  }, [assemblyName, loc]);

  if (!viewState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-bold text-center mb-4">Genome Browser</h2>
      <JBrowseApp viewState={viewState} />
    </div>
  );
}
