import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Graygreen, secondaryColorTheme } from "../../config";
import { setpswrd } from "../../api/Api";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Grid from "@mui/material/Grid";
import Loader from "../Loder/Loder";

const SetPassword = ({ lang }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [CnfrmpswdError, setCnfrmpswdError] = useState(false);
  const Mobile = localStorage.getItem("phoneNumber");
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleLoaderClose = () => {
    setLoader(false);
  };
  const handleLoaderOpen = () => {
    setLoader(true);
  };

  const handleSetPasswordSubmit = async (event) => {
    event.preventDefault();
    setPasswordError(!password);
    setNameError(!name);
    setCnfrmpswdError(!confirmPassword);

    if (!name || !password || !confirmPassword) return;

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordPattern.test(password)) {
      Swal.fire({
        title: "Invalid Password",
        text: "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Passwords do not match",
        text: "Please make sure the passwords match.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      setCnfrmpswdError(true);
      return;
    }

    handleLoaderOpen();
    try {
      const response = await setpswrd(password, confirmPassword, name, Mobile);
      console.log(response);
      if (response) {
        Swal.fire({
          title: "Password Set!",
          text: "Your password has been successfully set.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/select-category");
      } else {
        // Handle different status codes
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
        confirmButtonText: "OK",
      });
    }
    handleLoaderClose();
  };

  if (!lang) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: secondaryColorTheme,
        height: "100vh",
        padding: "16px",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        sx={{
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
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "bold", fontSize: isMobile ? "25px" : "35px" }}
          >
            {lang.set_password || "Set Password"}
          </Typography>

          <Typography component="p" sx={{ mt: 2, mb: 3, textAlign: "center",fontWeight:'bold',fontSize: isMobile ? "10px" : "16px" , }}>
            Please set a 6-digit password to help us keep your account safe.
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSetPasswordSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              error={nameError}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="name"
              label={lang.name || "Enter Name"}
              autoFocus
              placeholder={lang.name || "Enter your Name"}
              sx={{
                boxShadow: "5px 5px 5px #c3c3c3",
                border: "1px solid #999",
                borderRadius: '5px',
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
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Graygreen,
                },
              }}
            />
            <TextField
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="password"
              label={lang.password || "Enter your password"}
              type={showPassword ? "text" : "password"}
              placeholder={lang.password || "Enter your password"}
              sx={{
                boxShadow: "5px 5px 5px #c3c3c3",
                border: "1px solid #999",
                borderRadius: '5px',
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
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Graygreen,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: Graygreen }}
                    >
                      {showPassword ? <LockOpenIcon /> : <LockIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              error={CnfrmpswdError}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="confirm-password"
              label="Confirm Password"
              type={showCnfPassword ? "text" : "password"}
              placeholder={lang.confirm_pass || "Confirm your password"}
              sx={{
                boxShadow: "5px 5px 5px #c3c3c3",
                border: "1px solid #999",
                borderRadius: '5px',
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
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Graygreen,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCnfPassword(!showCnfPassword)}
                      edge="end"
                      sx={{ color: Graygreen }}
                    >
                      {showCnfPassword ? <LockOpenIcon /> : <LockIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
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
                "&:hover": {
                  backgroundColor: "#4d8c63",
                },
                borderRadius: '5px',
                boxShadow: "5px 5px 5px #c3c3c3",
                fontWeight:'bold',
                fontSize: isMobile ? "15px" : "18px" ,
              }}
            >
              {lang.submit || "Submit"}
            </Button>
          </Box>
        </Box>
        {loader && <Loader />}
      </Grid>
    </Grid>
  );
};

export default SetPassword;
