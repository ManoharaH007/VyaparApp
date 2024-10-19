import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import CakeIcon from "@mui/icons-material/Cake";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import StarIcon from "@mui/icons-material/Star";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlaceIcon from "@mui/icons-material/Place";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShareIcon from "@mui/icons-material/Share";
export default function Home() {
  return (
    <Paper
      sx={{
        maxWidth: 480,
        margin: "auto",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "12px",
          maxWidth: "100%",
        }}
      >
        <Grid>
          <Typography
            sx={{
              fontSize: "32px",
              color: "#00BFA6",
              fontWeight: 800,

              marginLeft: "8px",
            }}
          >
            LOCO FEED
          </Typography>
        </Grid>

        <Grid>
          <Typography sx={{ fontWeight: 700, fontSize: 12 }}>
            <span>
              <PlaceIcon className="notification-icon" />
            </span>
            karnataka,banglore
          </Typography>
        </Grid>
      </Box>

      {/* search field */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "100%",
        }}
      >
        <Grid id="search-container">
          <SearchOutlinedIcon id="search-icon" />
          <input
            type="text"
            id="search"
            placeholder="Enter product to search..."
          />
        </Grid>
        <Grid id="bell">
          <span>
            <NotificationsIcon className="notification-icon" />
          </span>
        </Grid>
      </Box>

      {/* remainng */}

      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 100,
              width: 100,
              margin: 1,
              backgroundColor: "#dcf3f3",
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          >
            <WaterDropIcon sx={{ fontSize: 40, color: "#00bfa5" }} />
            <Typography variant="caption">Water Supplier</Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 100,
              width: 100,
              margin: 1,
              backgroundColor: "#dcf3f3",
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          >
            <LocalDiningIcon
              sx={{
                fontSize: 40,
                color: "#00bfa5",
              }}
            />
            <Typography variant="caption">Tiffin Supplier</Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 100,
              width: 100,
              margin: 1,
              backgroundColor: "#dcf3f3",
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          >
            <DirectionsBikeIcon sx={{ fontSize: 40, color: "#00bfa5" }} />
            <Typography variant="caption">Milk Supplier</Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 100,
              width: 100,
              margin: 1,
              backgroundColor: "#dcf3f3",
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          >
            <CakeIcon sx={{ fontSize: 40, color: "#00bfa5" }} />
            <Typography variant="caption">Bakery Supplier</Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 100,
              width: 105,
              margin: 1,
              backgroundColor: "#dcf3f3",
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          >
            <NewspaperIcon sx={{ fontSize: 35, color: "#00bfa5" }} />
            <Typography
              variant="caption"
              style={{
                textAlign: "center",
              }}
            >
              Newspaper Supplier
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* card */}
      <Card
        id="crd"
        sx={{
          mt: 2,
          border: "1px solid #999",
          boxShadow: "5px 5px 5px #c3c3c3",
          width: "100%",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "row" }, // Stack on smaller screens, row on larger screens
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Image Section */}
            <Box
              component="img"
              src="../images/loginhome.jpg"
              alt=""
              sx={{
                height: "10vh",
                width: "10vh",
                pr: 2,
              }}
            />

            {/* Text Section */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ fontWeight: 700 }}
              >
                <StoreIcon /> Shree Balaji Water Supplier
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 700, mt: "5px" }}
              >
                <span
                  style={{
                    backgroundColor: "#00BFA6",
                    color: "white",
                    padding: "0 8px", // Add padding inside for better look
                    marginRight: "10px", // Space between spans
                  }}
                >
                  8 yr exp.
                </span>

                <span
                  style={{
                    backgroundColor: "#1BB334",
                    color: "white",
                    padding: "0 8px",
                    marginRight: "10px", // Space between spans
                  }}
                >
                  <StarIcon
                    sx={{
                      fontSize: 14,
                      color: "gold",
                      verticalAlign: "middle", // Align icon with text
                    }}
                  />
                  4.2
                </span>

                <span style={{ color: "#000000" }}>49 Ratings</span>
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 700, mt: "5px" }}
              >
                Kala Ghoda, Bhavnagar, Udaipur
              </Typography>
              <Typography
                variant="body2"
                color="#000000"
                sx={{ fontWeight: 700, fontSize: "13px", mt: "5px" }}
              >
                Price Range (100-150) / Each(box/Liter/Jar)
              </Typography>
            </Box>
          </Box>

          {/* Button Section */}
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
                // padding: "7px",
                fontSize: {
                  xs: "10px",
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
              size="small"
              sx={{
                width: "100%",
                mr: 1,
                ml: { xs: 0.5, sm: 1 },
                color: "black",
                padding: "5px",
                flexGrow: 1, // Allow to grow and fill space
                minWidth: { xs: "auto", sm: "100px" },
                boxShadow: "5px 5px 5px #c3c3c3",
                fontSize: {
                  xs: "10px",
                },
                // padding: "7px",
              }}
            >
              <PlaceIcon sx={{ width: "15px", height: "16px" }} /> Location
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
                // padding: "7px",
              }}
            >
              <ShareIcon sx={{ width: "16px", height: "16px" }} /> Share
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon sx={{ color: "#000000" }} />}
          />
          <BottomNavigationAction
            label="Orders"
            icon={<ListAltIcon sx={{ color: "#000000" }} />}
          />
          <BottomNavigationAction
            label="More"
            icon={<MoreHorizIcon sx={{ color: "#000000" }} />}
          />
        </BottomNavigation>
      </Paper>
    </Paper>
  );
}
