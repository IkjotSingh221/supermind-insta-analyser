import React,{useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Chart as ChartJS, Tooltip, Title, CategoryScale, LinearScale } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";
import inputdata from "../../../data/finalOutput.json";

ChartJS.register(MatrixController, MatrixElement, Tooltip, Title, CategoryScale, LinearScale);

function processPostData(posts) {
  const postdata = [];
  const dateCounts = {};

  // Count the number of posts for each date
  posts.forEach((post) => {
    const date = post.Date_Posted; // Extract the date
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });

  // Helper function to calculate week of the year
  function getWeekOfYear(date) {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstJan.getDay() + 1) / 7);
  }

  // Helper function to calculate day of the week (0 = Sunday, 6 = Saturday)
  function getDayOfWeek(date) {
    return date.getDay();
  }

  // Populate the data array
  Object.entries(dateCounts).forEach(([date, count]) => {
    const parsedDate = new Date(date); // Convert string to Date object
    const weekOfYear = getWeekOfYear(parsedDate);
    const dayOfWeek = getDayOfWeek(parsedDate);

    postdata.push({
      x: weekOfYear, // Week of the year
      y: dayOfWeek, // Day of the week
      v: count, // Contribution count
    });
  });

  return postdata;
}

const postData = processPostData(inputdata);

const data = {
  datasets: [
    {
      label: "Contributions",
      data: postData,
      backgroundColor: (ctx) => {
        const value = ctx.raw.v;
        return value === 1
          ? "#A7C7E7"  // Lightest Blue for 1
          : value === 2
            ? "#7AB1D4"  // Light Blue for 2
            : value === 3
              ? "#4C8BD6"  // Medium Blue for 3
              : value === 4
                ? "#2378C3"  // Strong Blue for 4
                : value >= 5
                  ? "#1A5A99"  // Dark Blue for 5 and above
                  : "#ebedf0"; // Color scale based on the value
      },
      width: (ctx) => ctx.chart.scales.x.width / 53, // Adjust for 53 weeks
      height: (ctx) => ctx.chart.scales.y.height / 7, // Adjust for 7 days
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 40,
      right: 40,
      top: 20,
      bottom: 0,
    },
  },
  scales: {
    x: {
      type: "linear",
      position: "bottom",
      min: 0,
      max: 52,
      ticks: {
        stepSize: 1,
        callback: function (value) {
          return `W${value + 1}`;
        },
        padding: 10,
      },
    },
    y: {
      type: "linear",
      min: 0,
      max: 6,
      ticks: {
        stepSize: 1,
        callback: function (value) {
          const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          return days[value];
        },
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem) => `Value: ${tooltipItem.raw.v}`,
      },
    },
  },
};

const FlipCardHeatmap = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <Box
      onClick={handleFlip}
      sx={{
        perspective: "1000px",
        cursor: "pointer",
        width: "100%",
        height: "250px",
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
            // height: "100%",
            backfaceVisibility: "hidden",
          }}
        >
          <CardContent>
            <div style={{ height: "200px", width: "100%" }}>
              <Chart type="matrix" data={data} options={options} />
            </div>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card
          variant="outlined"
          sx={{
            position: "absolute",
            width: "100%",
            height: "250px",
            backfaceVisibility: "hidden",
            backgroundColor: "#fff",
            transform: "rotateX(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Typography variant="h6" align="center">
              Flip back to see the heatmap
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FlipCardHeatmap;
