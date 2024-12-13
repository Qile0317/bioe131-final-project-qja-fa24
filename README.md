# Final project for BIOE C131: Fall 2024 <img src="website/public/logo.png" width="20%" align="right" />

[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/Qile0317/bioe131-final-project-qja-fa24/blob/main/LICENSE)

This repository contains a cli tool that acts as a database installer for a collection of COVID-19 viral sequences from across the world. There is also a web interface that allows users to explore the sequences by country, and other extensible parameters.

The web interface is built using Next.js, React, TypeScript, and Tailwind CSS with the help of various npm packages. The database is installed using a bash script that downloads the data from a remote location and sets up the database for the web interface.

## Usage

### Dependencies & System Requirements

The database installer is only available for MacOS and Linux. Windows users are encouraged to use VM solutions like WSL2 or Docker to run the bash scripts.

The required cli tools that must be available in `PATH` are [`wget`](https://www.gnu.org/software/wget/), [`htslib`, `samtools`, and `tabix`](https://www.htslib.org/). Additionally, the [jbrowse cli](https://www.npmjs.com/package/@jbrowse/cli/v/2.1.0) tool is also required and must be available in PATH, which can be installed with `npm install -g @jbrowse/cli`

### Running the database installer

```bash
# clone the repo
git clone https://github.com/Qile0317/bioe131-final-project-qja-fa24.git
cd bioe131-final-project-qja-fa24

# install the database - replace <INSTALL_LOCATION> with the desired location
# Note that you may need sudo permissions!
bash installation_scripts/fetch_data.sh <INSTALL_LOCATION>
```

The output is a folder that looks something like this:

```txt
.
└── Australia
    │   ├── Australia.fna
    │   ├── Australia.fna.fai
    │   ├── Australia.fna.gz
    │   ├── Australia.fna.gz.fai
    │   ├── Australia.fna.gz.gzi
    │   ├── Australia.gff
    │   ├── Australia_genes.gff.gz
    │   └── Australia_genes.gff.gz.tbi
    .
    .
More data named by country...
    .
    .
    ├── USA_(Texas)
    │   ├── USA_(Texas).fna
    │   ├── USA_(Texas).fna.fai
    │   ├── USA_(Texas).fna.gz
    │   ├── USA_(Texas).fna.gz.fai
    │   ├── USA_(Texas).fna.gz.gzi
    │   ├── USA_(Texas).gff
    │   ├── USA_(Texas)_genes.gff.gz
    │   └── USA_(Texas)_genes.gff.gz.tbi
    └── metadata.csv
```

Where each country folder has the relevant data files, and a metadata file that currently contains the ID and country information.

## Web explorer interface

If you want to locally host the website, you must have the latest versions of `Node.js` and `npm` installed. To install the website and run it locally, do:

```bash
# assume you are at the root of the repo
# with no arguments, database is installed as a static file for the website
bash installation_scripts/fetch_data.sh
cd website
npm install
npm run dev
# open browser on the corresponding localhost port, probably 3000 if not in use
```

## Team members and contributions

- Annalea Maeder (@annaleamaeder)
    - ideation and final report writing
- Juno Lee (@JunoLee128)
    - creation of bash scripts for database installation and website edits
- Qile Yang (@Qile0317)
    - main creator of website and some setup scripts and docs

> To graders: please note that the example data contained in `/website/public/genome_data` is an exact copy of the result of running the database installer. This is to allow the website to be run without the need to install the database via CI/CD which is not supported in this project.
