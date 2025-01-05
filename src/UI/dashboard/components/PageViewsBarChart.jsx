import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import data from "../../../data/finalOutput.json";

export default function FlipCardBarChart() {
  const [flipped, setFlipped] = useState(false);
  const theme = useTheme();

  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  function calculateAverageMetrics(data) {
    const postTypeStats = {};

    // Loop through each post in the data
    data.forEach(post => {
      const { Post_Type, Likes, Shares, Comments } = post;

      // If the post type doesn't exist in the object, initialize it
      if (!postTypeStats[Post_Type]) {
        postTypeStats[Post_Type] = {
          totalLikes: 0,
          totalShares: 0,
          totalComments: 0,
          postCount: 0,
        };
      }

      // Accumulate values for each post type
      postTypeStats[Post_Type].totalLikes += Likes;
      postTypeStats[Post_Type].totalShares += Shares;
      postTypeStats[Post_Type].totalComments += Comments;
      postTypeStats[Post_Type].postCount += 1;
    });

    // Calculate the averages for each post type
    const averages = Object.keys(postTypeStats).map(postType => {
      const { totalLikes, totalShares, totalComments, postCount } = postTypeStats[postType];
      return {
        Post_Type: postType,
        avgLikes: totalLikes / postCount,
        avgShares: totalShares / postCount,
        avgComments: totalComments / postCount,
      };
    });

    return averages;
  }

  const averageData = calculateAverageMetrics(data);

  // Extracting the necessary data for the chart
  const postTypes = averageData.map(item => item.Post_Type);
  const avgLikes = averageData.map(item => item.avgLikes);
  const avgShares = averageData.map(item => item.avgShares);
  const avgComments = averageData.map(item => item.avgComments);

  return (
    <Box
      onClick={handleFlip}
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
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          width: '100%',
          height: '365px',
        }}
      >
        {/* Front Side with the Average Metrics Chart */}
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
              Average Metrics by Post Type
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
                  Avg. Likes, Shares, and Comments
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {/* Average metrics for each post type */}
              </Typography>
            </Stack>
            <BarChart
              borderRadius={8}
              colors={colorPalette}
              xAxis={[
                {
                  scaleType: 'band',
                  categoryGapRatio: 0.5,
                  data: postTypes,
                },
              ]}
              series={[
                {
                  id: 'avg-likes',
                  label: 'Avg Likes',
                  data: avgLikes,
                  stack: 'A',
                },
                {
                  id: 'avg-shares',
                  label: 'Avg Shares',
                  data: avgShares,
                  stack: 'A',
                },
                {
                  id: 'avg-comments',
                  label: 'Avg Comments',
                  data: avgComments,
                  stack: 'A',
                },
              ]}
              height={265}
              margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
              grid={{ horizontal: true }}
              slotProps={{
                legend: {
                  hidden: true,
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Back Side with a message */}
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
            Flip back to see the average metrics
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}
