#!/bin/bash

# Please run script with 'source', after setting APACHE_ROOT.
# This won't work for all systems.
APACHE_ROOT=${APACHE_ROOT:=/var/www/html}

IFS=$'\n'
for line in $(cat installation_scripts/data_listing.txt); do
    # mkdir tmp
    # cd tmp
    echo "reading $line"

    url="${line%%,*}"
    location="${line#*,}"
    echo $url
    echo $location

    acc=$(echo "$url" | awk -F'/' '{print $(NF-1)}')
    fna_url="${url}${acc}_genomic.fna.gz"
    gff_url="${url}${acc}_genomic.gff.gz"
    # Fasta nucleic acid (genome)

    mkdir -p "genome_data/${location}"
    cd "genome_data/${location}"

    wget $fna_url -O ${location}.fna.gz
    gunzip ${location}.fna.gz
    samtools faidx ${location}.fna
    bgzip -c ${location}.fna > ${location}.fna.gz
    samtools faidx ${location}.fna.gz
    # jbrowse add-assembly ${location}.fna --out $APACHE_ROOT/jbrowse2 --load copy

    # Annotation
    wget $gff_url -O ${location}.gff.gz
    gunzip ${location}.gff.gz
    jbrowse sort-gff ${location}.gff > ${location}_genes.gff
    bgzip ${location}_genes.gff
    tabix ${location}_genes.gff.gz
    # jbrowse add-track ${location}_genes.gff.gz --out $APACHE_ROOT/jbrowse2 --load copy --assemblyNames ${location}.fna
    # jbrowse text-index --out $APACHE_ROOT/jbrowse2

    cd ../..
done

mv genome_data/ website/public/genome_data/