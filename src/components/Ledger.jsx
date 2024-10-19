import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { ArrowBack, Delete, Save, Add } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ShareIcon from "@mui/icons-material/Share";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Ledger = ({ lang }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share this awesome content!",
          text: "Check out this amazing content!",
          url: "http://localhost:5173/ledger", // Replace with the URL you want to share
        });
        console.log("Share successful");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Share not supported on this browser");
    }
  };

  const handleWhatsAppShare = () => {
    const message = "Check out this amazing content!";
    const url = "https://example.com";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      message
    )} ${encodeURIComponent(url)}`;

    window.open(whatsappUrl, "_blank");
  };

  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("My Styled Table", 14, 20);

    doc.setFontSize(16);
    doc.text("Total Invoice Amount: 5000", 14, 30);
    doc.text("Discount and Extra Charges: 480", 14, 40);
    doc.text("Total Amount Received: 6480", 14, 50);
    doc.text("Total Due Amount: 1480", 14, 60);

    // Define the columns and data
    const columns = [
      { title: "Date", dataKey: "date" },
      { title: "Debit", dataKey: "debit" },
      { title: "Credit", dataKey: "credit" },
      { title: "Balance", dataKey: "balance" },
    ];

    const rows = [
      { date: "22 July", debit: "800", credit: "1000", balance: "200" },
    ];

    const tableStartY = 70;
    const tableHeight = 30;

    // Use autotable for styling the table
    doc.autoTable({
      head: [columns.map((col) => col.title)],
      body: rows.map((row) => [
        {
          content: row.date,
          styles: { fillColor: "#ffeaea", textColor: "#de665c" },
        },
        {
          content: row.debit,
          styles: { fillColor: "#ffeaea", textColor: "#de665c" },
        },
        {
          content: row.credit,
          styles: { fillColor: "#E7AFAF", textColor: "green" },
        },
        {
          content: row.balance,
          styles: { fillColor: "#E7AFAF", textColor: "green" },
        },
      ]),
      styles: {
        font: "Helvetica",
        overflow: "linebreak",
        cellWidth: "auto",
        fontSize: 12,
        cellPadding: 2,
      },
      theme: "grid",
      margin: { top: tableStartY },
    });

    doc.autoTable.previous.finalY += 20;

    doc.save("ledger.pdf");
  };

  // if (!lang?) {
  //   return "...loading";
  // }

  return (
    <Container
      maxWidth="xs"
      sx={{ p: 2, borderRadius: 2, mt: 2 }}
      id="content-to-download"
    >
      <Grid container alignItems="center" justifyContent="center">
        <Typography variant="h6" component="h1">
          {lang?.lger || "Ledger"}
        </Typography>
      </Grid>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            textAlign: "center", // Center text
          }}
        >
          MOHAMMED
        </Typography>
        <ArrowForwardIosIcon sx={{ ml: 1 }} /> {/* Right arrow icon */}
      </Box>

      <Grid
        style={{
          display: "flex",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
        sx={{ mt: 2, mb: 1 }}
      >
        <PictureAsPdfIcon sx={{ mr: 2 }} onClick={downloadPdf} />{" "}
        {/* Add margin-right */}
        <WhatsAppIcon sx={{ mr: 2 }} onClick={handleWhatsAppShare} />{" "}
        {/* Add margin-right */}
        <ShareIcon onClick={handleShare} />
      </Grid>

      {/* Form Section */}
      <Grid container spacing={2} id="ledger" sx={{ mt: 2 }}>
        <Grid item xs={5}>
          <Select
            style={{
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
            fullWidth
            defaultValue=""
            displayEmpty
            sx={{
              height: {
                xs: "5vh",
              },
              width: {
                xs: "14vh",
              },
              backgroundColor: "#f1f1f1",
            }}
          >
            <MenuItem value="" disabled>
              {lang?.mnth || "Month"}
            </MenuItem>
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            {/* Add other months */}
          </Select>
        </Grid>
        <Grid item xs={5} id="txt">
          <TextField
            style={{
              boxShadow: "5px 5px 5px #c3c3c3",
              color: "#de665c",
            }}
            placeholder={lang?.ent_amt || "Enter Amount"}
            id="inp-field"
            fullWidth
            sx={{
              height: {
                xs: "5vh",
              },
              width: {
                xs: "19vh",
              },
              marginLeft: {
                xs: "-23px",
              },

              backgroundColor: "#f1f1f1",
            }}
            InputProps={{
              sx: {
                height: "100%", // Ensure input field height matches
              },
            }}
          />
        </Grid>

        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            style={{
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
            sx={{
              height: {
                xs: "5vh",
              },

              marginLeft: {
                xs: "-10px",
              },

              width: "50px",
            }}
          >
            {lang?.sve || " Save"}
          </Button>
        </Grid>
      </Grid>

      {/* Invoice Details */}
      <Grid container spacing={1} sx={{ mt: 2 }} id="container">
        <Grid
          item
          xs={12}
          style={{
            backgroundColor: "#f1f1f1",
            boxShadow: "5px 5px 5px #c3c3c3",
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">
              <strong>{lang?.tal_In_amt || "Total Invoice Amount:"}</strong>
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "red", paddingRight: "18px", fontWeight: "800" }}
            >
              5000
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              marginTop: 0, // Reduce the margin-top
              fontSize: {
                xs: "9px", // Smaller font size for mobile
              },
            }}
          >
            <span id="txt1">
              {lang?.inc_ds_cr || "include discount and extra charges"}
            </span>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            backgroundColor: "#f1f1f1",
            marginTop: "15px",
            boxShadow: "5px 5px 5px #c3c3c3",
          }}
          sx={{
            height: {
              xs: "35px",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ backgroundColor: "#f1f1f1" }}
          >
            <Typography variant="body2">
              <strong>{lang?.tl_amt_rec || "Total Amount Received:"} </strong>
            </Typography>
            <Typography
              variant="body2"
              style={{
                color: "green",
                paddingRight: "18px",
                font: "bold",
                fontWeight: "800",
                backgroundColor: "#f1f1f1",
              }}
            >
              6480
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            backgroundColor: "#f1f1f1",
            marginTop: "15px",
            fontWeight: "800",
            boxShadow: "5px 5px 5px #c3c3c3",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              height: {
                xs: "26px",
              },
            }}
          >
            <Typography variant="body2">
              <strong>{lang?.tl_due_amt || "Total Due Amount: "}</strong>
            </Typography>
            <Typography
              variant="body2"
              style={{
                color: "green",
                paddingRight: "18px",
                font: "bold",
                fontWeight: "800",
                backgroundColor: "#f1f1f1",
              }}
            >
              1480
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Table Section */}
      <Table
        sx={{
          boxShadow: "5px 5px 5px #c3c3c3",

          margin: "0 auto",
          mt: 2,

          backgroundColor: "#ffebee",
          borderCollapse: "collapse", // Ensure borders are applied properly
          maxWidth: "100%", // Make the table responsiv
        }}
        id="tbl"
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                // width: "30%", // Adjust width for Date column
                border: "1px solid #de665c",
                fontSize: "20px", // Apply #de665c border
              }}
            >
              {lang?.dt || "Date"}
            </TableCell>
            <TableCell sx={{ border: "1px solid #de665c" }}>
              {lang?.dbt || "Debt"}
              <span
                style={{
                  padding: 0,
                  lineHeight: "15px",
                  display: "flex", // Place below Balance
                  fontSize: "0.8em", // Decrease the size
                  justifyContent: "center",
                }}
              >
                ({lang?.b_amt || "amount"})
              </span>
            </TableCell>
            <TableCell sx={{ border: "1px solid #de665c" }}>
              {lang?.cdt || "Credit"}
              <span
                style={{
                  display: "flex", // Place below Balance
                  fontSize: "0.8em", // Decrease the size
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                {/* {lang?.pmt_clt || "collected"} */}
              </span>
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid #de665c",
                padding: 1,
              }}
            >
              {lang?.bnce || "Balance"}
              <span
                style={{
                  display: "flex", // Place below Balance
                  fontSize: "0.8em", // Decrease the size
                  justifyContent: "center",
                }}
              >
                ({lang?.Rng || "Running"})
              </span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              sx={{
                border: "1px solid #de665c",
                padding: 1,
              }}
            >
              <p
                style={{
                  width: {
                    xs: "25vh",
                    sm: "50vh",
                  },
                  fontSize: {
                    xs: "16px", // Font size for mobile (extra-small screens)
                    sm: "18px", // Font size for larger screens
                  },

                  // marginTop: "-2vh",
                }}
              >
                22July
                <span
                  style={{
                    fontSize: {
                      xs: "8px", // Font size for mobile
                      sm: "12px", // Font size for larger screens
                    },
                  }}
                >
                  (amount collected by Moin)
                </span>
              </p>
            </TableCell>
            <TableCell sx={{ border: "1px solid #de665c" }}>
              800 (Debit)
            </TableCell>
            <TableCell sx={{ border: "1px solid #de665c", color: "green" }}>
              1000 (Credit)
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid #de665c",
                color: "green",
                justifyContent: "center",
                // padding: "4px ",
              }}
            >
              200 (Credit)
            </TableCell>
          </TableRow>

          {/* Full-width Delete Button Row */}
          <TableRow>
            <TableCell colSpan={4} sx={{ border: "1px solid #de665c" }}>
              <Grid container justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  sx={{ width: "100%", bgcolor: "#f1f1f1" }} // Full width of the table
                >
                  {lang?.dlt_ery || "delete entry`"}
                </Button>
              </Grid>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Footer Section */}
    </Container>
  );
};

export default Ledger;
