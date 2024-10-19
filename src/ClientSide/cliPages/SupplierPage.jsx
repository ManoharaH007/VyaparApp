import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Avatar,
  Box,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShareIcon from "@mui/icons-material/Share";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StorefrontIcon from "@mui/icons-material/Storefront";
const Review = ({ name, rating, timeAgo, comment }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mt={2}
    sx={{ ml: 2 }}
  >
    <Box display="flex" alignItems="center">
      <Avatar alt={name} />
      <Box ml={2}>
        <Typography variant="body1">
          <b>{name}</b>
        </Typography>
        <Box
          sx={{
            display: "inline-flex", // Use inline-flex to reduce width to fit content
            alignItems: "center",
            backgroundColor: "#1BB334",
            color: "white",
            padding: "2px 6px", // Adjust padding as needed
            borderRadius: "4px", // Rounded corners
            ml: 1, // Margin left for spacing
            maxWidth: "fit-content", // Limit width to fit content
          }}
        >
          <StarIcon
            sx={{
              fontSize: 14,
              color: "gold",
              verticalAlign: "middle", // Align icon with text
              mr: 1, // Space between star and text
            }}
          />
          <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
            4.2
          </Typography>
        </Box>

        {/* <Rating value={rating} readOnly size="small" /> */}
        <Typography variant="body2">{comment}</Typography>
      </Box>
    </Box>

    {/* Right side: TimeAgo */}
    <Typography variant="caption" style={{ marginRight: "10px" }}>
      {timeAgo}
    </Typography>
  </Box>
);

const BusinessInformation = () => (
  <Box
    mt={3}
    sx={{
      border: "1px solid #999",
      borderRadius: "5px",
      minHeight: "180px",
      boxShadow: "5px 5px 5px #c3c3c3",
    }}
  >
    <Typography sx={{ display: "flex", justifyContent: "center" }}>
      <b>Business Information</b>
    </Typography>
    <Typography sx={{ fontWeight: "700", ml: 2 }}>
      GST: 000000000000000
    </Typography>
    <Typography sx={{ fontWeight: "700", ml: 2 }}>
      FSSAI: 000000000000000
    </Typography>
    <Typography sx={{ fontWeight: "700", ml: 2 }}>
      UAM: 000000000000000
    </Typography>
    <Typography sx={{ fontWeight: "700", ml: 2 }}>
      {" "}
      Website: www.goodfood.in
    </Typography>
    <Typography sx={{ fontWeight: "700", ml: 2 }}> Estabished -2020</Typography>
    <Typography sx={{ fontWeight: "700", ml: 2 }}>
      {" "}
      Contact no-+91 00000 00000
    </Typography>
  </Box>
);

const SupplierPage = () => {
  const [state, setState] = useState({
    fssai: false,
    uam: false,
    gst: false,
    other: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {/* card */}
      <Card
        sx={{
          p: 2,
          boxShadow: "5px 5px 5px #c3c3c3",
          border: "1px solid #999",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: "20px", sm: "22px", md: "25px" },
            }}
          >
            <StorefrontIcon />
            Foodwise Water Supplier
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center", // Align star and text in the center
              backgroundColor: "#1BB334",
              color: "white",
              padding: "2px 6px", // Add padding to avoid content overflow
              borderRadius: "4px", // Optional: Rounded corners for better design
              marginLeft: "10px",
            }}
          >
            <StarIcon
              sx={{
                fontSize: 14,
                color: "gold",
                verticalAlign: "middle", // Align icon with text
                marginRight: "4px", // Space between star and text
              }}
            />
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              4.2
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "-5px",
          }}
        >
          <Typography style={{ fontWeight: 800, fontSize: "12px" }}>
            Pratap Nagar, old RTo ,Udaipur
          </Typography>
          205 Ratings
        </Box>
        {/* check box */}

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={2}
          sx={{ fontWeight: 600, fontSize: "25px" }}
        >
          <FormGroup
            row
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap", // Ensure no wrapping
              justifyContent: "center", // Aligns items to center for mobile
              gap: 1, // Add a small gap between checkboxes for better spacing
              "@media (max-width: 600px)": {
                gap: 0, // Optional: Reduce gap on smaller screens if needed
              },
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.fssai}
                  onChange={handleChange}
                  name="fssai"
                />
              }
              label="FSSAI"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.uam}
                  onChange={handleChange}
                  name="uam"
                />
              }
              label="UAM"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.gst}
                  onChange={handleChange}
                  name="gst"
                />
              }
              label="GST"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.other}
                  onChange={handleChange}
                  name="other"
                />
              }
              label="Other"
            />
          </FormGroup>
        </Box>

        {/* buttons */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              mr: 1,
              color: "black",
              boxShadow: "5px 5px 5px #c3c3c3",
              width: "100%",
              // padding: "7px",
              fontSize: {
                xs: "10px",
              },
              ":hover": {
                backgroundColor: "#00BFA6", // Background color on hover
              },
            }}
          >
            <CallIcon
              sx={{
                width: "16px",
                height: "16px",
                paddingRight: "4px",
                ":hover": {
                  backgroundColor: "#00BFA6", // Background color on hover
                },
              }}
            />
            Call
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              mr: 1,
              color: "black",
              boxShadow: "5px 5px 5px #c3c3c3",
              width: "100%",
              // padding: "7px",
              fontSize: {
                xs: "10px",
              },
              ":hover": {
                backgroundColor: "#00BFA6", // Background color on hover
              },
            }}
          >
            <WhatsAppIcon
              sx={{ width: "16px", height: "16px", paddingRight: "4px" }}
            />
            Chat
          </Button>

          <Button
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              boxShadow: "5px 5px 5px #c3c3c3",
              mr: 1,
              color: "black",
              width: "100%",
              // padding: {
              //   xs: "12px",
              // },
              fontSize: {
                xs: "10px",
              },
              ":hover": {
                backgroundColor: "#00BFA6", // Background color on hover
              },
            }}
          >
            <SearchOutlinedIcon sx={{ width: "16px", height: "16px" }} />
            Enquiry
          </Button>

          <Button
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              mr: 1,
              color: "black",
              boxShadow: "5px 5px 5px #c3c3c3",
              width: "100%",
              fontSize: {
                xs: "10px",
              },
              ":hover": {
                backgroundColor: "#00BFA6", // Background color on hover
              },
              // padding: "7px",
            }}
          >
            <ShareIcon sx={{ width: "16px", height: "16px" }} /> Share
          </Button>
        </Box>
      </Card>

      {/* Product Section */}
      <Box mt={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {/* Apply common styles to all Typography elements */}
          <Typography
            className="flex-item"
            variant="h6"
            sx={{
              flex: 1,
              textAlign: "center",
              bgcolor: "#D9D9D9",
              border: "1px solid #c3c3c3",
              fontWeight: 700,
              fontSize: "16px",
              padding: "5px",
              mx: 1,
              borderRadius: "5px",
              boxShadow: "5px 5px 5px #c3c3c3",
              ":hover": {
                backgroundColor: "#00BFA6", // Background color on hover
              },
            }}
          >
            All
          </Typography>

          <Typography
            variant="h6"
            sx={{
              boxShadow: "5px 5px 5px #c3c3c3",
              flex: 1,
              textAlign: "center",
              bgcolor: "#D9D9D9",
              border: "1px solid #c3c3c3",
              fontWeight: 700,
              fontSize: "16px",
              padding: "5px",
              mx: 1, // Horizontal space between items
              borderRadius: "5px",
              ":hover": {
                backgroundColor: "#00BFA6", // Background color on hover
              },
            }}
          >
            Products
          </Typography>

          <Typography
            variant="h6"
            sx={{
              boxShadow: "5px 5px 5px #c3c3c3",
              flex: 1,
              textAlign: "center",
              bgcolor: "#D9D9D9",
              border: "1px solid #c3c3c3",
              fontWeight: 700,
              fontSize: "16px",
              padding: "5px",
              mx: 1, // Horizontal space between items
              borderRadius: "5px",
              ":hover": {
                backgroundColor: "#00BFA6", // Background color on hover
              },
            }}
          >
            Reviews
          </Typography>

          <Typography
            variant="h6"
            sx={{
              boxShadow: "5px 5px 5px #c3c3c3",
              flex: 1,
              textAlign: "center",
              bgcolor: "#D9D9D9",
              border: "1px solid #c3c3c3",
              fontWeight: 700,
              fontSize: "16px",
              padding: "5px",
              mx: 1, // Horizontal space between items
              borderRadius: "5px",
              ":hover": {
                backgroundColor: "#00BFA6", // Background color on hover
              },
            }}
          >
            Info
          </Typography>
        </Box>
      </Box>

      {/* products */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,

          minHeight: "230px",
          padding: "10px",
          border: "1px solid #999",
          borderRadius: "5px",
        }}
      >
        {/* First Box */}
        <Box
          sx={{
            bgcolor: "#fffdfd",
            width: "45%", // Adjust the width for both boxes
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            marginRight: "15px", // Space between boxes
            borderRadius: "5px", // Add border radius
            boxShadow: "5px 5px 5px #c3c3c3",
            height: "200px",
          }}
        >
          <img
            src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
            alt="Super Box"
            style={{
              width: "50%",
              boxShadow: "5px 5px 5px #c3c3c3",
              marginBottom: "10px", // Space between image and text,
              minHeight: "50%",
            }}
          />
          <Typography sx={{ fontWeight: 600 }}>Super Box</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              <CurrencyRupeeIcon
                sx={{
                  width: "20px",
                  height: "16px",
                  color: "white",
                  bgcolor: "black",
                  borderRadius: "10px",
                }}
              />
              100/unit
            </Typography>
            <Typography sx={{ marginLeft: "6px" }}>
              <LocalOfferIcon
                sx={{ width: "16px", height: "16px", color: "red" }}
              />
              20%
            </Typography>
          </Box>
          <Typography>dal,chawal,sabji-1,Roti</Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "#fffdfd",
            width: "45%", // Adjust the width for both boxes
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            marginRight: "15px", // Space between boxes
            borderRadius: "5px", // Add border radius
            boxShadow: "5px 5px 5px #c3c3c3",
            height: "200px",
          }}
        >
          <img
            src="https://img.freepik.com/premium-photo/product-shots-spaghetti_994245-2173.jpg"
            alt="Super Box"
            style={{
              width: "50%",
              minHeight: "50%",

              boxShadow: "5px 5px 5px #c3c3c3",
              marginBottom: "10px", // Space between image and text
            }}
          />
          <Typography sx={{ fontWeight: 600 }}>Super Box</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              <CurrencyRupeeIcon
                sx={{
                  width: "20px",
                  height: "16px",
                  color: "white",
                  bgcolor: "black",
                  borderRadius: "10px",
                }}
              />
              100/unit
            </Typography>
            <Typography sx={{ marginLeft: "6px" }}>
              <LocalOfferIcon
                sx={{ width: "16px", height: "16px", color: "red" }}
              />
              20%
            </Typography>
          </Box>
          <Typography>dal,chawal,sabji-1,Roti</Typography>
        </Box>
      </Box>

      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2, boxShadow: "5px 5px 5px #c3c3c3" }}
      >
        See More
      </Button>

      {/* Reviews Section */}
      <Box
        mt={4}
        sx={{
          border: "1px solid #999",
          borderRadius: "5px",
          minHeight: "250px",
          boxShadow: "5px 5px 5px #c3c3c3",
        }}
      >
        <Box display="flex" sx={{ ml: 2, mt: 1 }}>
          <Typography variant="h6">start a Review</Typography>
          <Rating
            value={0}
            sx={{ marginLeft: "35px", color: "#00BFA6", marginTop: "2px" }}
          />
        </Box>
        <Typography sx={{ ml: 2 }}>user reviews</Typography>
        <Review
          name="Ramesh Kumar"
          rating={5}
          timeAgo="1 month ago"
          comment="Good service"
        />
        <Review
          name="Dilip Joshi"
          rating={3}
          timeAgo="3 months ago"
          comment="Average service"
        />
      </Box>
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2, boxShadow: "5px 5px 5px #c3c3c3" }}
      >
        See More Reviews
      </Button>

      {/* Business Information */}
      <BusinessInformation />
    </Container>
  );
};

export default SupplierPage;
