import * as React from "react";

// MUI
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography
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
  const [updated, setUpdated] = React.useState<string>();

  React.useEffect(() => {
    function fetchWeatherData() {
      fetch(
        "https://api.met.no/weatherapi/nowcast/2.0/complete?lat=" +
          props.lat +
          "&lon=" +
          props.lon
      )
        .then((res) => res.json())
        .then((json) => {
          seticon(
            json.properties.timeseries[0].data.next_1_hours.summary.symbol_code
          );
          settemperature(
            json.properties.timeseries[0].data.instant.details.air_temperature
          );
          setresponse(true);

          let date_ob = new Date();
          let hours: any = date_ob.getHours();
          let minutes: any = date_ob.getMinutes();
          let seconds: any = date_ob.getSeconds();

          if (hours < 10) {
            hours = "0" + date_ob.getHours();
          }
          if (minutes < 10) {
            minutes = "0" + date_ob.getMinutes();
          }
          if (seconds < 10) {
            seconds = "0" + date_ob.getSeconds();
          }

          setUpdated(hours + ":" + minutes + ":" + seconds);
        })
        .catch((err) => console.log(err));
    }

    fetchWeatherData();

    const timer = setInterval(fetchWeatherData, 1000 * 60);

    return () => {
      clearInterval(timer);
    };
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
        <Card>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
          </Box>
          <Typography sx={{ marginLeft: 1 }} color="text.secondary">
            Opdatert: {updated}
          </Typography>
        </Card>
      </div>
    );
  }
}
