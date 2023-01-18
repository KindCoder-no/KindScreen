import moment from "moment";
import "moment-timezone";
import "moment/locale/nb";
import React from "react";
moment.locale("nb");

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export default function BusCard({ stopPlace }) {
  const [busData, setBusData] = React.useState();

  React.useEffect(() => {
    const fetchBusdata = async (venueToSearchFor) => {
      const response = await fetch(
        "https://api.entur.io/journey-planner/v3/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `{
                    stopPlace(id: "${stopPlace}") {
                      description
                      name
                      estimatedCalls(numberOfDepartures: 10) {
                        actualArrivalTime
                        actualDepartureTime
                        date
                        realtime
                        destinationDisplay {
                            frontText
                        }
                        expectedDepartureTime
                        serviceJourney {
                          line {
                            name
                            publicCode
                          }
                        }
                      }
                    }
                  }
                  `,
          }),
        }
      );
      const enturJSON = await response.json();
      const data = enturJSON.data.stopPlace;
      const departures = data.estimatedCalls;

      setBusData(departures);
    };
    fetchBusdata();
    setInterval(fetchBusdata, 1000 * 60);
  }, []);

  return (
    <section id="busCard">
      <TableContainer sx={{ width: "100%" }} component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {busData &&
              busData.map((data, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {data.realtime == false && "ca "}
                      {moment(data.expectedDepartureTime).diff(
                        moment(),
                        "seconds"
                      ) <= 60 && "Nå"}
                      {moment(data.expectedDepartureTime).diff(
                        moment(),
                        "seconds"
                      ) > 60 &&
                        moment(data.expectedDepartureTime).diff(
                          moment(),
                          "seconds"
                        ) <
                          60 * 10 &&
                        moment(data.expectedDepartureTime).diff(
                          moment(),
                          "minutes"
                        ) + " min"}
                      {moment(data.expectedDepartureTime).diff(
                        moment(),
                        "seconds"
                      ) >=
                        60 * 10 &&
                        moment(data.expectedDepartureTime).format("LT")}
                    </TableCell>
                    <TableCell align="left">
                      {data.serviceJourney.line.publicCode}{" "}
                      {data.destinationDisplay.frontText}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
