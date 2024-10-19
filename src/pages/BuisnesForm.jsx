import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Grid, useMediaQuery } from "@mui/material";
import Swal from "sweetalert2";
import { business_details } from "../api/Api";
import Loader from "../components/Loder/Loder";
import { useNavigate } from "react-router-dom";
import LocationPicker from "./LocationPicker";
import MyLoader from "../MyLoader";
const BusinessForm = ({ categoryId, lang }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)"); // Check if mobile
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState(null); // Default as null

  useEffect(() => {
    const locationData = JSON.parse(localStorage.getItem("Address"));
    setAddress(locationData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "businessName":
        setBusinessName(value);
        break;
      case "businessAddress":
        setBusinessAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "pinCode":
        setPinCode(value);
        break;
      case "state":
        setState(value);
        break;
      case "country":
        setCountry(value);
        break;
      default:
        break;
    }
  };

  const getLocation = () => {
    // Show the map (location picker)
    setShowMap(true);
  };

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!businessName) errors.businessName = "Business name is required";
    if (!businessAddress) errors.businessAddress = "Business address is required";

    if (Object.keys(errors).length !== 0) {
      setFormErrors(errors);
      return; // Early return if there are errors
    }

    handleLoaderOpen();

    try {
      const res = await business_details(businessName, businessAddress, categoryId, address);

      if (res.message === "Your Business Details has been Added successfully") {
        showAlert("Success", res.message, "success");
        navigate("/steps");
      } else {
        handleResponseError(res);
      }
    } catch (error) {
      console.log(error);
      showAlert("Error", "Something went wrong. Please try again later.", "error");
    } finally {
      handleLoaderClose();
    }
  };

  const handleLoaderClose = () => {
    setLoader(false);
  };

  const handleLoaderOpen = () => {
    setLoader(true);
  };

  if (!lang) {
    return <div>{<MyLoader/>}</div>
  }

  return (
    <Container sx={{ width: { xs: '100%', md: '50%' } }}>
      <Typography variant="h6" align="center" marginBottom={3} marginTop={2}>
        Business Details
      </Typography>

      <form onSubmit={handleFinish}>
        <Grid container spacing={3}>
          {/* Business Name */}
          <Grid item xs={12}>
            <TextField
              label={lang?.Buisness_name || "Business Name"}
              name="businessName"
              value={businessName}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.businessName}
              helperText={formErrors.businessName}
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiInputLabel-root": { top: -10 } }}
            />
          </Grid>

          {/* Business Address */}
          <Grid item xs={12}>
            <TextField
              label={lang?.Buisness_Address || "Business Address"}
              name="businessAddress"
              value={businessAddress}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.businessAddress}
              helperText={formErrors.businessAddress}
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiInputLabel-root": { top: -10 } }}
            />
          </Grid>

          {/* City */}
          <Grid item xs={12}>
            <TextField
              label={lang?.city || "City"}
              name="city"
              value={city}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ "& .MuiInputLabel-root": { top: -10 } }}
            />
          </Grid>

          {/* Pin Code and State */}
          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item xs={6} sm={6}>
              <TextField
                label={lang?.Pin_code || "Pin Code"}
                name="pinCode"
                value={pinCode}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ "& .MuiInputLabel-root": { top: -10 } }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                label={lang?.state || "State"}
                name="state"
                value={state}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ "& .MuiInputLabel-root": { top: -10 } }}
              />
            </Grid>
          </Grid>

          {/* Country and Get Location */}
          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item xs={6} sm={6}>
              <TextField
                label={lang?.country || "Country"}
                name="country"
                value={country}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ "& .MuiInputLabel-root": { top: -10 } }}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <Button
                variant="contained"
                fullWidth
                onClick={getLocation}
                sx={{ height: isMobile ? "50px" : "55px", width: isMobile ? "160px" : "305px", fontSize: isMobile ? "15px" : "15px", backgroundColor: '#9B001c' }}
              >
                {lang?.get_location || "Get Location"}
              </Button>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{ mt: '100px', width: '100%', backgroundColor: '#00BFA6' }}>
              {lang?.Finish || "Finish"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {loader && <Loader />}

      {/* Conditionally render the LocationPicker if showMap is true */}
      {showMap && <LocationPicker setShowMap={setShowMap} address={address} setAddress={setAddress} />}
    </Container>
  );
};

export default BusinessForm;

