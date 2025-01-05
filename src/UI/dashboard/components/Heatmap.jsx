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

// Months of the year with number of days in each month
const months = [
  { name: "Jan", days: 31 },
  { name: "Feb", days: 28 },  // Adjust February for leap years dynamically if needed
  { name: "Mar", days: 31 },
  { name: "Apr", days: 30 },
  { name: "May", days: 31 },
  { name: "Jun", days: 30 },
  { name: "Jul", days: 31 },
  { name: "Aug", days: 31 },
  { name: "Sep", days: 30 },
  { name: "Oct", days: 31 },
  { name: "Nov", days: 30 },
  { name: "Dec", days: 31 }
];

// Calculate weeks for each month dynamically
const weeksInMonth = (days) => Math.ceil(days / 7);

// Get the month for a given week number
const getMonthForWeek = (week) => {
  let totalWeeks = 0;
  for (let i = 0; i < months.length; i++) {
    const monthWeeks = weeksInMonth(months[i].days);
    totalWeeks += monthWeeks;
    if (week <= totalWeeks) {
      return { month: months[i].name, weekNumber: week - (totalWeeks - monthWeeks) };
    }
  }
  return { month: "", weekNumber: 0 }; // Default return in case of errors
};

// Function to process the post data
function processPostData(posts) {
  const postdata = [];
  const dateCounts = {};

  // Count the number of posts for each date
  posts.forEach((post) => {
    const date = post.Date_Posted;
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });

  function getWeekOfYear(date) {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstJan.getDay() + 1) / 7);
  }

  function getDayOfWeek(date) {
    return date.getDay();
  }

  Object.entries(dateCounts).forEach(([date, count]) => {
    const parsedDate = new Date(date);
    const weekOfYear = getWeekOfYear(parsedDate);
    const dayOfWeek = getDayOfWeek(parsedDate);
    const { month } = getMonthForWeek(weekOfYear);

    postdata.push({
      x: weekOfYear, // Week of the year
      y: dayOfWeek,  // Day of the week
      v: count,      // Contribution count
      month: month,
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
          ? "#D1E8D6"  // Light Green
          : value === 2
            ? "#A5D8A3"  // Green
            : value === 3
              ? "#7BBF7F"  // Medium Green
              : value === 4
                ? "#47A14E"  // Dark Green
                : value >= 5
                  ? "#2C7A32"  // Very Dark Green
                  : "#ebedf0"; // Default Light gray
      },
      width: (ctx) => ctx.chart.scales.x.width / 53,  // Adjust width for 52 weeks
      height: (ctx) => ctx.chart.scales.y.height / 7,  // Adjust height for 7 days of the week
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
          const { month } = getMonthForWeek(value + 1);  // Adjust for 1-based index
          // Display month only for the first week of each month
          const { weekNumber } = getMonthForWeek(value + 1);
          return weekNumber === 1 ? month : '';
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
        height: "300px",
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
            backfaceVisibility: "hidden",
          }}
        >
          <Typography variant="h4" component="p">
            User Activity Heatmap
          </Typography>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            Weekly user activity across days and months.
          </Typography>
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
