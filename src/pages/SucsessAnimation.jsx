import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CSSTransition } from "react-transition-group";

const SucsessAnimation = () => {
  //   useEffect(() => {
  //     // Automatically show the success component after a delay
  //     const timer = setTimeout(() => {
  //       setShow(true);
  //     }, 500); // Delay before showing the component
  //     return () => clearTimeout(timer);
  //   }, []);

  const handleClose = () => {
    setShow(false);
  };

  return (
    // <CSSTransition
    //   in={show}
    //   timeout={500}
    //   classNames="success-animation"
    //   unmountOnExit
    // >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 3,

        borderRadius: 2,

        maxWidth: 400,
        margin: "auto",
        mt: 5,
        p: 4,
      }}
    >
      <IconButton>
        <CheckCircleIcon
          sx={{
            color: "green",
            fontSize: 60,
          }}
        />
      </IconButton>
      <Typography variant="h4" sx={{ mt: 2, color: "#333", fontWeight: 600 }}>
        Success!
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "#666" }}>
        Congratulations! You have registered successfully and can now start you
        business.
      </Typography>
    </Box>
    // </CSSTransition>
  );
};

export default SucsessAnimation;
