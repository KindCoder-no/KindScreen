import { Alert, AlertTitle } from "@mui/material";
import React from "react";

export default function Updates() {
  const [installedVersion, setInstalledVersion] = React.useState<any>();
  const [currentVersion, setCurrentVersion] = React.useState<any>();
  React.useEffect(() => {
    fetch("/version.json")
      .then((res) => res.json())
      .then((data) => setInstalledVersion(data));

    const fetchCurrentVersion = () => {
      fetch(
        "https://raw.githubusercontent.com/KindCoder-no/KindScreen/main/public/version.json"
      )
        .then((res) => res.json())
        .then((data) => setCurrentVersion(data));
    };

    fetchCurrentVersion();

    const timer = setInterval(fetchCurrentVersion, 600000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      {installedVersion?.current != currentVersion?.current && (
        <Alert severity="info">
          <AlertTitle>Update</AlertTitle>
          An update for this software is available. You are currently running
          version: <strong>{installedVersion?.current}</strong>, and new version
          is: <strong>{currentVersion?.current}</strong>.<br></br>
          Update is on{" "}
          <a href="https://github.com/KindCoder-no/KindScreen">Github</a>.{" "}
          Changes: {currentVersion?.message}
        </Alert>
      )}
    </>
  );
}
