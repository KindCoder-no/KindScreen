# KindScreen

This is an easy to use InfoScreen made in Next.JS

_This project is stil in development, issues are welcome_

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
# Start Next.js built in server
npm run start

# Build to static HTML
npm run build
```

## Config

Copy the content of `settings/page.json.example` to a new file: `settings/page.json`

### Example:

```JSON
{
  "header": "KindScreen", // Header of the screen (can be empty)
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
    "stopPlace": "NSR:StopPlace:42282" // StopPlace ID, can be found at: https://stoppested.entur.org
  },
  "newsConfig": { // Config for news module
    "enabled": true, // true/false
    "rssFeed": "https://www.nrk.no/toppsaker.rss", // Url for nrk.no rss feed. All feed urls: https://nrk.no/rss
    "articleCount": 10 // How many news article should be shown
  }
}
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

## Images

![image](https://user-images.githubusercontent.com/40148297/213208302-a49173b4-bf3d-4152-8353-e58370167ba3.png)
