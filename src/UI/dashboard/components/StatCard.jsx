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
import defaultData from "../../../data/finalOutput.json";

function getWeeklyEngagementData(posts) {
  if (!Array.isArray(posts) || posts.length === 0) {
    console.error("Invalid or empty data passed to getWeeklyEngagementData.");
    return [];
  }

  const weeklyData = {};
  posts.forEach((post) => {
    const postDate = new Date(post.Date_Posted);
    const weekNumber = getWeekNumber(postDate);
    const year = postDate.getFullYear();
    const weekKey = `${year}-W${weekNumber}`;

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = { totalEngagement: 0, totalPosts: 0 };
    }

    weeklyData[weekKey].totalEngagement += post.Likes + post.Comments + post.Shares;
    weeklyData[weekKey].totalPosts += 1;
  });

  return Object.entries(weeklyData).map(([week, { totalEngagement, totalPosts }]) => ({
    week,
    engagementRatio: totalEngagement / totalPosts,
  }));
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

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

function StatCard({
  data = defaultData,
  interval = "Last 7 Days",
  title = "Weekly Likes, Comments and Shares",
  trend = "up",
  value = "N/A",
}) {
  const theme = useTheme();
  const weeklyEngagementData = getWeeklyEngagementData(data);
  const chartData = weeklyEngagementData.map((item) => item.engagementRatio);
  const labels = weeklyEngagementData.map((item) => item.week);

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
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1, display:"flex", justifyContent:"center",alignItems:"center" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {/* line representation */}
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
