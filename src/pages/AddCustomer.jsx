import React, { useEffect, useState, useRef } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Container,
  Typography,
  Popover,
} from "@mui/material";
import { GetAllGroup } from "../redux/action_api/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Graygreen } from "../config";
import { addCustomer, addGroupAction } from "../redux/action_api/Api";
import Loader from "../components/Loder/Loder";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddCustomerForm = ({ categoryId, lang, CloseHides }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch groups data from Redux store
  const { Allgroup } = useSelector((state) => state.allGroup);
  const { loading, error, isSucsess } = useSelector((state) => state.Addgroup);
  const {
    loading: load,
    error: err,
    isSucsess: suc,
  } = useSelector((state) => state.AddCustomer);

  const [loader, setLoader] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [groups, setGroups] = useState([]); // Initialize as empty
  const [successMessage, setSuccessMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [nameError, setnameError] = useState(false);
  const [numberError, setnumberError] = useState(false);
  const [isDirectcall, setisDirectCall] = useState(false);

  useEffect(() => {
    if (loading === true || load === true) {
      setLoader(true);
    } else {
      setLoader(false);
    }
    if (isSucsess) {
      Swal.fire({
        title: "group added successfully!",
        text: `Your group has been successfully added`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (error) {
      Swal.fire({
        title: "Something went wrong!",
        text: "There was an error. Please try again later.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (suc) {
      Swal.fire({
        title: "Add Customer successfully!",
        text: `Your Customer has been successfully added`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Navigate only if isDirectcall is true (use a callback to ensure correct value)
        if (isDirectcall) {
          CloseHides();
          navigate("/staf");
        }
      });

      setLoader(false);
    }
    if (err) {
      Swal.fire({
        title: "Something went wrong!",
        text: "There was an error. Please try again later.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [loading, isSucsess, error, suc, isDirectcall]);

  const addNewGroupRef = useRef(null);

  useEffect(() => {
    dispatch(GetAllGroup());
  }, [dispatch]);

  // Update local groups state when Redux state changes
  useEffect(() => {
    if (Allgroup && Allgroup) {
      setGroups(Allgroup);
    }
  }, [Allgroup]);

  // Handlers for form fields
  const handleCustomerNameChange = (e) => setCustomerName(e.target.value);
  const handleContactNumberChange = (e) => setContactNumber(e.target.value);

  // Handler for group selection
  const handleGroupChange = (event) => {
    const groupId = event.target.value;
    setSelectedGroupId(groupId);
  };

  // Open and close popover handlers
  const handleDialogOpen = (event) => setAnchorEl(addNewGroupRef.current);
  const handleDialogClose = () => {
    setAnchorEl(null);
    setNewGroupName("");
  };

  // Add new group handler
  const handleAddNewGroup = () => {
    dispatch(addGroupAction(newGroupName));
    setLoader(false);
  };

  const DefaultHandleSubmit = () => {
    setnameError(!customerName);
    setnumberError(!contactNumber);
    if (!contactNumber || !customerName) return;

    if (!contactNumber) return;
    const phoneNumberPattern = /^[0-9]{10}$/;

    if (!contactNumber || !phoneNumberPattern.test(contactNumber)) {
      Swal.fire({
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const selectedGroup = groups.find((group) => group.id === selectedGroupId);
    console.log(selectedGroup, "selected IDDDDDDDD");

    const formData = new FormData();
    formData.set("user_name", contactNumber);
    formData.set("fullname", customerName);
    formData.set("mobile", contactNumber);
    formData.set("group_id", selectedGroup.id);
    formData.set("vendor_id", 1);
    formData.set("user_type", "customer");

    dispatch(addCustomer(formData));
  };

  const handleSaveAndNew = async () => {
    await DefaultHandleSubmit();

    // Resetting the states after submission
    setCustomerName("");
    setContactNumber("");
    setSelectedGroupId("");
    setisDirectCall(false);
  };
  const handleSaveCustomer = () => {
    DefaultHandleSubmit();
    setisDirectCall(true);
  };

  const handleImportCustomers = () => {
    alert("Import Customers functionality is not implemented yet.");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container maxWidth="sm" style={{ padding: "16px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h4">
          {" "}
          {lang?.add_customer || "Add New Customer"}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleImportCustomers}
          startIcon={<span style={{ marginRight: "8px" }}>📥</span>}
          style={{ borderRadius: "8px", backgroundColor: "#00BFA6" }}
        >
          Import Customers
        </Button>
      </div>

      {/* Form Container */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        {/* Customer Name Field */}
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <TextField
            error={nameError}
            label={lang?.c_name || "Customer Name"}
            value={customerName}
            onChange={handleCustomerNameChange}
            placeholder={lang?.c_name || "Customer Name"}
          />
        </FormControl>

        {/* Contact Number Field */}
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <TextField
            error={numberError}
            label={lang?.c_number || "Customer Number"}
            value={contactNumber}
            type="Number"
            onChange={handleContactNumberChange}
            placeholder={lang?.c_number || "Customer Number"}
          />
        </FormControl>

        {/* Group Selection */}
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <InputLabel id="group-select-label">Group</InputLabel>
          <Select
            labelId="group-select-label"
            value={selectedGroupId}
            onChange={handleGroupChange}
            label="Group"
            renderValue={(selected) => {
              const selectedGroup = groups.find(
                (group) => group.id === selected
              );
              return selectedGroup
                ? selectedGroup.group_name
                : "Select a group";
            }}
            sx={{
              width: "100%",
              fontSize: "14px",
              ".MuiSelect-select": {
                // This targets the selected value area
                textAlign: "left",
                paddingLeft: "12px", // Adjust the padding as needed
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    fontSize: "0.875rem", // smaller font size
                    padding: "4px 8px", // reduced padding
                  },
                },
              },
            }}
          >
            <Button
              ref={addNewGroupRef}
              variant="outlined"
              onClick={handleDialogOpen}
              style={{
                marginLeft: "70%",
                color: Graygreen,
              }}
            >
              Add New Group
            </Button>
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.group_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Popover for adding a new group */}
        <Popover
          id={id}
          open={open}
          onClose={handleDialogClose}
          anchorReference="anchorPosition"
          anchorPosition={{
            top: window.innerHeight / 2,
            left: window.innerWidth / 2,
          }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center content horizontally
              justifyContent: "center", // Center content vertically
              width: "300px", // Control popover size
              position: "absolute", // Ensure it's positioned centrally
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <div style={{ padding: "16px",fontSize: '15px' }}>
          <Typography variant="h6" sx={{ fontSize: '6px' }}>
         Add New Group
         </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Group Name"
              type="text"
              fullWidth
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <Button onClick={handleAddNewGroup} color="primary">
              Add
            </Button>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
          </div>
        </Popover>

        {/* Save Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSaveAndNew}
            style={{
              borderRadius: "8px",
              backgroundColor: Graygreen,
              color: "#fff",
            }}
          >
            {lang?.save_new || "Save & New"}
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveCustomer}
            style={{
              borderRadius: "8px",
              backgroundColor: Graygreen,
              color: "#fff",
            }}
          >
            {lang?.save_customer || " Save Customer"}
          </Button>

          {/* <Button>Temproru</Button> */}
        </div>
      </div>

      {/* Success Message Snackbar */}
      {/* {successMessage && (
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage("")}
        >
          <Alert onClose={() => setSuccessMessage("")} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      )} */}
      <Loader open={loader} />
    </Container>
  );
};

export default AddCustomerForm;
