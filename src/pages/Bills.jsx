import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
  Checkbox,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShareIcon from "@mui/icons-material/Share";
import EditNoteIcon from "@mui/icons-material/EditNote";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
    background: {
      default: "#e8f5e9",
    },
  },
});

const products = [
  { name: "Food wise Lunch", quantity: 45, price: 70, amount: 3150 },
  { name: "Food wise Dinner", quantity: 20, price: 70, amount: 1400 },
  { name: "Super Box Dinner", quantity: 18, price: 90, amount: 1620 },
];

const Bills = ({ lang }) => {
  if (!lang) {
    return "...loading";
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: 400,
          margin: "auto",
          bgcolor: "background.paper",
          height: "100vh",
          overflowY: "hidden",
          overflowX: "hidden", // Prevent horizontal scrolling
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,

            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <IconButton edge="start" aria-label="back">
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            {lang.bls || "Bills"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="subtitle1">
            Moinn
            <IconButton edge="end" color="inherit" aria-label="details">
              <ChevronRightIcon />
            </IconButton>
          </Typography>
        </Box>

        <Box sx={{}}>
          <Paper
            sx={{
              bgcolor: "grey.200",
              maxWidth: "100%",
              boxShadow: "5px 5px 5px #c3c3c3",
              border: "2px solid #999",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                mb: 1,
                bgcolor: "grey.200",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "grey.200",
                  justifyContent: "space-around",
                }}
              >
                <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  July 2024
                </Typography>
              </Box>
              <Box>
                <IconButton size="small">
                  <PictureAsPdfIcon fontSize="small" color="error" />
                </IconButton>
                <IconButton size="small">
                  <WhatsAppIcon fontSize="small" color="success" />
                </IconButton>
                <IconButton size="small">
                  <ShareIcon fontSize="small" color="primary" />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                bgcolor: "grey.200",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {lang.blg_dt || "Billing Date"}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                22 July 2024
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {" "}
                12:30 PM
              </Typography>
            </Box>
          </Paper>

          <TableContainer
            component={Paper}
            sx={{
              mt: 2,
              width: "100%",
            }}
          >
            <Table
              size="small"
              sx={{
                border: "2px solid #999",
                boxShadow: "5px 5px 5px #c3c3c3",
              }}
            >
              <TableHead sx={{ maxWidth: "100%", bgcolor: "#D9D9D9" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {" "}
                    {lang.pdts || "Products"}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {lang.qts || "Quantity"}
                    {/* <span style={{ display: "block", fontSize: "7px" }}>
                    product Delivered
                  </span> */}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {lang.Prc || "Price"}
                    {/* <span style={{ display: "block", fontSize: "6px" }}>
                    Each product price
                  </span> */}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {lang.amt || "Amount"}
                    {/* <span style={{ display: "block", fontSize: "6px" }}>
                    Quantity + price
                  </span> */}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ bgcolor: "#fefde7" }}>
                {products.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 600 }}
                    >
                      {product.name}
                    </TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 500 }}>
                      {product.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              bgcolor: "#B3DEB7",
              ml: 0,
              mt: 1,
              p: 2,
              border: "2px solid #999",
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {lang.ttl_amt || "Total Amount:"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                6,170
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "17px" }}>
                {lang.l_mnt_dvc_due || " Last month Advance/ Due:"}
              </Typography>
              <Typography
                variant="body2"
                color="error.main"
                sx={{ fontSize: "17px" }}
              >
                (570)
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", my: 1 }}
            >
              <Typography variant="body2" sx={{ fontSize: "17px" }}>
                {lang.at_rec_month || " Amount Received this month:"}
              </Typography>
              <Typography
                variant="body2 "
                sx={{ color: "green", fontSize: "17px", fontWeight: 600 }}
              >
                8,300
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", my: 1 }}
            >
              <Typography variant="body2" sx={{ fontSize: "17px" }}>
                {lang.pmt_du_ld || "Payment Due before Locofeed:"}
              </Typography>
              <Typography
                variant="body2"
                color="error.main"
                sx={{ fontSize: "17px" }}
              >
                (630)
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
              <EditNoteIcon />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexGrow: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontSize: "17px" }}>
                  {lang.d_chrgs || "Delivery Charges:"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "green", fontWeight: 600, fontSize: "17px" }}
                >
                  300
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EditNoteIcon />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexGrow: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontSize: "17px" }}>
                  {lang.r_fd || "Return food:"}
                </Typography>
                <Typography
                  variant="body2"
                  color="error.main"
                  sx={{ fontSize: "17px" }}
                >
                  (670)
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {lang.ttad || "Total Amount Advance (Due)"}
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, display: "block" }}
                >
                  [(8300-300)-(6170+570+630+670)]
                </Typography>
              </Typography>
              <Typography
                variant="subtitle2"
                color="success.main"
                sx={{ fontWeight: 700, fontSize: "16px" }}
              >
                560
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Bills;
