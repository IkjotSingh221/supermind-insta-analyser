import * as React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import data from "../../../data/finalOutput.json";

// Function to count emojis
function countEmojis(data) {
  const emojiCounts = {};
  const emojiRegex = /\p{Emoji}/gu;

  data.forEach(post => {
    const captionEmojis = post.Caption_Emojis.match(emojiRegex);
    if (captionEmojis) {
      captionEmojis.forEach(emoji => {
        emojiCounts[emoji] = (emojiCounts[emoji] || 0) + 1;
      });
    }
  });

  return Object.entries(emojiCounts).map(([emoji, count]) => ({
    label: emoji,
    value: count,
  }));
}

const emojiData = countEmojis(data); // Process emoji data

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        fontSize: theme.typography.h4.fontSize,
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    {
      props: { variant: 'secondary' },
      style: {
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 12;
  const secondaryY = primaryY + 28;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

const vibrantColors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF',
];

export default function ChartEmojiUsage() {
  const totalValue = emojiData.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2" sx={{
          fontWeight: 'medium', fontSize: '20px' // You can adjust the size as needed
        }}>
          Emoji Usage Distribution
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PieChart
            colors={vibrantColors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data: emojiData,
                innerRadius: 70,
                outerRadius: 120,
                paddingAngle: 5,
                label: ({ datum }) => `${datum.label} (${datum.value})`,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={300}
            width={300}
            slotProps={{
              legend: { hidden: true },
              tooltip: {
                content: ({ datum }) => `${datum.label}: ${datum.value} (${((datum.value / totalValue) * 100).toFixed(2)}%)`,
              },
            }}
          >
            <PieCenterLabel primaryText={totalValue} secondaryText="Total Emojis" />
          </PieChart>
        </Box>
        {emojiData.map((emoji, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{
              alignItems: 'center',
              gap: 2,
              pb: 2,
              width: '100%', // Ensure consistent width
            }}
          >
            {/* Emoji */}
            <Box
              sx={{
                fontSize: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50px', // Set a fixed width for consistent alignment
              }}
            >
              {emoji.label}
            </Box>

            {/* Bar with percentage */}
            <Stack
              sx={{
                gap: 1,
                flexGrow: 1, // Take up remaining space
                width: 'calc(100% - 50px)', // Account for emoji width
              }}
            >
              {/* Percentage */}
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: '600',
                    fontSize: '1rem',
                  }}
                >
                  {((emoji.value / totalValue) * 100).toFixed(2)}%
                </Typography>
              </Stack>

              {/* Progress Bar */}
              <LinearProgress
                variant="determinate"
                aria-label="Emoji usage"
                value={(emoji.value / totalValue) * 100}
                sx={{
                  height: '10px', // Adjust bar height for better visibility
                  borderRadius: '5px',
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: vibrantColors[index % vibrantColors.length],
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}

      </CardContent>
    </Card>
  );
}
