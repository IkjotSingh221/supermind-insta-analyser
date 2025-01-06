import { React, useState } from 'react';
import WordCloud from 'react-wordcloud';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import data from "../../../data/hashtags.json";

const options = {
    rotations: 2,
    rotationAngles: [0,90],
    fontSizes: [15, 60],
    fontFamily: 'sans-serif',
    color: 'random-dark',
    enableTooltip: true,
};

const WordCloudComponent = () => {
    // const [flipped, setFlipped] = useState(false);

    // const handleFlip = () => {
    //     setFlipped(!flipped);
    // };

    // Function to count hashtags
    function countHashtags() {
        const hashtagCounts = {};

        // Count occurrences of each hashtag
        data.forEach((hashtag) => {
            hashtagCounts[hashtag] = (hashtagCounts[hashtag] || 0) + 1;
        });

        // Convert the counts object to the desired format
        const result = Object.entries(hashtagCounts).map(([key, value]) => ({
            text: key,
            value: value,
        }));

        return result;
    }

    // Get the computed words array
    const words = countHashtags();

    return (
        <Box
            // onClick={handleFlip}
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
                    // transformStyle: "preserve-3d",
                    // transition: "transform 0.8s",
                    // transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
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
                        <div style={{ height: "100%", width: "100%" }}>
                            <WordCloud words={words} options={options} />
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
                        transform: "rotateY(180deg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" align="center">
                            Click to flip back
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default WordCloudComponent;
