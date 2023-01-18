import * as React from "react";

// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
export default function WeatherCard(props) {
  // States
  const [response, setresponse] = React.useState(false);
  const [icon, seticon] = React.useState();
  const [temperature, settemperature] = React.useState();

  React.useEffect(() => {
    fetch(
      "https://api.met.no/weatherapi/nowcast/2.0/complete?lat=63.4203952&lon=10.4839164"
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
        <h3>Laster Været</h3>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div>
        <Card sx={{ display: "flex" }}>
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
            <Box
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            ></Box>
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
