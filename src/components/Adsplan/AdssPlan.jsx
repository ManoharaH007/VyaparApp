import React, { useState } from "react";
import { Box, Grid, Typography, Button, Paper } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
const AdssPlan = () => {
  const [Color, setColor] = useState("");
  const [text, setText] = useState("");

  const threemonth = [
    " cow is the winter of our discontent Made glorious summer by this sun of York ",
  ];
  const fourmonth = [
    "reiciendis, unde perspiciatis recusandae atque aliquam blanditiis aspernatur alias natus esse aliquid impedit dolores. Sint nesciunt velit facere laudantium.",
  ];
  const fivemonth = [
    "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis nulla similique ",
  ];

  const HandlePrice = (price) => {
    setColor(price);

    if (price === "3months") {
      setText(threemonth);
    }
    if (price === "6months") {
      setText(fourmonth);
    }
    if (price === "1year") {
      setText(fivemonth);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, maxWidth: 500, margin: "auto" }}>
      <Box sx={{ padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          {/* <ArrowBackIosNewIcon /> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            VYAPAR
          </Typography>
          <PhoneIcon
            color="primary"
            sx={{
              bgcolor: "#00BFA6",
              color: "white",
              boxShadow: "4px 4px 4px #a0a0b7",
            }}
          />
        </Box>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Get Business Adviser Now!
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Choose a plan to subscribe.
        </Typography>

        <Box
          sx={{
            display: "flex",

            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: Color === "3months" ? "#00BFA6" : "#D9D9D9",
              width: "90px",
              height: "13vh",
              ml: "5",
              margin: "0px 0px -115px 0px",
              borderRadius: "5px",
              fontWeight: 400,
              fontSize: "18px",
              boxShadow: "5px 5px 5px #a0a0b7",
            }}
            onClick={() => {
              HandlePrice("3months");
            }}
          >
            <p style={{ marginLeft: "12px" }}> 3 month</p>
          </Box>
          <Box
            sx={{
              backgroundColor: Color === "6months" ? "#00BFA6" : "#D9D9D9",
              fontWeight: 500,
              fontSize: "18px",
              width: "90px",
              height: "20vh",

              margin: "0px 0px -68px 0px",
              borderRadius: "5px",
              boxShadow: "5px 5px 5px #a0a0b7",
            }}
            onClick={() => {
              HandlePrice("6months");
            }}
          >
            <p style={{ marginLeft: "12px" }}> 6month</p>
          </Box>
          <Box
            sx={{
              backgroundColor: Color === "1year" ? "#00BFA6" : "#D9D9D9",
              fontWeight: 600,
              fontSize: "18px",
              width: "100px",
              height: "30vh",

              borderRadius: "5px",
              boxShadow: "5px 5px 5px #a0a0b7",
            }}
            onClick={() => {
              HandlePrice("1year");
            }}
          >
            <p style={{ marginLeft: "12px" }}> 1 Year</p>
          </Box>
        </Box>

        <Box
          sx={{
            height: "300px",
            bgcolor: "#D9D9D9",
            mt: 2,
            borderRadius: "5px",
            p: 2,
            fontSize: "18px",
            fontWeight: 400,
            boxShadow: "5px 5px 5px #a0a0b7",
          }}
        >
          {text}
        </Box>

        {/* Subscribe button */}
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              bgcolor: "#00bfa5",
              padding: "10px 20px",
              borderRadius: 4,
              boxShadow: "5px 5px 5px #c3c3ce",
              border: "1px solid #999",
            }}
          >
            Subscribe Premium Plan
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AdssPlan;
