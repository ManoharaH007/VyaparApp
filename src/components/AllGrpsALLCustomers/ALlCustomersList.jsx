import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import {
  allCustomersAction,
  UpdateGroup,
} from "../../redux/action_api/productAction";
import { SearchCustomer } from "../../redux/action_api/AllAction";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const getAvatarColor = (index) => {
  const colors = [
    "#FF5722",
    "#3F51B5",
    "#9C27B0",
    "#00BCD4",
    "#8BC34A",
    "#FFC107",
  ];
  return colors[index % colors.length];
};

const ALlCustomersList = () => {
  const { searchCustomer } = useSelector((state) => state.SingleCustomer);
  const { loading, error, allCustomers } = useSelector(
    (state) => state.allGroup
  );

  const { isUpdated, error: err } = useSelector((state) => state.Addgroup);

  // const [groupName, setGroupName] = useState("Group Name");
  const [isEditing, setIsEditing] = useState(false); // Track whether we are editing
  const [updatedGroupName, setUpdatedGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(allCustomersAction());
  }, [dispatch]);

  // Handle search click
  const searchFunction = () => {
    if (searchTerm.trim()) {
      dispatch(SearchCustomer(searchTerm.trim()));
      setSearchData("");
    } else {
      dispatch(allCustomersAction());
    }
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      setSearchData(searchCustomer || []);
    } else {
      setSearchData(allCustomers || []);
    }

    if (isUpdated) {
      Swal.fire({
        title: "Updated",
        text: `${isUpdated}`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEditing(false);
    }
    if (error || err) {
      Swal.fire({
        title: "Something went wrong!",
        text: "There was an error. Please try again later.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [searchCustomer, allCustomers, searchTerm, isUpdated, error, err]);

  // Handle save of group name
  const handleSave = () => {
    const formdata = new FormData();

    formdata.set("group_name", updatedGroupName);
    formdata.set("id", 2); //we pas temp default ids
    dispatch(UpdateGroup(formdata));
  };

  const AddCustomer = () => {
    navigate("/add/customer");
  };
  return (
    <Box
      sx={{
        maxWidth: 360,
        mx: "auto",
        textAlign: "center",
        mt: "50px",
        p: 2,
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Group Name with Edit and Group Icons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <IconButton onClick={() => setIsEditing(true)} size="small">
          <EditIcon sx={{ color: "#00BFA6", mr: 2,fontSize:'15px' }} />
        </IconButton>

        <Typography variant="h6" sx={{ color: "#00BFA6",fontSize:'15px',mr:'2px' }}>
          Group Name
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search Customers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "90%",
            boxShadow: "5px 5px 5px #c3c3c3",
            border: "1px solid #999",
            borderRadius:'5px',
          }}
        />
        <Button sx={{fontSize:'12px',color:'blue'}} onClick={searchFunction}>Search</Button>
      </Box>

      {/* Editable Group Name Section */}
      {isEditing && (
        <Box
          sx={{
             backgroundColor: "#00BFA6",
            p: 2,
            borderRadius: "8px",
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, color: "black", fontWeight: "bold" }}
          >
            Update Group Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={updatedGroupName}
            onChange={(e) => setUpdatedGroupName(e.target.value)}
            placeholder="Update group name"
            sx={{
              mb: 2,
              backgroundColor: "white",
              boxShadow: "5px 5px 5px #c3c3c3",
              border: "1px solid #999",
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={() => setIsEditing(false)}
              sx={{
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                boxShadow: "5px 5px 5px #c3c3c3",
            border: "1px solid #999",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                boxShadow: "5px 5px 5px #c3c3c3",
                border: "1px solid #999",
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}

      {/* Customer List */}
      <List>
        {searchData?.length > 0 ? (
          searchData.map((customer, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    boxShadow: "5px 5px 5px #c3c3c3",
                    border: "1px solid #999",
                  },
                  mb: 1,
                  borderRadius: "8px",
                  boxShadow: "5px 5px 5px #c3c3c3",
                  border: "1px solid #999",
                }}
              >
                <Avatar sx={{ bgcolor: getAvatarColor(index) }}>
                  <Typography>{customer.fullname[0]}</Typography>
                </Avatar>
                <Box>
                  <ListItemText
                    primary={customer.fullname}
                    secondary={customer.mobilenumber}
                  />
                </Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color:
                      customer.balanceType === "positive"
                        ? "green"
                        : customer.balanceType === "negative"
                        ? "red"
                        : "grey",
                  }}
                >
                  ₹ {customer.balance}
                </Typography>
                <IconButton>
                  <ArrowForwardIosIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography>No customers found.</Typography>
        )}
      </List>

      {/* Add Customer Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#00BFA6",
          color: "#fff",
          mt: 2,
          borderRadius: "16px",
          padding: "5px 15px",
          boxShadow: "5px 5px 5px #c3c3c3",
            border: "1px solid #999",
        }}
        onClick={AddCustomer}
      >
        Add Customer
      </Button>
    </Box>
  );
};

export default ALlCustomersList;
