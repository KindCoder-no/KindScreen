# KindScreen

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) ![Build and Test](https://github.com/KindCoder-no/KindScreen/workflows/Build%20and%20Test/badge.svg)

This is an easy to use InfoScreen made in Next.JS

If you want a more professional solution. Register at https://publy.no or send me an email at: emre@publy.no

![Skjermbilde 2023-01-24 kl  13 37 04](https://user-images.githubusercontent.com/40148297/214293391-e7585b2e-01a7-4598-91c9-5af1bd7b7e0f.png)

_This project is stil in development, issues are welcome_

Jump to:

- [Install](#install)
- [Config](#config)
- [Updating](#updating)
- [Features](#features)

## Install

**NB: Remember to setup [config](#config) before running the application**

First, install all the dependencies

```bash
npm install
# or
yarn
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To deploy you can use Vercel, or build your own

```bash
# Build to static HTML
npm run build

# Start Next.js built in server
npm run start
```

## Config

Copy the content of `settings/page.json.example` to a new file: `settings/page.json`

### Example:

```JSON
{
  "header": {
    "image": {
      "enabled": true, // true/false
      "src": "http://localhost:3000/nrk-logo.jpg",
      "height": "50",
      "width": "100"
    },
    "title": "KindScreen" // title of the screen (can be empty)
  },
  "weatherConfig": { // Config for weather module
    "enabled": true, // true/false
    "lat": "63.4203952", // latitude
    "lon": "10.4839164" // longitude
  },
  "clockConfig": {
    "enabled": true // true/false
  },
  "busConfig": { // Config for bus module
    "enabled": true, // true/false
    "stopPlace": "NSR:StopPlace:42282", // StopPlace ID, can be found at: https://stoppested.entur.org
    "fontSize": 25
  },
  "newsConfig": { // Config for news module
    "enabled": true, // true/false
    "rssFeed": "https://www.nrk.no/toppsaker.rss", // Url for nrk.no rss feed. All feed urls: https://nrk.no/rss
    "articleCount": 10 // How many news article should be shown
  },
  "updateCheck": true // If the server should look for new update
}
```

## Updating

When you want to update the screen, you can either download the source code, or use git to fetch latest updates

### First time updating

In your installed folder, initialize git:

```sh
git init
```

Then you can add the github repo as upstream

```sh
git remote add upstream https://github.com/KindCoder-no/KindScreen
```

### After you have setup git

Fetch updates:

```sh
git fetch upstream
```

Pull latest changes:

```sh
git pull upstream main
```

## Features

- Get weather based on geolocation
- Get bus departures from stopplace
- Get news from nrk.no

## Roadmap/Todo

- Calendar module
- More customization possibilities
- Locale (i18n)

Issues and pull requests are welcome
