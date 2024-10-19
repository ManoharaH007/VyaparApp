import React, { useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import { CalendarToday, Person } from "@mui/icons-material";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import { fontSize, fontWeight } from "@mui/system";

const CustomerDetailsModal = ({ HandleOpen }) => {
  const products = [
    { id: 1, name: "Basic Lunch Tiffin", delivered: 5, returned: 3 },
    { id: 2, name: "Basic Dinner Tiffin", delivered: 5, returned: 0 },
    { id: 3, name: "Super Lunch Tiffin", delivered: 0, returned: 0 },
    { id: 4, name: "Premium Lunch Tiffin", delivered: 0, returned: 0 },
  ];

  const HandleOpenToggle = () => {
    HandleOpen();
  };

  const [productList, setProductList] = useState(products);

  // Function to handle the delivered quantity change
  const handleDeliveredChange = (index, operation) => {
    setProductList((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index
          ? {
              ...product,
              delivered:
                operation === "increase"
                  ? product.delivered + 1
                  : product.delivered > 0
                  ? product.delivered - 1
                  : 0,
            }
          : product
      )
    );
  };

  // Function to handle the returned quantity change
  const handleReturnedChange = (index, operation) => {
    setProductList((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index
          ? {
              ...product,
              returned:
                operation === "increase"
                  ? product.returned + 1
                  : product.returned > 0
                  ? product.returned - 1
                  : 0,
            }
          : product
      )
    );
  };

  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 2,
          bgcolor: "#ffebee",
          boxShadow: "5px 5px 5px #c3c3c3",
          border: "2px solid #000000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            border: "1px solid #999",
            borderRadius: "5px",
            padding: "10px",
            boxShadow: "3px 3px 3px #c3c3c3",
          }}
        >
          {/* Date Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 400,
            }}
          >
            <CalendarToday sx={{ mr: 1 }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                05 July 2024
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 400 }}>
                Friday, 2:30 AM
              </Typography>
            </Box>
          </Box>

          {/* Delivery and Return Section */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                border: "1px solid #999", // Apply a border to the entire box
                borderRadius: "5px", // Optional: Add rounded corners
                padding: "10px",
                backgroundColor: "white",
              }}
            >
              5 Delivered | <span>3 Returned</span>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            border: "1px solid #999",
            borderRadius: "5px",
            padding: "10px",
            flexWrap: "nowrap",
            boxShadow: "3px 3px 3px #c3c3c3",
          }}
        >
          {/* App Operator */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DeliveryDiningIcon sx={{ mr: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Moin
            </Typography>
          </Box>

          <Button
            size="small"
            sx={{
              ml: "auto", // Push the button to the far right
              border: "1px solid #999",
              borderRadius: "5px",
              padding: "5px 10px",
              minHeight: "30px",
              bgcolor: "white",
            }}
          >
            Balance Product (7)
          </Button>
        </Box>

        {/* image upload */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            border: "1px solid #999",
            borderRadius: "5px",
            padding: "10px",
            flexWrap: "nowrap",
            boxShadow: "3px 3px 3px #c3c3c3",
          }}
        >
          {/* App Operator */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                bgcolor: "white",
                border: "1px solid #999",
                borderRadius: "5px",
                padding: "5px 10px",
                display: "flex",
                alignItems: "center",
                width: { xs: "17vh", sm: "auto" },
              }}
            >
              <LocalSeeIcon sx={{ marginRight: "2px" }} />
              {/* Add margin to the right for spacing */}
              upload photo
            </Typography>
            {/* Text below the upload photo */}
            <Typography variant="caption" sx={{ marginTop: "5px" }}>
              delivery challan/item Damage
            </Typography>
          </Box>

          <div
            style={{
              position: "relative",
              display: "inline-block",
              flexDirection: "column",
            }}
          >
            <div style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "16px",
                }}
              >
                ₹
              </span>
              <input
                id="inp-customer"
                type="number"
                placeholder="Enter amount"
                style={{
                  border: "1px solid #999",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  minHeight: "25px",
                  paddingRight: "30px", // Create space for rupee symbol
                  backgroundColor: "white",
                }}
              />
            </div>

            <Typography
              variant="caption"
              sx={{
                marginTop: "5px",
                display: "block",
                textAlign: "center",
              }}
            >
              Enter payment recived
            </Typography>
          </div>
        </Box>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ bgcolor: "#ffebee" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="center" sx={{}}>
                  Delivered
                </TableCell>
                <TableCell align="center">Recollected</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList.map((product, index) => (
                <TableRow key={product.index}>
                  <TableCell
                    sx={{
                      borderRadius: "8px",
                      fontSize: "18px",
                      padding: 0,
                      margin: 0,
                      whiteSpace: "nowrap", // Prevents wrapping
                      overflow: "hidden", // Hides the overflowing text
                      textOverflow: "ellipsis", // Adds ellipsis if text overflows
                    }}
                  >
                    {index + 1}.
                    <span
                      style={{
                        whiteSpace: "nowrap", // Prevents wrapping within the span
                        overflow: "hidden", // Hides the overflowing text
                        textOverflow: "ellipsis", // Adds ellipsis if text overflows
                        paddingLeft: "10px", // Optional padding to space the text
                        backgroundColor: "#B1A4A4",
                      }}
                    >
                      {product.name}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{
                        minWidth: "20px",
                        padding: 0,
                        bgcolor: "#B3DEB7",
                        width: "25px",
                      }}
                      onClick={() => handleDeliveredChange(index, "decrease")}
                    >
                      -
                    </Button>

                    <span style={{ padding: "0px" }}>{product.delivered}</span>

                    <Button
                      sx={{
                        minWidth: "20px",
                        padding: 0,
                        bgcolor: "#B3DEB7",
                        width: "25px",
                      }}
                      onClick={() => handleDeliveredChange(index, "increase")}
                    >
                      +
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    {product.returned > 0 && (
                      <Box>
                        <Button
                          sx={{
                            minWidth: "20px",
                            padding: 0,
                            bgcolor: "#B3DEB7",
                            width: "25px",
                          }}
                          onClick={() =>
                            handleReturnedChange(index, "decrease")
                          }
                        >
                          -
                        </Button>

                        <span style={{ padding: "3px" }}>
                          {product.returned}
                        </span>

                        <Button
                          sx={{
                            minWidth: "20px",
                            padding: 0,
                            bgcolor: "#B3DEB7",
                            width: "25px",
                          }}
                          onClick={() =>
                            handleReturnedChange(index, "increase")
                          }
                        >
                          +
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{
            mt: 2,
            boxShadow: "5px 5px 5px #c3c3c3",
            border: "1px solid #999",
          }}
          onClick={HandleOpenToggle}
        >
          Save
        </Button>
      </Paper>
    </div>
  );
};

export default CustomerDetailsModal;
