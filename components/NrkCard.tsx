import React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  LinearProgress,
  Typography
} from "@mui/material";

type Props = {
  feed: string;
  articleCount: number;
};

export default function NrkCard(props: Props) {
  const [news, setNews] = React.useState<any[]>([]);
  const [currentNews, setCurrentNews] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          setCurrentNews((current) => {
            if (current >= props.articleCount - 1) {
              return 0;
            }

            return current + 1;
          });
          return 0;
        }
        const diff = 4;
        return oldProgress + diff;
      });
    }, 400);

    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    function getNews() {
      var newsArray: any[] = [];

      fetch(props.feed)
        .then((response) => response.text())
        .then((str) => {
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(str, "text/xml");
          var item = xmlDoc.getElementsByTagName("item")[0];
          var xmlDoc2 = parser.parseFromString(str, "text/xml");

          //var xml = new XMLParser().parseFromString(str);
          var XMLParser = require("react-xml-parser");
          var NewXml = new XMLParser().parseFromString(
            new XMLSerializer().serializeToString(xmlDoc.documentElement)
          ); // Assume xmlText contains the example XML
          NewXml.children[0].children.forEach((data: any) => {
            if (data.name == "item") {
              var title = data.children.find(
                (o: any) => o.name === "title"
              ).value;
              var description = data.children.find(
                (o: any) => o.name === "description"
              ).value;
              var image = data.children.find(
                (o: any) => o.name === "media:content"
              )?.attributes.url;
              var category = data.children.find(
                (o: any) => o.name === "category"
              )?.value;
              var link = data.children.find(
                (o: any) => o.name === "link"
              ).value;
              newsArray.push({ title, description, image, category, link });
            }
          });
          setNews(newsArray);
        });
    }

    getNews();

    const timer = setInterval(() => {
      getNews();
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (news === null) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div>
        <br></br>

        <Card>
          {news[currentNews]?.image != undefined ? (
            <CardMedia
              sx={{ width: 450 }}
              image={news[currentNews]?.image}
              title="News Header Image"
            />
          ) : (
            <CardMedia
              sx={{ height: 450 }}
              image={"/nrk-logo.jpg"}
              title="News Header Image"
            />
          )}

          <CardContent>
            <Typography color="text.secondary">Nyheter fra NRK</Typography>
            <a
              href={news[currentNews]?.link}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Typography gutterBottom variant="h5" component="div">
                {news[currentNews]?.title}
              </Typography>
            </a>
            {news[currentNews]?.category != undefined && (
              <Chip
                label={news[currentNews]?.category}
                color="primary"
                variant="outlined"
              />
            )}

            <div className="mt-3"></div>
            <Typography variant="body2" color="text.secondary">
              {news[currentNews]?.description}
            </Typography>
            <br></br>
            <LinearProgress variant="determinate" value={progress} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
