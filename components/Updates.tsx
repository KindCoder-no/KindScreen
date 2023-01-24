import { Alert, AlertTitle } from "@mui/material";
import React from "react";

export default function Updates() {
  const [installedVersion, setInstalledVersion] = React.useState<string>();
  const [currentVersion, setCurrentVersion] = React.useState<string>();
  React.useEffect(() => {
    fetch("/version.txt")
      .then((res) => res.text())
      .then((data) => setInstalledVersion(data));

    const fetchCurrentVersion = () => {
      fetch(
        "https://raw.githubusercontent.com/KindCoder-no/KindScreen/main/public/version.txt"
      )
        .then((res) => res.text())
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
      {installedVersion != currentVersion && (
        <Alert severity="info">
          <AlertTitle>Update</AlertTitle>
          An update for this software is available. You are currently running
          version: <strong>{installedVersion}</strong>, and new version is:{" "}
          <strong>{currentVersion}</strong>.<br></br>
          Update is on{" "}
          <a href="https://github.com/KindCoder-no/KindScreen">Github</a>
        </Alert>
      )}
    </>
  );
}
