#!/bin/bash

# Please run script with 'source', after setting APACHE_ROOT.
# This won't work for all systems.
APACHE_ROOT=${APACHE_ROOT:=/var/www/html}

IFS=$'\n'
for line in $(cat data_listing.txt); do
    mkdir tmp
    cd tmp
    echo "reading $line"

    acc=$(echo "$line" | awk -F'/' '{print $(NF-1)}')
    fna_url="${line}${acc}_genomic.fna.gz"
    gff_url="${line}${acc}_genomic.gff.gz"
    # Fasta nucleic acid (genome)
    
    wget $fna_url -O ${acc}.fna.gz
    gunzip ${acc}.fna.gz
    samtools faidx ${acc}.fna
    jbrowse add-assembly ${acc}.fna --out $APACHE_ROOT/jbrowse2 --load copy

    # Annotation
    wget $gff_url -O ${acc}.gff.gz
    gunzip ${acc}.gff.gz
    jbrowse sort-gff ${acc}.gff > ${acc}_genes.gff
    bgzip ${acc}_genes.gff
    tabix ${acc}_genes.gff.gz
    jbrowse add-track ${acc}_genes.gff.gz --out $APACHE_ROOT/jbrowse2 --load copy --assemblyNames ${acc}.fna
    jbrowse text-index --out $APACHE_ROOT/jbrowse2

    cd ..
    rm -r tmp
done