import React, { useState } from "react";
import {
  Box,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getLogin } from "../../api/Api";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Graygreen } from "../../config"; // Import your custom color
import Loader from "../Loder/Loder"; // Assuming your Loader component is correctly imported

const Login = ({ lang }) => {
  const navigate = useNavigate();
  const [sLoginName, setLoginName] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    setEmailError(!sLoginName);
    setPasswordError(!sPassword);

    if (!sLoginName || !sPassword) return;

    handleLoaderOpen();
    try {
      const res = await getLogin({ name: sLoginName, password: sPassword });

      if (res.message === "OTP Sent Successfully.") {
        localStorage.setItem("UserName", sLoginName);
        localStorage.setItem("userId", 1234);
        localStorage.setItem("Mobile", sPassword);

        Swal.fire({
          title: "Login Successful!",
          text: `OTP has been sent to your registered ${sPassword}.`,
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/otp-verification"); // Navigate to the OTP verification page
      } else {
        // Handle different status codes
        const errorMessages = {
          400: { icon: "warning", title: "Bad Request!" },
          401: { icon: "error", title: "Unauthorized!" },
          403: { icon: "error", title: "Forbidden!" },
          404: { icon: "error", title: "Not Found!" },
          500: { icon: "error", title: "Server Error!" },
        };

        const { icon, title } = errorMessages[res.status] || {
          icon: "info",
          title: "Something went wrong!",
        };

        Swal.fire({
          title,
          text: res?.response?.data?.message,
          icon,
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
        backgroundColor: Graygreen,
        height: "100vh",
        padding: isMobile ? "8px" : "16px", // Adjust padding for mobile
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
          padding: isMobile ? "12px" : "16px", // Adjust padding for mobile
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
            {lang?.login || "Login"}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              error={emailError}
              onChange={(e) => setLoginName(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label={lang?.username || "Username"}
              autoComplete="email"
              autoFocus
              sx={{
                boxShadow: "5px 5px 5px #c3c3c3",
                border: "1px solid #999",
                borderRadius:'5px',
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: Graygreen,
                  },
                  "&:hover fieldset": {
                    borderColor: "#4a8d73",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: Graygreen,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#4a8d73",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: Graygreen,
                },
              }}
            />

            <Box sx={{ position: "relative" }}>
              <TextField
                error={passwordError}
                onChange={(e) => setSPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="Number"
                label={lang?.number || "Mobile Number"}
                type={showPassword ? "text" : "tel"} // Changed type to "tel"
                id="Number"
                autoComplete="current-password"
                sx={{
                  boxShadow: "5px 5px 5px #c3c3c3",
                  border: "1px solid #999",
                  borderRadius:'5px',
             
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: Graygreen,
                    },
                    "&:hover fieldset": {
                      borderColor: "#4a8d73",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: Graygreen,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#4a8d73",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: Graygreen,
                  },
                }}
              />
              <Box
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <LockOpenIcon /> : <LockIcon />}
              </Box>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: Graygreen,
                color: "white",
                border: "1px solid #999",
             
                "&:hover": {
                  backgroundColor: "#4a8d73",
                },
              }}
            >
              {lang?.login || "Login"}
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  href="/forgot-password"
                  variant="body2"
                  sx={{
                    color: "#d62d2d",
                    fontSize: isMobile ? "13px" : "15px", // Adjust margin for mobile
                    fontWeight:'bold',
                    "&:hover": {
                      color: Graygreen,
                    },
                  }}
                >
                   Forgot Password?
                </Link>
              </Grid>
              <Grid item>
  <Link
    href="/register"
    variant="body2"
    sx={{
      ml: "7px",
      color: "black",
      fontWeight:'bold',
      fontSize: isMobile ? "13px" : "15px",
    }}
  >
      Don't have an account?
     <span style={{ color: "black" }}>
      Register
    </span>
  </Link>
      </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Loader open={loader} handleClose={handleLoaderClose} />
    </Grid>
  );
};

export default Login;
