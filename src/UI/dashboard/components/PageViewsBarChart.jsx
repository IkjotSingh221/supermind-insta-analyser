import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

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
              Page views and downloads
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
                  1.3M
                </Typography>
                <Chip size="small" color="error" label="-8%" />
              </Stack>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Page views and downloads for the last 6 months
              </Typography>
            </Stack>
            <BarChart
              borderRadius={8}
              colors={colorPalette}
              xAxis={[
                {
                  scaleType: 'band',
                  categoryGapRatio: 0.5,
                  data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                },
              ]}
              series={[
                {
                  id: 'page-views',
                  label: 'Page views',
                  data: [2234, 3872, 2998, 4125, 3357, 2789, 2998],
                  stack: 'A',
                },
                {
                  id: 'downloads',
                  label: 'Downloads',
                  data: [3098, 4215, 2384, 2101, 4752, 3593, 2384],
                  stack: 'A',
                },
                {
                  id: 'conversions',
                  label: 'Conversions',
                  data: [4051, 2275, 3129, 4693, 3904, 2038, 2275],
                  stack: 'A',
                },
              ]}
              height={250}
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
            Flip back to see the bar chart
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}
