import { Inter } from "@next/font/google";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

// This file needs to be created for the application to work
import config from "../settings/page.json";

import BusCard from "../components/BusCard";
import NrkCard from "../components/NrkCard";
import WeatherCard from "../components/WeatherCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>KindScreen - A simple infoscreen</title>
        <meta name="description" content="A simple infoscreen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{config.header}</h1>
        <div className="row justify-content-center w-100">
          <div className="col-6">
            {config.weatherConfig?.enabled == true && (
              <WeatherCard
                lat={config.weatherConfig.lat}
                lon={config.weatherConfig.lon}
              />
            )}
            {config.newsConfig?.enabled == true && (
              <NrkCard
                feed={config.newsConfig.rssFeed}
                articleCount={config.newsConfig.articleCount}
              />
            )}
          </div>
          <div className="col-6">
            {config.busConfig?.enabled == true && (
              <BusCard stopPlace={config.busConfig.stopPlace} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
