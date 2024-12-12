# Final project for BIOE 131: Fall 2024

This repository contains a cli tool that acts as a database installer for a collection of COVID-19 viral sequences from across the world. There is also a web interface that allows users to explore the sequences by country, and other extensible parameters.

The web interface is built using Next.js, React, TypeScript, and Tailwind CSS with the help of various npm packages. The database is installed using a bash script that downloads the data from a remote location and sets up the database for the web interface.

## Local installation of the DB

```bash
# clone the repo
git clone https://github.com/Qile0317/bioe131-final-project-qja-fa24.git
cd bioe131-final-project-qja-fa24

# install the database - replace <INSTALL_LOCATION> with the desired location
bash installation_scripts/fetch_data.sh <INSTALL_LOCATION>
```

## Usage and installation of the web explorer interface

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
