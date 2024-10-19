import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Graygreen, countryCodes } from "../../config";
import Swal from "sweetalert2";
import { RegisterMob } from "../../api/Api";
import Loader from "../Loder/Loder";
import Grid from "@mui/material/Grid";

const Signup = ({ lang }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalCode, setNationalCode] = useState("+91");
  const [phoneError, setPhoneError] = useState(false);
  const [loader, setLoader] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleLoaderClose = () => {
    setLoader(false);
  };

  const handleLoaderOpen = () => {
    setLoader(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPhoneError(!phoneNumber);
    
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!phoneNumber || !phoneNumberPattern.test(phoneNumber)) {
      setPhoneError(true);
      Swal.fire({
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setPhoneError(false);
    handleLoaderOpen();
    
    try {
      const response = await RegisterMob(phoneNumber);
      if (response.message === "OTP Sent Successfully.") {
        localStorage.setItem("phoneNumber", phoneNumber);

        Swal.fire({
          title: "Signup Successful!",
          text: response.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/otp-verification");
      } else {
        let iconType;
        let titleText;
        switch (response.status) {
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
          text: response?.response?.data?.message,
          icon: iconType,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    handleLoaderClose();
  };

  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100vw",
        padding: "16px",
        backgroundColor: Graygreen,
        margin: 0,
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
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            {lang?.Signup || "Signup"}
          </Typography>
          <Typography
            component="p"
            variant="body1"
            sx={{ mb: 3, textAlign: "center", fontSize: isMobile ? "12px" : "15px",fontWeight:'bold' }}
          >
            {lang?.signup_title || "Get control of your business with"}
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextField
                select
                label="Code"
                value={nationalCode}
                onChange={(e) => setNationalCode(e.target.value)}
                sx={{
                  mt: 1,
                  boxShadow: "5px 5px 5px #c3c3c3",
                  border: "1px solid #999",
                  borderRadius:'5px',
                  minWidth: "20px",
                  mr: 1,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: Graygreen },
                    "&:hover fieldset": { borderColor: Graygreen },
                    "&.Mui-focused fieldset": { borderColor: Graygreen },
                  },
                  "& .MuiInputLabel-root": { color: Graygreen },
                  "& .MuiInputLabel-root.Mui-focused": { color: Graygreen },
                }}
              >
                {countryCodes.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.label} ({country.code})
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                error={phoneError}
                onChange={(e) => setPhoneNumber(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="PhoneNumber"
                label={lang?.number || "Phone Number"}
                type="tel"
                id="phoneNumber"
                autoComplete="tel"
                sx={{
                  boxShadow: "5px 5px 5px #c3c3c3",
                  border: "1px solid #999",
                  borderRadius:'5px',
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: Graygreen },
                    "&:hover fieldset": { borderColor: Graygreen },
                    "&.Mui-focused fieldset": { borderColor: Graygreen },
                  },
                  "& .MuiInputLabel-root": { color: Graygreen },
                  "& .MuiInputLabel-root.Mui-focused": { color: Graygreen },
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: Graygreen,
                color: "#fff",
                boxShadow: "5px 5px 5px #c3c3c3",
                border: "1px solid #999",
                borderRadius:'5px',
                "&:hover": {
                  backgroundColor: Graygreen,
                },
              }}
            >
              {lang?.get_otp || "Get OTP"}
            </Button>
          </Box>
        </Box>
      </Grid>
      <Loader open={loader} handleClose={handleLoaderClose} />
    </Grid>
  );
};

export default Signup;
