import { Inter } from "@next/font/google";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

// This file needs to be created for the application to work
import config from "../settings/page.json";

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
        {config.weatherConfig?.enabled == true && (
          <WeatherCard
            lat={config.weatherConfig.lat}
            lon={config.weatherConfig.lon}
          />
        )}
      </main>
    </>
  );
}
