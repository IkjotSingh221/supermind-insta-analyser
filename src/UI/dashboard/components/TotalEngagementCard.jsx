import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import importedData from "../../../data/finalOutput.json";
import ReactMarkdown from "react-markdown";

function TotalEngagementCard({ data = importedData }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error("Invalid or empty data passed to TotalEngagementCard:", data);
    return (
      <Card variant="outlined" sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
        <CardContent>
          <Typography component="p" variant="h4" gutterBottom>
            Total Engagement
          </Typography>
          <Typography variant="body2" color="error">
            No data available to display engagement metrics.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const totalLikes = data.reduce((sum, post) => sum + (post.Likes || 0), 0);
  const totalComments = data.reduce((sum, post) => sum + (post.Comments || 0), 0);
  const totalShares = data.reduce((sum, post) => sum + (post.Shares || 0), 0);

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
      }}
    >
      <CardContent>
        <Typography
          component="p"
          variant="h4"
          gutterBottom
          // sx={{ textAlign: "center", fontWeight: "bold", color: "#" }}
        >
          Total Engagement
        </Typography>
        <Stack direction="column" spacing={3} sx={{ marginTop: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <FavoriteIcon sx={{ color: "#e57373", fontSize: 30 }} />
            <Typography variant="body1" sx={{ fontWeight: "bold", flex: 1, textAlign: "center" }}>
              Likes
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 20, color: "#4caf50" }}>
              {totalLikes}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <ChatBubbleOutlineIcon sx={{ color: "#64b5f6", fontSize: 30 }} />
            <Typography variant="body1" sx={{ fontWeight: "bold", flex: 1, textAlign: "center" }}>
              Comments
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 20, color: "#4caf50" }}>
              {totalComments}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <ShareIcon sx={{ color: "#ffb74d", fontSize: 30 }} />
            <Typography variant="body1" sx={{ fontWeight: "bold", flex: 1, textAlign: "center" }}>
              Shares
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 20, color: "#4caf50" }}>
              {totalShares}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

TotalEngagementCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Post_ID: PropTypes.string.isRequired,
      Post_Type: PropTypes.string,
      Likes: PropTypes.number,
      Comments: PropTypes.number,
      Shares: PropTypes.number,
      Date_Posted: PropTypes.string,
      Caption: PropTypes.string,
    })
  ),
};

export default TotalEngagementCard;
