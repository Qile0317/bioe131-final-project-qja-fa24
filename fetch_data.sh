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
    wget $gff_url
    gunzip ${acc}.gff.gz
    jbrowse sort-gff ${acc}.gff > genes.gff
    bgzip genes.gff
    tabix genes.gff.gz
    jbrowse add-track genes.gff.gz --out $APACHE_ROOT/jbrowse2 --load copy
    jbrowse text-index --out $APACHE_ROOT/jbrowse2

    cd ..
    rm -r tmp
done