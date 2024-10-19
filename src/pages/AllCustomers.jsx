import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Graygreen } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { allCustomersAction } from "../redux/action_api/productAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AllCustomers = ({ lang }) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { loading, error, allCustomers } = useSelector(
    (state) => state.allGroup
  );

  console.log(allCustomers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCustomersAction());
  }, [dispatch]);

  // Search filter logic for name or mobile number
  const filtered = allCustomers?.filter(
    (customer) =>
      customer?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      customer?.mobile?.includes(search)
  ) || [];

  const handleStaff = () => {
    navigate("/staf");
  };

  const handleCustomerBtn = () => {
    navigate("/add/customer");
  };

  const handleNextBtn = () => {
    navigate("/steps");
  };

  if (!lang) {
    return "loading"; // Fixed typo "laoding" to "loading"
  }

  return (
    <Box sx={{ padding: 2, maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h6" align="center" gutterBottom>
        {lang?.All_Customers || "All Customers"}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2, boxShadow: "5px 5px 5px #c3c3c3",
                  border: "1px solid #999",
                  borderRadius:'5px', }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          placeholder="Search Customer via Name / Mobile number"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
       
          borderRadius:'5px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          {lang?.Add_groups || "Add Group"}
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a Group
            </Typography>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              size="small"
              fullWidth
              sx={{ mt: 2 }}
            />
          </Box>
        </Modal>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleStaff}
          sx={{borderRadius:'5px',}}
        >
          {lang?.add_staff || "Add Staff"}
        </Button>
      </Box>

      <List>
        {filtered.map((customer, index) => (
          <ListItem
            key={index}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: 1,
              height: "8vh",
            }}
          >
            <Grid container alignItems="center">
              <img
                src={customer.user_image}
                alt=""
                style={{ width: "5vh", height: "5vh", borderRadius: "50%" }}
              />
              <Grid item xs={6}>
                <ListItemText
                  primary={customer.fullname}
                  secondary={customer.group_name}
                />
              </Grid>
              <Grid item xs={3} align="right">
                <Typography
                  variant="body2"
                  color={customer.status < 0 ? "red" : "green"}
                >
                  {customer.security_deposit}
                </Typography>
              </Grid>
              <Grid item xs={3} align="right">
                <Typography
                  variant="body2"
                  color={
                    customer.status < 0
                      ? "red"
                      : customer.status === 0
                      ? "black"
                      : "green"
                  }
                >
                  {customer.status}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          onClick={handleCustomerBtn}
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            width: "22vh",
            fontSize: useMediaQuery("(max-width:600px)") ? "10px" : "10px", // Ensure useMediaQuery is utilized
          }}
        >
          {lang?.add_customers || "ADD CUSTOMER"}
        </Button>
      </Box>

      <Box>
        <Button
          onClick={handleNextBtn}
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            bgcolor: Graygreen,
          }}
        >
          {lang?.Next || "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default AllCustomers;
