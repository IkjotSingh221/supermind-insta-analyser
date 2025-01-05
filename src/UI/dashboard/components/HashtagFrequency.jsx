// import React, { useState, useEffect } from 'react';
// import data from "../../../data/hashtags.json";
// import { BarChart } from '@mui/x-charts/BarChart';
// import { axisClasses } from '@mui/x-charts/ChartsAxis';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { useTheme } from '@mui/material/styles';


// // Chart settings
// const chartSetting = {
//   yAxis: [
//     {
//       label: 'Hashtag Frequency',
//     },
//   ],
//   series: [{ dataKey: 'frequency', label: 'Hashtag Frequency' }],
//   height: 300,
//   sx: {
//     [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
//       transform: 'translateX(-10px)',
//     },
//   },
// };

// const HashtagFrequency = () => {
//   const [hashtagCounts, setHashtagCounts] = useState([]);
//   const [flipped, setFlipped] = useState(false);

//   useEffect(() => {
//     // Count the frequency of each hashtag
//     const counts = data.reduce((acc, hashtag) => {
//       acc[hashtag] = acc[hashtag] ? acc[hashtag] + 1 : 1;
//       return acc;
//     }, {});

//     // Convert the counts into an array suitable for the chart
//     const formattedData = Object.keys(counts).map((hashtag) => ({
//       hashtag,
//       frequency: counts[hashtag],
//     }));

//     setHashtagCounts(formattedData);
//   }, []);

//   // Handle flip effect
//   const handleFlip = () => {
//     setFlipped(!flipped);
//   };
//   const theme = useTheme();
//   const colorPalette = [
//     (theme.vars || theme).palette.primary.dark,
//     (theme.vars || theme).palette.primary.main,
//     (theme.vars || theme).palette.primary.light,
//   ];
//   return (
//     <Box
//       onClick={handleFlip}
//       sx={{
//         perspective: "1000px",
//         cursor: "pointer",
//         width: "100%",
//         height: "350px",
//       }}
//     >
//       <Box
//         sx={{
//           position: "relative",
//           width: "100%",
//           height: "100%",
//           transformStyle: "preserve-3d",
//           transition: "transform 0.8s",
//           transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
//         }}
//       >
//         {/* Front Side */}
//         <Card
//           variant="outlined"
//           sx={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//             backfaceVisibility: "hidden",
//           }}
//         >
//           <CardContent>
//             <div style={{ height: "100%", width: "100%" }}>
//               <BarChart
//                 colors={colorPalette}
//                 dataset={hashtagCounts}
//                 xAxis={[
//                   { scaleType: 'band', dataKey: 'hashtag', tickPlacement: 'middle', tickLabelPlacement: 'middle' },
//                 ]}
//                 {...chartSetting}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Back Side */}
//         <Card
//           variant="outlined"
//           sx={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//             backfaceVisibility: "hidden",
//             backgroundColor: "#fff",
//             transform: "rotateY(180deg)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <CardContent>
//             <Typography variant="h6" align="center">
//               Click to flip back
//             </Typography>
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default HashtagFrequency;
import React, { useState, useEffect } from 'react';
import data from "../../../data/hashtags.json";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';

// Chart settings
const chartSetting = {
  yAxis: [
    {
      // label: 'Hashtag Frequency',
      sx: {
        fontWeight: 'bold', // Bold Y-axis label
        fontSize: '1.5rem', // Bigger Y-axis label
      },
    },
  ],
  series: [{ dataKey: 'frequency' }],
  height: 280,  // Reduced the height to make the chart more compact
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-12px)',
      fontWeight: 'bold', // Bold Y-axis labels
      fontSize: '1.5rem', // Bigger Y-axis labels
    },
    [`& .${axisClasses.directionX} .${axisClasses.label}`]: {
      fontWeight: 'bold', // Bold X-axis labels
      fontSize: '1.5rem', // Bigger X-axis labels
    },
    // Ensure the bars are thinner
    [`& .${axisClasses.directionX} .${axisClasses.ticks}`]: {
      fontSize: '1.2rem',
    },
  },
  categoryGapRatio: 0.2, // Thinner bars (adjusted)
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
                dataset={hashtagCounts}
                xAxis={[
                  { scaleType: 'band', dataKey: 'hashtag', tickPlacement: 'middle', tickLabelPlacement: 'middle' },
                ]}
                {...chartSetting}
                borderRadius={10}  // Rounded corners for bars
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
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "#fff",
            transform: "rotateX(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem', // Increased font size for the back message
                color: 'text.secondary',
              }}
            >
              Click to flip back
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default HashtagFrequency;
