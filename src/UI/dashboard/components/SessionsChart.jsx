// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Chip from '@mui/material/Chip';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import { LineChart } from '@mui/x-charts/LineChart';
// import Box from '@mui/material/Box';
// import data from "../../../data/finalOutput.json";

// function AreaGradient({ color, id }) {
//   return (
//     <defs>
//       <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
//         <stop offset="0%" stopColor={color} stopOpacity={0.5} />
//         <stop offset="100%" stopColor={color} stopOpacity={0} />
//       </linearGradient>
//     </defs>
//   );
// }

// AreaGradient.propTypes = {
//   color: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
// };

// function getMonthName(dateString) {
//   const month = new Date(dateString).toLocaleString('default', { month: 'short' });
//   const year = new Date(dateString).getFullYear();
//   return `${month} ${year}`;
// }

// export default function SessionsChart() {
//   const [flipped, setFlipped] = useState(false);
//   const theme = useTheme();

//   // Grouping data by month and calculating the totals for likes, comments, and shares
//   const groupedData = data.reduce((acc, post) => {
//     const month = getMonthName(post.Date_Posted);
//     if (!acc[month]) {
//       acc[month] = { likes: 0, shares: 0, comments: 0, count: 0 };
//     }
//     acc[month].likes += post.Likes;
//     acc[month].shares += post.Shares;
//     acc[month].comments += post.Comments;
//     acc[month].count += 1;
//     return acc;
//   }, {});

//   // Sort months in chronological order
//   const sortedMonths = Object.keys(groupedData).sort((a, b) => {
//     const dateA = new Date(a);
//     const dateB = new Date(b);
//     return dateA - dateB;
//   });

//   // Calculate the monthly averages for likes, comments, and shares
//   const avgLikes = sortedMonths.map(month => groupedData[month].likes / groupedData[month].count);
//   const avgComments = sortedMonths.map(month => groupedData[month].comments / groupedData[month].count);
//   const avgShares = sortedMonths.map(month => groupedData[month].shares / groupedData[month].count);

//   const colorPalette = [
//     theme.palette.primary.light,
//     theme.palette.primary.main,
//     theme.palette.primary.dark,
//   ];

//   const handleFlip = () => {
//     setFlipped(!flipped);
//   };

//   return (
//     <Box
//       onClick={handleFlip}
//       sx={{
//         perspective: '1000px',
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//       }}
//     >
//       <Box
//         sx={{
//           position: 'relative',
//           transformStyle: 'preserve-3d',
//           transition: 'transform 0.8s',
//           transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
//           width: '100%',
//           height: '365px',
//         }}
//       >
//         {/* Front Side */}
//         <Card
//           variant="outlined"
//           sx={{
//             position: 'absolute',
//             width: '100%',
//             backfaceVisibility: 'hidden',
//           }}
//         >
//           <CardContent>
//             <Typography component="h2" variant="subtitle2" gutterBottom>
//               Monthly Average Likes, Comments, and Shares
//             </Typography>
//             <Stack sx={{ justifyContent: 'space-between' }}>
//               <Stack
//                 direction="row"
//                 sx={{
//                   alignContent: { xs: 'center', sm: 'flex-start' },
//                   alignItems: 'center',
//                   gap: 1,
//                 }}
//               >
//                 <Typography variant="h4" component="p">
//                   {avgLikes.reduce((a, b) => a + b, 0) / avgLikes.length}
//                 </Typography>
//                 <Chip size="small" color="success" label="+35%" />
//               </Stack>
//               <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//                 Average likes per month
//               </Typography>
//             </Stack>
//             <LineChart
//               colors={colorPalette}
//               xAxis={[
//                 {
//                   scaleType: 'point',
//                   data: sortedMonths,
//                   tickInterval: 1,
//                 },
//               ]}
//               series={[
//                 {
//                   id: 'likes',
//                   label: 'Likes',
//                   showMark: false,
//                   curve: 'linear',
//                   stack: 'total',
//                   area: true,
//                   stackOrder: 'ascending',
//                   data: avgLikes,
//                 },
//                 {
//                   id: 'comments',
//                   label: 'Comments',
//                   showMark: false,
//                   curve: 'linear',
//                   stack: 'total',
//                   area: true,
//                   stackOrder: 'ascending',
//                   data: avgComments,
//                 },
//                 {
//                   id: 'shares',
//                   label: 'Shares',
//                   showMark: false,
//                   curve: 'linear',
//                   stack: 'total',
//                   area: true,
//                   stackOrder: 'ascending',
//                   data: avgShares,
//                 },
//               ]}
//               height={250}
//               margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
//               grid={{ horizontal: true }}
//               sx={{
//                 '& .MuiAreaElement-series-shares': {
//                   fill: "url('#shares')",
//                 },
//                 '& .MuiAreaElement-series-comments': {
//                   fill: "url('#comments')",
//                 },
//                 '& .MuiAreaElement-series-likes': {
//                   fill: "url('#likes')",
//                 },
//               }}
//               slotProps={{
//                 legend: {
//                   hidden: true,
//                 },
//               }}
//             >
//               <AreaGradient color={theme.palette.primary.light} id="likes" />
//               <AreaGradient color={theme.palette.primary.main} id="comments" />
//               <AreaGradient color={theme.palette.primary.dark} id="shares" />
//             </LineChart>
//           </CardContent>
//         </Card>

//         {/* Back Side */}
//         <Card
//           variant="outlined"
//           sx={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             backfaceVisibility: 'hidden',
//             backgroundColor: '#fff',
//             transform: 'rotateY(180deg)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <Typography variant="h6" align="center">
//             Flip back to see the chart
//           </Typography>
//         </Card>
//       </Box>
//     </Box>
//   );
// }
import React, { useState , useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import data from "../../../data/finalOutput.json";

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function getMonthName(dateString) {
  const month = new Date(dateString).toLocaleString('default', { month: 'short' });
  const year = new Date(dateString).getFullYear();
  return `${month} ${year}`;
}

export default function SessionsChart() {
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState('monthly'); // Default filter is monthly
  const [checked, setChecked] = useState(false); // New state for checkbox
  const [filtering, setFiltering] = useState(false); // New state to track filter interaction
  const theme = useTheme();
  const filterRef = useRef(false);

  // Grouping data by month and calculating the totals for likes, comments, and shares
  const groupedData = data.reduce((acc, post) => {
    const month = getMonthName(post.Date_Posted);
    if (!acc[month]) {
      acc[month] = { likes: 0, shares: 0, comments: 0, count: 0 };
    }
    acc[month].likes += post.Likes;
    acc[month].shares += post.Shares;
    acc[month].comments += post.Comments;
    acc[month].count += 1;
    return acc;
  }, {});

  // Sort months in chronological order
  const sortedMonths = Object.keys(groupedData).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });

  // Calculate the monthly averages for likes, comments, and shares
  const avgLikes = sortedMonths.map(month => groupedData[month].likes / groupedData[month].count);
  const avgComments = sortedMonths.map(month => groupedData[month].comments / groupedData[month].count);
  const avgShares = sortedMonths.map(month => groupedData[month].shares / groupedData[month].count);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  const handleFlip = (event) => {
    if (!filterRef.current) { // Only flip if filter dropdown is not being interacted with
      setFlipped(!flipped);
    }
  };

  const handleChangeFilter = (event) => {
    // Prevent the event from propagating to prevent flip
    event.stopPropagation();

    setFilter(event.target.value); // Update the selected filter
    filterRef.current = true; // Set ref to true when interacting with the filter dropdown
    setTimeout(() => {
      filterRef.current = false; // Reset filter interaction flag after a short delay
    }, 300);
  };

  const calculateAverage = (data, timeFrame) => {
    if (timeFrame === 'daily') {
      return data.map(() => Math.random() * 100); // Replace with actual daily logic
    } else if (timeFrame === 'weekly') {
      return data.map(() => Math.random() * 100); // Replace with actual weekly logic
    }
    return data; // Default to monthly
  };

  const filteredAvgLikes = calculateAverage(avgLikes, filter);
  const filteredAvgComments = calculateAverage(avgComments, filter);
  const filteredAvgShares = calculateAverage(avgShares, filter);

  return (
    <Box
      onClick={handleFlip}
      sx={{
        perspective: '1000px',
        cursor: filtering ? 'not-allowed' : 'pointer', // Disable flip when interacting with filter
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          width: '100%',
          height: '365px',
        }}
      >
        {/* Front Side */}
        <Card
          variant="outlined"
          sx={{
            position: 'absolute',
            width: '100%',
            backfaceVisibility: 'hidden',
          }}
        >
          <CardContent>
            <Typography component="h2" variant="subtitle2" gutterBottom>
              Average Likes, Comments, and Shares ({filter.charAt(0).toUpperCase() + filter.slice(1)})
            </Typography>
            <Stack sx={{ justifyContent: 'space-between' }}>
              <Stack
                direction="row"
                sx={{
                  alignContent: { xs: 'center', sm: 'flex-start' },
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography variant="h4" component="p">
                  {filteredAvgLikes.reduce((a, b) => a + b, 0) / filteredAvgLikes.length}
                </Typography>
                <Chip size="small" color="success" label="+35%" />
              </Stack>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Average likes per {filter}
              </Typography>
            </Stack>
            <LineChart
              colors={colorPalette}
              xAxis={[{ scaleType: 'point', data: sortedMonths, tickInterval: 1 }]}
              series={[
                { id: 'likes', label: 'Likes', showMark: false, curve: 'linear', stack: 'total', area: true, stackOrder: 'ascending', data: filteredAvgLikes },
                { id: 'comments', label: 'Comments', showMark: false, curve: 'linear', stack: 'total', area: true, stackOrder: 'ascending', data: filteredAvgComments },
                { id: 'shares', label: 'Shares', showMark: false, curve: 'linear', stack: 'total', area: true, stackOrder: 'ascending', data: filteredAvgShares },
              ]}
              height={250}
              margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
              grid={{ horizontal: true }}
              sx={{
                '& .MuiAreaElement-series-shares': { fill: "url('#shares')" },
                '& .MuiAreaElement-series-comments': { fill: "url('#comments')" },
                '& .MuiAreaElement-series-likes': { fill: "url('#likes')" },
              }}
              slotProps={{
                legend: { hidden: true },
              }}
            >
              <AreaGradient color={theme.palette.primary.light} id="likes" />
              <AreaGradient color={theme.palette.primary.main} id="comments" />
              <AreaGradient color={theme.palette.primary.dark} id="shares" />
            </LineChart>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card
          variant="outlined"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#fff',
            transform: 'rotateY(180deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" align="center">
            Flip back to see the chart
          </Typography>
        </Card>
      </Box>

      {/* Filter Dropdown */}
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10,
          background: theme.palette.background.paper,
          padding: 1,
          borderRadius: 2,
        }}
        className="filter-dropdown" // Added class to identify the dropdown
      >
        <FormControl variant="outlined">
          <Select
            value={filter}
            onChange={handleChangeFilter} // This prevents the flip action when interacting with the dropdown
            label="Filter"
            fullWidth
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
