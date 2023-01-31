import Head from "next/head";
import styles from "../styles/Home.module.css";

// This file needs to be created for the application to work
//import config from "../settings/page.json";

import BusCard from "../components/BusCard";
import NrkCard from "../components/NrkCard";
import TimeCard from "../components/TimeCard";
import Updates from "../components/Updates";
import WeatherCard from "../components/WeatherCard";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>KindScreen - A simple infoscreen</title>
        <meta name="description" content="A simple infoscreen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <br></br>
        <div className="row justify-content-center w-100">
          <div className="col-4">
            {props?.config?.header?.image?.enabled == true && (
              <img
                src={props?.config?.header?.image?.src}
                alt="Header image"
                width={props?.config?.header?.image?.width}
                height={props?.config?.header?.image?.height}
              />
            )}
          </div>
          <div className="col-4">
            <h1 className="text-center">{props?.config?.header?.title}</h1>
          </div>
          <div className="col-4"></div>
        </div>
        {props?.config?.updateCheck == true && <Updates />}
        <br></br>
        <div className="row justify-content-center w-100">
          <div className="col-6">
            <div className="row justify-content-center">
              <div className="col-6">
                {props.config?.clockConfig?.enabled == true && <TimeCard />}
              </div>
              <div className="col-6">
                {props?.config?.weatherConfig?.enabled == true && (
                  <WeatherCard
                    lat={props?.config?.weatherConfig.lat}
                    lon={props?.config?.weatherConfig.lon}
                  />
                )}
              </div>
            </div>

            {props?.config?.newsConfig?.enabled == true && (
              <NrkCard
                feed={props?.config?.newsConfig.rssFeed}
                articleCount={props?.config?.newsConfig.articleCount}
              />
            )}
          </div>
          <div className="col-6">
            {props?.config?.busConfig?.enabled == true && (
              <BusCard stopPlace={props?.config?.busConfig.stopPlace} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const fs = require("fs");

  const path = "./settings/page.json";

  let config = {};

  try {
    if (fs.existsSync(path)) {
      //file exists
      let rawConfig = fs.readFileSync(path);
      let settings = JSON.parse(rawConfig);

      config = settings;
    }
  } catch (err) {
    config = {};
  }

  return {
    props: {
      config: config
    }
  };
}
