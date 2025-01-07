import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import data from "../../../data/finalOutput.json";
import ReactMarkdown from "react-markdown";
import Button from "./Button";

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
  const theme = useTheme();

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

  const sortedMonths = Object.keys(groupedData).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });

  const avgLikes = sortedMonths.map(month => groupedData[month].likes / groupedData[month].count);
  const avgComments = sortedMonths.map(month => groupedData[month].comments / groupedData[month].count);
  const avgShares = sortedMonths.map(month => groupedData[month].shares / groupedData[month].count);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <Box
      sx={{
        perspective: '1000px',
        cursor: 'pointer',
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
          transform: flipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
          width: '100%',
          height: '365px', // Ensuring both sides have the same height
        }}
      >
        {/* Front Side */}
        <Card
          variant="outlined"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%', // Ensures consistency
            backfaceVisibility: 'hidden',
          }}
        >
          <Button 
            onClick={handleFlip} 
            text={'Get AI Insights'} 
            bgColor='bg-blue-100' 
            textColor='text-blue-900' 
            hoverColor='bg-blue-300' 
            activeBorder='border-blue-900' 
          />
          <CardContent>
            <Typography component="h2" variant="subtitle2" gutterBottom>
              Average Likes, Comments, and Shares (Monthly)
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
                  {avgLikes.reduce((a, b) => a + b, 0) / avgLikes.length}
                </Typography>
                <Chip size="small" color="success" label="+35%" />
              </Stack>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Average likes per month
              </Typography>
            </Stack>
            <LineChart
              colors={colorPalette}
              xAxis={[{ scaleType: 'point', data: sortedMonths, tickInterval: 1 }]}
              series={[
                { id: 'likes', label: 'Likes', showMark: false, curve: 'linear', stack: 'total', area: true, stackOrder: 'ascending', data: avgLikes },
                { id: 'comments', label: 'Comments', showMark: false, curve: 'linear', stack: 'total', area: true, stackOrder: 'ascending', data: avgComments },
                { id: 'shares', label: 'Shares', showMark: false, curve: 'linear', stack: 'total', area: true, stackOrder: 'ascending', data: avgShares },
              ]}
              height={250}
              margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
              grid={{ horizontal: true }}
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
            height: '100%', // Matches the height of the front card
            backfaceVisibility: 'hidden',
            backgroundColor: '#fff',
            transform: 'rotateX(180deg)',
            overflowY:"scroll",
          }}
        >
          <Button 
            onClick={handleFlip} 
            text={'View Graph'} 
            bgColor='bg-blue-100' 
            textColor='text-blue-900' 
            hoverColor='bg-blue-300' 
            activeBorder='border-blue-900' 
          />
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "text.secondary",
              marginBottom: 2,
            }}
          >
            Insights for Monthly Average Engagement
          </Typography>
          <CardContent>
            <ReactMarkdown>
              {`

**Monthly Engagement Overview:**

- **Likes:** A significant **35% increase** in average likes per month demonstrates a marked increase in user engagement.
- **Comments & Shares:** While **Relatively stable** overall, a gradual upward trajectory in comments and shares, particularly in the latter half of the year, signals growing audience interaction and content virality.

**Possible Factors:**
- Increased engagement with content
- Improved content quality
- Increased marketing efforts

**Recommendations:**
- Maintain high-quality content creation
- Experiment with marketing strategies
- Monitor comments and shares for feedback
              `}
            </ReactMarkdown>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
