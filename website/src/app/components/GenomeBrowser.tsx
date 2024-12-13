'use client';

import React, { useState, useEffect } from 'react';
import { createViewState, JBrowseApp } from '@jbrowse/react-app';
import makeWorkerInstance from '@jbrowse/react-app/esm/makeWorkerInstance';
import '@fontsource/roboto';
import { createRoot, hydrateRoot } from 'react-dom/client';

type ViewModel = ReturnType<typeof createViewState>;

export default function GenomeBrowser({ assemblyNames = ['China_(Wuhan).fna'] }: { assemblyNames: string[] }) {
  const [viewState, setViewState] = useState<ViewModel | null>(null);

  useEffect(() => {
    const configAssemblies = assemblyNames.map((assemblyName) => {
      const loc = assemblyName.slice(0, -4);
      return {
        name: assemblyName,
        sequence: {
          type: 'ReferenceSequenceTrack',
          trackId: `Reference Track (${assemblyName})`,
          adapter: {
            type: 'IndexedFastaAdapter',
            fastaLocation: {
              uri: process.env.NEXT_PUBLIC_BASE_PATH + `/genome_data/${loc}/${assemblyName}`,
            },
            faiLocation: {
              uri: process.env.NEXT_PUBLIC_BASE_PATH + `/genome_data/${loc}/${assemblyName}.fai`,
            },
          },
        },
      };
    });

    const configTracks = assemblyNames.flatMap((assemblyName) => {
      const loc = assemblyName.slice(0, -4);
      return [
        {
          type: 'FeatureTrack',
          trackId: `genes-${loc}`,
          name: 'Genes',
          assemblyNames: [assemblyName],
          category: ['Genes'],
          adapter: {
            type: 'Gff3TabixAdapter',
            gffGzLocation: {
              uri: process.env.NEXT_PUBLIC_BASE_PATH + `/genome_data/${loc}/${loc}_genes.gff.gz`,
            },
            index: {
              location: {
                uri: process.env.NEXT_PUBLIC_BASE_PATH + `/genome_data/${loc}/${loc}_genes.gff.gz.tbi`,
              },
            },
          },
        },
      ];
    });

    const defaultSessionTracks = assemblyNames.flatMap((assemblyName) => {
      const loc = assemblyName.slice(0, -4);
      return [
        {
          type: 'ReferenceSequenceTrack',
          configuration: `Reference Track (${assemblyName})`,
        },
        {
          type: 'FeatureTrack',
          configuration: `genes-${loc}`,
        },
      ];
    });

    const state = createViewState({
      config: {
        assemblies: configAssemblies,
        tracks: configTracks,
        defaultSession: {
          name: 'COVID-19 Browser',
          margin: 0,
          views: [
            {
              id: 'linearGenomeView',
              type: 'LinearGenomeView',
              tracks: defaultSessionTracks,
            },
          ],
        },
      },
      makeWorkerInstance,
      hydrateFn: hydrateRoot,
      createRootFn: createRoot,
    });
    setViewState(state);
  }, [assemblyNames]);

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
