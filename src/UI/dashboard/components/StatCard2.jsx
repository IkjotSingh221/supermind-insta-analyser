import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { areaElementClasses } from '@mui/x-charts/LineChart';
import defaultData from "../../../data/finalOutput.json"; // Make sure this path is correct

// Function to categorize caption length
function categorizeCaptionLength(length) {
  if (length <= 15) return "<=15 characters";
  if (length > 15 && length <= 20) return ">15 and <=20 characters";
  if (length > 20 && length <= 25) return ">20 and <=25 characters";
  if (length > 25 && length <= 30) return ">25 and <=30 characters";
  if (length > 30 && length <= 35) return ">30 and <=35 characters";
  if (length > 35 && length <= 40) return ">35 and <=40 characters";
  if (length > 40 && length <= 45) return ">40 and <=45 characters";
  return ">45 characters";
}

// Function to prepare data for the chart
function prepareDataForChart(posts) {
  const categorizedData = {
    "<=15 characters": 0,
    ">15 and <=20 characters": 0,
    ">20 and <=25 characters": 0,
    ">25 and <=30 characters": 0,
    ">30 and <=35 characters": 0,
    ">35 and <=40 characters": 0,
    ">40 and <=45 characters": 0,
    ">45 characters": 0,
  };

  posts.forEach((post) => {
    const captionLength = post.Caption_Text ? post.Caption_Text.length : 0;
    const category = categorizeCaptionLength(captionLength);
    categorizedData[category] += post.Likes + post.Comments + post.Shares;
  });

  return categorizedData;
}

// Area gradient for the SparkLineChart
function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

// StatCard component
function StatCard({
  data = defaultData,
  interval = "Last 7 Days",
  title = "Caption Length vs Engagement",
  trend = "neutral",
  value = "N/A",
}) {
  const theme = useTheme();
  const categorizedData = prepareDataForChart(data);

  // Extract chart data and labels
  const chartData = Object.values(categorizedData);
  const labels = Object.keys(categorizedData);

  const trendColors = {
    up:
      theme.palette.mode === "light"
        ? theme.palette.success.main
        : theme.palette.success.dark,
    down:
      theme.palette.mode === "light"
        ? theme.palette.error.main
        : theme.palette.error.dark,
    neutral:
      theme.palette.mode === "light"
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
  };

  const labelColors = {
    up: "success",
    down: "error",
    neutral: "default",
  };

  const color = labelColors[trend] || "default";
  const chartColor = trendColors[trend] || theme.palette.grey[400];
  const trendValues = { up: "+25%", down: "-25%", neutral: "+5%" };

  return (
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          line representation
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}
        >
          <Stack sx={{ justifyContent: "space-between" }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography variant="h4" component="p">
                {title}
              </Typography>
              {/* <Chip size="small" color={color} label={trendValues[trend]} /> */}
            </Stack>
            {/* <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {interval}
            </Typography> */}
          </Stack>
          <Box sx={{ width: "100%", height: 50 }}>
            <SparkLineChart
              colors={[chartColor]}
              data={chartData}
              area
              showHighlight
              showTooltip
              xAxis={{
                scaleType: "band",
                data: labels,
              }}
              sx={{
                [`& .${areaElementClasses.root}`]: {
                  fill: `url(#area-gradient-${value})`,
                },
              }}
            >
              <AreaGradient color={chartColor} id={`area-gradient-${value}`} />
            </SparkLineChart>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  interval: PropTypes.string,
  title: PropTypes.string,
  trend: PropTypes.oneOf(["down", "neutral", "up"]),
  value: PropTypes.string,
};

export default StatCard;
