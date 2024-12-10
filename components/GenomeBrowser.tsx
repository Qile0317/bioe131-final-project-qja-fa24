'use client';
import { createViewState, JBrowseLinearGenomeView } from '@jbrowse/react-linear-genome-view';

interface GenomeBrowserProps {
   assemblyName: string;
}

// export default function GenomeBrowser({ genomeUrl }: GenomeBrowserProps) {
export default function GenomeBrowser({assemblyName = "China_(Wuhan).fna"}) {
  const loc: string = assemblyName.slice(0, -4);
  const state = createViewState({
    assembly: {
      name: assemblyName,
      sequence: {
        type: 'ReferenceSequenceTrack',
        trackId: `Reference Track (${assemblyName})`,
        adapter: {
          type: 'IndexedFastaAdapter',
          fastaLocation: {
            uri: `./genome_data/${loc}/${assemblyName}`
          },
          faiLocation: {
            uri: `./genome_data/${loc}/${assemblyName}.fai`
          }
        }
      }
    },
    tracks: [
        // {
        //     type: 'FeatureTrack',
        //     trackId: 'genes',
        //     name: 'NCBI RefSeq Genes',
        //     assemblyNames: ['GRCh38'],
        //     category: ['Genes'],
        //     adapter: {
        //         type: 'Gff3TabixAdapter',
        //         gffGzLocation: {
        //         uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz',
        //         },
        //         index: {
        //         location: {
        //             uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz.tbi',
        //         },
        //         },
        //     },
        //     textSearching: {
        //         textSearchAdapter: {
        //         type: 'TrixTextSearchAdapter',
        //         textSearchAdapterId: 'gff3tabix_genes-index',
        //         ixFilePath: {
        //             uri: 'https://jbrowse.org/genomes/GRCh38/ncbi_refseq/trix/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz.ix',
        //         },
        //         ixxFilePath: {
        //             uri: 'https://jbrowse.org/genomes/GRCh38/ncbi_refseq/trix/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz.ixx',
        //         },
        //         metaFilePath: {
        //             uri: 'https://jbrowse.org/genomes/GRCh38/ncbi_refseq/trix/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz_meta.json',
        //         },
        //         assemblyNames: ['GRCh38'],
        //         },
        //     },
        // },
    ],
    defaultSession: {
      name: 'COVID-19 Browser',
      view: {
        id: 'linearGenomeView',
        type: 'LinearGenomeView'
      }
    }
  });

  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-lg p-4">
      <JBrowseLinearGenomeView viewState={state} />
    </div>
  );
}