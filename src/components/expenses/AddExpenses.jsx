import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import { Person, CameraAlt } from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
export default function AddExpenses({ lang }) {
  const [active, setActive] = useState("Online");
  const [onlineType, setonlineType] = useState(true);
  const [payType, setPayType] = useState(true);
  const [category, setCategory] = useState("");

  const [newCategory, setNewCategory] = useState(""); // State for the new category input
  const [showTextField, setShowTextField] = useState(false);

  const [categories, setCategories] = useState([
    "Add New Category",
    "Rent",
    "Salary",
    "Electricity",
    "Water",
    "Vegetable",
    "Ration",
    "Marketing",
    "Fuel",
    "Office Expenses",
    "Transportation",
    "Insurance",
  ]); // Initial list of categories
  //   handle Actions
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    if (storedCategories) {
      setCategories([...categories, ...storedCategories]);
    }
  }, []);

  // Handle category selection
  const handleChange = (event) => {
    const selectedCategory = event.target.value;

    // If "Add New Category" is selected, show the input field
    if (selectedCategory === "Add New Category") {
      setShowTextField(true);
    } else {
      setCategory(selectedCategory); // Set selected category
      setShowTextField(false); // Hide input field if another category is selected
    }
  };

  // Handle saving new category
  const handleSaveCategory = () => {
    if (newCategory) {
      const updatedCategories = [...categories, newCategory];
      localStorage.setItem(
        "categories",
        JSON.stringify(updatedCategories.slice(1))
      ); // Remove the "Add New Category" option
      setCategories(updatedCategories); // Update categories state
      setCategory(newCategory); // Set the selected category to the new one
      setNewCategory(""); // Clear the text field
      setShowTextField(false); // Hide the text field
    }
  };

  const HandleButton = (type) => {
    setActive(type);

    if (type === "Online") {
      setonlineType(true);
    } else {
      setonlineType(false);
    }
  };

  const HandlePayment = (paytype) => {
    setPayType(paytype);
  };

  const [rows, setRows] = useState([
    { itemName: "", qty: 0, rate: 0, amount: 0 },
    { itemName: "", qty: 0, rate: 0, amount: 0 },
    { itemName: "", qty: 0, rate: 0, amount: 0 },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = parseFloat(value) || 0;
    updatedRows[index].amount =
      updatedRows[index].qty * updatedRows[index].rate; // Calculate amount
    setRows(updatedRows);
  };

  // Calculate total amount
  const totalAmount = rows.reduce((total, row) => total + row.amount, 0);

  if (!lang) {
    return "...loading";
  }
  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 400, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        {lang.a_exp || "Add Expenses"}
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              border: "1px solid #333",
              padding: "8px",
              borderRadius: "8px",
              bgcolor: "#B3DEB7",
              boxShadow: "5px 5px 5px #c3c3ce",
            }}
          >
            <Person color="primary" />
            <Typography
              variant="body2"
              sx={{
                // color: "white",
                fontWeight: 600,
                fontSize: "15px",
                ml: 1,
              }}
            >
              Moin
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={{
              boxShadow: "5px 5px 5px #c3c3c3",
              border: "1px solid #333",
              borderRadius: "4px", // Optional: to round the corners slightly
            }}
            // label="Date"
            type="date"
            defaultValue="2024-07-19"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>{lang.ctry || "Category *"}</InputLabel>
        <Select
          value={category} // Controlled component
          label="Category *"
          onChange={handleChange} // Handle selection change
          aria-required
        >
          {categories.map((categoryName, index) => (
            <MenuItem
              key={index}
              value={categoryName}
              sx={{ color: index === 0 ? "#00BFA6" : "" }} // Custom style for first option
            >
              {categoryName}
            </MenuItem>
          ))}
        </Select>

        {showTextField && (
          <div style={{ marginTop: "10px" }}>
            <TextField
              label="Enter New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)} // Update the new category state
              fullWidth
            />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSaveCategory} // Save new category
            >
              Save Category
            </Button>
          </div>
        )}
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: "7px" }}>
        <Typography variant="subtitle2" align="right">
          {lang.b_Items || "   Billed Items"}
        </Typography>
        <Typography variant="subtitle2" color="error" align="right">
          {lang.d_item || "Delete Item"}
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          mt: 1,
          mb: 2,
          border: "1px solid black",
          boxShadow: "5px 5px 5px #c3c3c3",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{lang.i_nmae || "Item Name"}</TableCell>
              <TableCell align="right"> {lang.qty || "Qty"}</TableCell>
              <TableCell align="right"> {lang.qty || "Rate"}</TableCell>
              <TableCell align="right"> {lang.am || "Amount"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <TextField fullWidth variant="standard" type="text" />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="text"
                    variant="standard"
                    value={row.qty}
                    onChange={(e) =>
                      handleInputChange(index, "qty", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="text"
                    variant="standard"
                    value={row.rate}
                    onChange={(e) =>
                      handleInputChange(index, "rate", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="text"
                    variant="standard"
                    value={row.amount}
                    disabled
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} sx={{ fontWeight: 800, fontSize: "18px" }}>
                {lang.tol_am || "Total"}
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 800, fontSize: "18px" }}
              >
                <CurrencyRupeeIcon
                  sx={{
                    fontSize: "16px",
                    bgcolor: "black",
                    color: "white",
                    borderRadius: "12px",
                    mr: 0.5,
                  }}
                />
                {totalAmount.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 600,
          border: "1px solid #333",
          p: 1,
          bgcolor: "#CACACA",
          borderRadius: "5px",
          //   boxShadow: "5px 5px 5px #cfbdbd",
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 800 }}>
          {lang.tol_am || "Total Amount"}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: 800,
            display: "inline-flex",
            alignItems: "center",
            fontSize: "18px",
          }}
        >
          <CurrencyRupeeIcon
            sx={{
              fontSize: "20px",
              mr: 8,
              bgcolor: "black",
              color: "white",
              borderRadius: "15px",
              fontWeight: 800,
            }}
          />
          {totalAmount.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: 400, fontSize: "18px" }}
        >
          {lang.ptype || "Payment Type"}
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          <button
            id="expenses_btn"
            onClick={() => {
              HandleButton("Cash");
            }}
            style={{
              backgroundColor: active === "Cash" ? "#00BFA6" : "",
            }}
          >
            {lang.csh || "Cash"}
          </button>
          <button
            id="expenses_btn"
            onClick={() => {
              HandleButton("Online");
            }}
            style={{
              backgroundColor: active === "Online" ? "#00BFA6" : "",
            }}
          >
            {" "}
            {lang.o_line || "Online"}
          </button>
        </Typography>
      </Box>
      {onlineType && (
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {[
            "Google Pay",
            "PhonePe",
            "Net Banking",
            "Other Upi",
            "Paytm",
            "Debit Card",
            "Credit Card",
          ].map((type) => (
            <Grid item key={type}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  boxShadow: "5px 5px 5px #c3c3c3",
                  color: "black",
                  backgroundColor: payType === type ? "#00BFA6" : "",
                }}
                onClick={() => {
                  HandlePayment(type);
                }}
              >
                {type}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{
            boxShadow: "5px 5px 5px #c3c3c3",
          }}
          fullWidth
          multiline
          rows={3}
          margin="normal"
          //   variant="outlined"
          label={lang.desc || "Description"}
          placeholder="Add Note"
        />
        <IconButton color="primary " sx={{ display: "block" }}>
          <CameraAlt sx={{ color: "#00BFA6" }} />
          <Typography sx={{ color: "#00BFA6" }}>
            {lang.u_img || "Upload image"}
          </Typography>
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="primary" fullWidth sx={{ ml: 2 }}>
          {lang.sve || "Save"}
        </Button>
      </Box>
    </Paper>
  );
}
