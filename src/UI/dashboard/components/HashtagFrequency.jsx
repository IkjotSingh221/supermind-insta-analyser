import React, { useState, useEffect } from "react";
import data from "../../../data/hashtags.json";
import { BarChart } from "@mui/x-charts/BarChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import Button from "./Button";

// Chart settings
const chartSetting = {
  height: 280, // Chart height
};

const HashtagFrequency = () => {
  const [hashtagCounts, setHashtagCounts] = useState([]);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    // Count the frequency of each hashtag
    const counts = data.reduce((acc, hashtag) => {
      acc[hashtag] = acc[hashtag] ? acc[hashtag] + 1 : 1;
      return acc;
    }, {});

    // Convert the counts into an array suitable for the chart
    const formattedData = Object.keys(counts).map((hashtag) => ({
      hashtag,
      frequency: counts[hashtag],
    }));

    setHashtagCounts(formattedData);
  }, []);

  // Handle flip effect
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  return (
    <Box
      onClick={handleFlip}
      sx={{
        perspective: "1000px",
        cursor: "pointer",
        width: "100%",
        height: "350px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s",
          transform: flipped ? "rotateX(180deg)" : "rotateX(0deg)",
        }}
      >
        {/* Front Side */}
        <Card
          variant="outlined"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
          }}
        >
          <Button onClick={handleFlip} text={'Get AI Insights'} bgColor = 'bg-blue-100' textColor = 'text-blue-900' hoverColor='bg-blue-300' activeBorder='border-blue-900'/>
          <CardContent>
            <Typography variant="h4" component="p">
              Hashtag Frequency Bar Graph
            </Typography>
            <Typography component="h2" variant="subtitle2" gutterBottom>
              A visualization of the most frequently used hashtags.
            </Typography>
            <div style={{ height: "100%", width: "100%" }}>
              <BarChart
                colors={colorPalette}
                borderRadius={10}
                dataset={hashtagCounts}
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: "hashtag",
                    // label: "Hashtags",
                  },
                ]}
                yAxis={[
                  {
                    // label: "Frequency",
                  },
                ]}
                series={[{ dataKey: "frequency" }]}
                {...chartSetting}
              />
            </div>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card
          variant="outlined"
          sx={{
            position: "absolute",
            width: "100%",
            height: "fitContent",
            backfaceVisibility: "hidden",
            backgroundColor: "#fff",
            transform: "rotateX(180deg)",
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Button onClick={handleFlip} text={'View Graph'} bgColor = 'bg-blue-100' textColor = 'text-blue-900' hoverColor='bg-blue-300' activeBorder='border-blue-900'/>
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem", // Increased font size for the back message
                color: "text.secondary",
                marginBottom: 2,
              }}
            >
              Insights from the Hashtag Frequency Bar Graph
            </Typography>
            <ReactMarkdown>
              {`
## Key Observations:
- **#mood** leads as the most frequently used hashtag, indicating its high relevance and popularity among users.
- Hashtags like **#happiness**, **#goodvibes**, **#lifestruggles**, and **#positiveenergy** also show significant usage, highlighting diverse themes in user-generated content.

### Sentiment Insights:
- Positive hashtags such as **#happiness**, **#goodvibes**, **#positiveenergy**, and **#moment** reflect users’ inclination toward optimism and well-being.
- At the same time, hashtags like **#lifestruggles** and **#badvibes** demonstrate that users also engage in sharing challenges and personal struggles.

### Engagement Trends:
- The frequency distribution indicates balanced engagement across hashtags, with no extreme outliers except for the slight peak in **#mood**.
- This balanced usage suggests that users are discussing a variety of topics, from emotions and positivity to life challenges.

### Applications:
- **Content Strategy**: Utilize high-frequency hashtags like **#mood**, **#happiness**, and **#goodvibes** to enhance visibility and engagement.
- **Audience Understanding**: The combination of positive and challenging hashtags showcases an audience interested in expressing a full range of experiences, from achievements to struggles.
              `}
            </ReactMarkdown>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default HashtagFrequency;
