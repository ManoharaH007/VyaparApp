import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Link,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ForgotOtp, VerifyOtpReg,} from "../../api/Api"; // Corrected API import
import { Graygreen } from "../../config";
import Loader from "../Loder/Loder";

const OtpVerification = ({ value, lang }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const Mobile = localStorage.getItem("phoneNumber");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(intervalId);
    } else {
      setIsResendEnabled(true);
    }
  }, [timer]);

  const handleLoaderOpen = () => setLoader(true);
  const handleLoaderClose = () => setLoader(false);

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    setOtpError(!otp);
    if (!otp) return;

    handleLoaderOpen();
    try {
      const res =
        value === "signup"
          ? await VerifyOtpReg(otp, Mobile)
          : await ForgotOtp(otp, Mobile);

      if (res.message === "Your otp is verified" || res.message === "Password changed successfully.") {
        Swal.fire({
          title: "OTP Verified!",
          text: "You have been successfully logged in.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/setPassword");
      } else {
        Swal.fire({
          title: "Error",
          text: res?.response?.data?.message || "Something went wrong.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    handleLoaderClose();
  };

  const handleResendOtp = async () => {
    setIsResendEnabled(false);
    setTimer(60);
    try {
      const res = await ResendOtpReg(Mobile); // Corrected ResendOtpReg API call
      if (res.message === "OTP resent successfully") {
        Swal.fire({
          title: "OTP Resent!",
          text: "A new OTP has been sent to your mobile number.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: res?.response?.data?.message || "Failed to resend OTP.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: Graygreen,
        height: "100vh",
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

          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" ,fontSize: isMobile ? "25px" : "35px",}}>
            {lang.otp_verification || "OTP Verification"}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleOtpSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              error={otpError}
              onChange={(e) => setOtp(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="otp"
              label={lang.enter_otp || "Enter your otp"}
              autoFocus
              placeholder={lang.enter_otp || "Enter your otp"}
              sx={{
                boxShadow: "5px 5px 5px #c3c3c3",
                border: "1px solid #999",
                borderRadius:'5px',
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: Graygreen,
                  },
                  "&:hover fieldset": {
                    borderColor: Graygreen,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: Graygreen,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: Graygreen,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Graygreen,
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
                backgroundColor: Graygreen,
                color: "white",
                fontSize: isMobile ? "18px" : "15px",
                border: "1px solid #999",
             
              }}
            >
              {lang.verify_otp || "VERIFY OTP"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              {isResendEnabled ? (
                <Link href="#" onClick={handleResendOtp} sx={{ color: Graygreen }}>
                  {lang.resend_otp || "Resend OTP"}
                </Link>
              ) : (
                <Typography variant="body2" sx={{ color: "black", fontSize: isMobile ? "18px" : "20px", }}>
                  Resend OTP in  <span style={{ color: "red" }}> {timer} seconds</span>
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Grid>
      <Loader open={loader} handleClose={handleLoaderClose} />
    </Grid>
  );
};

export default OtpVerification;
