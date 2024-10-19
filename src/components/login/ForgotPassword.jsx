import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Link } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
import Swal from "sweetalert2"; // Import SweetAlert
import { ForgotPswrd } from "../../api/Api"; // Make sure to create the corresponding API call
import { Graygreen, colourTheme, secondaryColorTheme } from "../../config";
// import Grid from "@mui/system/Grid";
import Grid from "@mui/material/Grid";
import Loader from "../Loder/Loder";

// const defaultTheme = createTheme();

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [mobileNum, setMobile] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loader, setLoader] = useState(false);

  const Mobile = localStorage.getItem("Mobile");

  const handleLoaderClose = () => {
    setLoader(false);
  };
  const handleLoaderOpen = () => {
    setLoader(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email field
    setEmailError(!mobileNum);
    if (!mobileNum) return;
    if (mobileNum) {
      handleLoaderOpen();
      try {
        const res = await ForgotPswrd(mobileNum);
        if (res.message === "OTP sent successfully.") {
          Swal.fire({
            title: "Email Sent!",
            text: `A OTP sent has been sent to ${mobileNum}.`,
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate(`/otp-Forgot`); // Navigate to login after successful email submission
        } else {
          let iconType;
          let titleText;

          switch (res.status) {
            case 400:
              iconType = "warning";
              titleText = "Bad Request!";
              break;
            case 401:
              iconType = "error";
              titleText = "Unauthorized!";
              break;
            case 403:
              iconType = "error";
              titleText = "Forbidden!";
              break;
            case 404:
              iconType = "error";
              titleText = "Not Found!";
              break;
            case 500:
              iconType = "error";
              titleText = "Server Error!";
              break;
            default:
              iconType = "info";
              titleText = "Something went wrong!";
          }

          Swal.fire({
            title: titleText,
            text: res?.response?.data?.message,
            icon: iconType,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Forgot password error", error.message);
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      handleLoaderClose();
    }
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Grid
      container
      component="main"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: Graygreen,
        height: "100vh",
        // width: '99vw',
        padding: "16px",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          borderRadius: 2,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            my: 4,
            mx: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src="./icons/9b28f4407b93e27811e0b37c8d7f70c9.png"
            style={{ width: "80px" }}
            alt="Logo"
          />
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            FORGOT PASSWORD
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              error={emailError}
              onChange={(e) => setMobile(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="number"
              label="Phone Number"
              autoComplete="number"
              autoFocus
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: Graygreen, // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "customColorHover", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: Graygreen, // Border color when focused
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "customLabelColor", // Custom label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Graygreen, // Custom label color when focused
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: Graygreen, // Button background color
                color: "customTextColor", // Button text color
                "&:hover": {
                  backgroundColor: Graygreen, // Button background color on hover
                },
              }}
            >
              SEND RESET LINK
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{
                    color: "#282821", // Custom color for the link
                    "&:hover": {
                      color: Graygreen, // Custom color when hovering over the link
                    },
                  }}
                >
                  Remember your password? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Loader open={loader} handleClose={handleLoaderClose} />
    </Grid>

    // </ThemeProvider>
  );
};

export default ForgotPassword;
