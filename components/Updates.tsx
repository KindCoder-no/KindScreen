import { Alert, AlertTitle } from "@mui/material";

export default function Updates() {
  return (
    <>
      <Alert severity="info">
        <AlertTitle>Update</AlertTitle>
        An update for this software is available. You are currently running
        version: <strong>1.0.0</strong>, and new version is:{" "}
        <strong>1.0.1</strong>.<br></br>
        Update is on{" "}
        <a href="https://github.com/KindCoder-no/KindScreen">Github</a>
      </Alert>
    </>
  );
}
