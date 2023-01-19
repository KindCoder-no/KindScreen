import * as React from "react";

// MUI
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";

type Props = {
  lat: string;
  lon: string;
};

export default function WeatherCard(props: Props) {
  // States
  const [response, setresponse] = React.useState(false);
  const [icon, seticon] = React.useState();
  const [temperature, settemperature] = React.useState();

  React.useEffect(() => {
    fetch(
      "https://api.met.no/weatherapi/nowcast/2.0/complete?lat=" +
        props.lat +
        "&lon=" +
        props.lon
    )
      .then((res) => res.json())
      .then((json) => {
        //console.log(json.properties.timeseries[0].data)
        seticon(
          json.properties.timeseries[0].data.next_1_hours.summary.symbol_code
        );
        settemperature(
          json.properties.timeseries[0].data.instant.details.air_temperature
        );
        setresponse(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (response === false) {
    return (
      <div>
        <Card sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CircularProgress />
          </Box>
        </Card>
      </div>
    );
  } else {
    return (
      <div>
        <Card sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Været
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {temperature} &deg;
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 100 }}
            image={"/weather_icons/" + icon + ".svg"}
            alt="Weather Icon"
          />
        </Card>
      </div>
    );
  }
}
