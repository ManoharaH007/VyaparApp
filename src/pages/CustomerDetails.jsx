import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  Grid,
  Button,
  Switch,
  TextField,
} from "@mui/material";

import { CalendarToday, Person } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import Box from "@mui/material/Box";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CustomerDetailsModal from "./CustomerDetailsModal";
import { useNavigate, useParams } from "react-router-dom";
// import CalendarToday from "@mui/icons-material/CalendarToday";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { GetSingleCustomer } from "../redux/action_api/AllAction";
import QRCodePage from "../components/QrCode/QRCodePage";

export default function CustomerDetails() {
  const Navigate = useNavigate("");
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, customer, error } = useSelector(
    (state) => state.SingleCustomer
  );

  const [selectedDate, setSelectedDate] = useState("July 2024");
  const [activeButton, setActiveButton] = useState("Daily Entry");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(GetSingleCustomer(id));
  }, [dispatch]);

  // Handler to set the active button
  const handleClick = (buttonName) => {
    setActiveButton(buttonName);

    if (buttonName === "Ledger") {
      Navigate("/ledger");
    }
    if (buttonName === "Bills") {
      Navigate("/bills");
    }
  };

  const HandleOpen = () => {
    setOpen(!open);
  };

  const dateEntries = [
    { date: "04 July 2024", delivered: 4, returned: 2, id: 1 },
    { date: "03 July 2024", delivered: 6, returned: 5, id: 2 },
    { date: "02 July 2024", delivered: 3, returned: 4 },
    { date: "01 July 2024", delivered: 0, returned: 0 },
  ];

  const handleWhatsAppShare = () => {
    const phoneNumber = "7795436936"; // Replace with the actual number, including country code
    const message = "Check out this amazing content!";
    const url = "https://example.com";

    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}%20${encodeURIComponent(url)}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleCallClick = () => {
    const phoneNumber = "+1234567890"; // Replace with the desired phone number
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share this awesome content!",
          text: "Check out this amazing content!",
          url: "http://localhost:5173/ledger", //replace????????
        });
        console.log("Share successful");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Share not supported on this browser");
    }
  };

  const [date, setDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hideQr, setHideQr] = useState(false);

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setShowDatePicker(false); // Hide the date picker after selection
  };

  const HandleQr = () => {
    // Navigate("/qrcode");
    setHideQr(true);
  };

  useEffect(() => {
    if (hideQr) {
      const timer = setTimeout(() => {
        setHideQr(false);
      }, 5000);
      return () => clearTimeout(timer); // Clean up the timeout
    }
  }, [hideQr]);

  const HandleUpdate = () => {
    Navigate(`/customer/update/${id}`);
  };
  return (
    <Box>
      {hideQr && <QRCodePage customer={customer} id={1} />}{" "}
      {/* I send id defaullt */}
      {!hideQr && (
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: 600,
            margin: "auto",
            bgcolor: "#f0f0f0",
            minHeight: "100vh",
          }}
        >
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              {/* Left-aligned image */}
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                sx={{ mr: 2 }}
              >
                <img
                  src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
                  alt=""
                  style={{ width: "85px", height: "48px" }}
                />
              </IconButton>

              {/* Centered customer name */}
              <Typography
                variant="h6"
                sx={{ flexGrow: 1, textAlign: "center", marginRight: "auto" }}
              >
                {customer?.fullname}
              </Typography>

              {/* Right-aligned icons and button */}
              <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                <Button
                  sx={{
                    ml: "35px",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "blue",
                    cursor: "pointer",
                  }}
                  color="primary"
                  onClick={() => {
                    HandleUpdate();
                  }}
                >
                  {" "}
                  Edit
                </Button>
                <CallIcon
                  sx={{ ml: 2, cursor: "pointer" }}
                  onClick={handleCallClick}
                />
                <WhatsAppIcon
                  sx={{ ml: 1, cursor: "pointer" }}
                  onClick={handleWhatsAppShare}
                />
              </Box>
            </Toolbar>
          </AppBar>

          <Box sx={{ p: 2 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                mb: 2,
                boxShadow: "5px 5px 5px #c3c3c3",
                // border: "1px solid #999",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  <CurrencyRupeeIcon
                    sx={{ verticalAlign: "middle", fontSize: "1.2em" }}
                  />{" "}
                  Advance / Due
                </Typography>
                <Typography variant="h5" color="success.main">
                  Rs +5000
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  justifyContent: "space-between",
                  flexWrap: "nowrap", // Prevent items from wrapping
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                    fontWeight: "700",
                    fontSize: "15px",
                    flexShrink: 0,
                  }} // Prevent Typography from shrinking
                >
                  Set Reminder Collection
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {showDatePicker && (
                    <TextField
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                      variant="outlined"
                      size="small"
                      sx={{ marginRight: "8px", flexShrink: 0 }} // Prevent input from shrinking
                    />
                  )}
                  {date ? (
                    <Typography
                      variant="body2"
                      sx={{ marginRight: "8px", flexShrink: 0 }} // Prevent Typography from shrinking
                    >
                      {new Date(date).toLocaleDateString()}
                    </Typography>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<CalendarToday />}
                      onClick={() => setShowDatePicker((prev) => !prev)}
                      sx={{ flexShrink: 0 }} // Prevent Button from shrinking
                    >
                      Set Date
                    </Button>
                  )}

                  <ShareIcon
                    sx={{
                      marginLeft: "8px",
                      fontSize: "1.2em",
                      cursor: "pointer",
                      flexShrink: 0, // Prevent icon from shrinking
                    }}
                    onClick={handleShare}
                  />
                </Box>
              </Box>
            </Paper>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                flexWrap: "nowrap", // Prevent wrapping
                flexDirection: "row", // Keep the direction row for all screen sizes
                gap: { xs: 1, md: 0 }, // Add space between items on mobile
              }}
            >
              {/* QR Code and Date Select Box */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center", // Align items vertically
                }}
              >
                {/* QR Code Icon */}
                <QrCode2Icon
                  sx={{ fontSize: 45, cursor: "pointer" }}
                  onClick={HandleQr}
                />

                {/* Date Select Field */}
                <TextField
                  select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{
                    ml: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // Remove default border
                      },
                    },
                    border: "1px solid #999", // Add custom border
                    borderRadius: "5px",
                    padding: "5px 1px",
                    minHeight: "30px",
                    boxShadow: "5px 5px 5px #c3c3c3",
                    fontWeight: 600,
                    color: "#1849D6",
                    minWidth: { xs: "120px", sm: "auto" }, // Adjust the width for mobile
                  }}
                >
                  <MenuItem value="July 2024">July 2024</MenuItem>
                  <MenuItem value="August 2024">August 2024</MenuItem>
                  <MenuItem value="September 2024">September 2024</MenuItem>
                </TextField>
              </Box>

              {/* WhatsApp Switch */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #999",
                  borderRadius: "5px",
                  padding: "5px 3px",
                  minHeight: "30px",
                  boxShadow: "5px 5px 5px #c3c3c3",
                  // Optional: Set a minimum width for the Switch Box
                  minWidth: { xs: "100px", sm: "auto" }, // Adjust the width for mobile
                }}
              >
                <Typography variant="body2" sx={{ fontSize: "8px" }}>
                  Send WhatsApp sms for daily entry
                </Typography>
                <Switch defaultChecked sx={{}} />
              </Box>
            </Box>

            {/* buttons  */}
            <Box sx={{ display: "flex", mb: 2 }}>
              <Button
                onClick={() => handleClick("Daily Entry")}
                sx={{
                  mr: 1,
                  flexGrow: 1,
                  fontWeight: 700,
                  fontSize: "15px",
                  boxShadow: "5px 5px 5px #c3c3c3",
                  color: activeButton === "Daily Entry" ? "white" : "black",
                  border: "2px solid #585858",
                  backgroundColor:
                    activeButton === "Daily Entry" ? "#4287f5" : "white",
                }}
              >
                Daily Entry
              </Button>

              <Button
                onClick={() => handleClick("Bills")}
                sx={{
                  mr: 1,
                  flexGrow: 1,
                  fontWeight: 700,
                  fontSize: "15px",
                  boxShadow: "5px 5px 5px #c3c3c3",
                  color: activeButton === "Bills" ? "white" : "black",
                  border: "1px solid #999",
                  backgroundColor:
                    activeButton === "Bills" ? "#4287f5" : "white",
                }}
              >
                Bills
              </Button>

              <Button
                onClick={() => handleClick("Ledger")}
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  fontSize: "15px",
                  boxShadow: "5px 5px 5px #c3c3c3",
                  color: activeButton === "Ledger" ? "white" : "black",
                  border: "1px solid #999",
                  backgroundColor:
                    activeButton === "Ledger" ? "#4287f5" : "white",
                }}
              >
                Ledger
              </Button>
            </Box>

            {open && <CustomerDetailsModal HandleOpen={HandleOpen} />}
            {dateEntries.map((entry, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: selectedIndex === index ? "#ffcccb" : "#B3DEB7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "5px 5px 5px #c3c3c3",
                  border: "1px solid #999",
                }}
                onClick={() => {
                  HandleOpen(index);
                  setSelectedIndex(index);
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarToday sx={{ mr: 1 }} />
                  <Typography
                    variant="body1"
                    onClick={() => {
                      HandleOpen(index);
                      setSelectedIndex(index);
                    }}
                    style={{
                      cursor: "pointer", // Set cursor to pointer
                    }}
                  >
                    {entry.date}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      border: "1px solid #999", // Apply a border to the entire box
                      borderRadius: "5px", // Optional: Add rounded corners
                      padding: "10px",
                      boxShadow: "5px 5px 5px #c3c3c3",
                      border: "1px solid #999",
                      backgroundColor: "white",
                    }}
                  >
                    {entry.delivered} Delivered {entry.returned} Returned
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
