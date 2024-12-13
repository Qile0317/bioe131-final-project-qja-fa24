#!/bin/bash

# Please run script with 'source', after setting APACHE_ROOT.
APACHE_ROOT=${APACHE_ROOT:=/var/www/html}

IFS=$'\n'

temp_dir="temp_genome_data"
mkdir -p "$temp_dir"
echo "id,country" > "$temp_dir/metadata.csv"

for line in $(cat installation_scripts/data_listing.txt); do
    echo "reading $line"

    url="${line%%,*}"
    location="${line#*,}"
    echo $url
    echo $location

    acc=$(echo "$url" | awk -F'/' '{print $(NF-1)}')
    fna_url="${url}${acc}_genomic.fna.gz"
    gff_url="${url}${acc}_genomic.gff.gz"

    mkdir -p "$temp_dir/${location}"
    cd "$temp_dir/${location}"

    wget $fna_url -O ${location}.fna.gz
    gunzip ${location}.fna.gz
    samtools faidx ${location}.fna
    bgzip -c ${location}.fna > ${location}.fna.gz
    samtools faidx ${location}.fna.gz

    wget $gff_url -O ${location}.gff.gz
    gunzip ${location}.gff.gz
    jbrowse sort-gff ${location}.gff > ${location}_genes.gff
    bgzip ${location}_genes.gff
    tabix ${location}_genes.gff.gz

    cd ../..
    echo "$acc,$location" >> "$temp_dir/metadata.csv"
done

# Move the temp directory to the specified location
if [ -z "$1" ]; then
    if [ ! -d "website/public/genome_data/" ]; then
        mkdir -p "website/public/genome_data/"
    fi
    mv "$temp_dir"/* website/public/genome_data/
else
    mv "$temp_dir"/* "$1"
fi

rmdir "$temp_dir"
