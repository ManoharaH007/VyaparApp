import React, { useState, useEffect } from "react";
import {
  Button,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/PersonAddAlt1";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  GetSingleCustomer,
  UpdateCustomerAction,
} from "../../redux/action_api/AllAction";
import { useParams } from "react-router-dom";
import { GetAllGroup } from "../../redux/action_api/productAction";
import Swal from "sweetalert2";
import { GET_SINGLE_CUSTOMER_UPDATE_RESET } from "../../redux/constant/AllConstant";

const CustomerUpdate = () => {
  // Fetching data from redux store
  const { customer } = useSelector((state) => state.SingleCustomer);
  const { Allgroup } = useSelector((state) => state.allGroup);
  const { updSucsess, loading, error } = useSelector(
    (state) => state.updCustomer
  );

  const [group, setGroup] = useState([]); // Use an array for groups
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");

  // Handle group change
  const handleGroupChange = (event) => {
    const groupId = event.target.value;
    setSelectedGroupId(groupId); // Set selected group ID
  };

  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(updSucsess);

  // Fetch single customer and all groups
  useEffect(() => {
    if (updSucsess) {
      Swal.fire({
        title: `${updSucsess.message}`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch({ type: GET_SINGLE_CUSTOMER_UPDATE_RESET });
    }

    if (error) {
      Swal.fire({
        title: `${error}`,
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
      dispatch({ type: GET_SINGLE_CUSTOMER_UPDATE_RESET });
      dispatch(clearError());
    }
    dispatch(GetSingleCustomer(id));
    dispatch(GetAllGroup());
  }, [dispatch, id, error, updSucsess]);

  // Updating the group state when Allgroup is updated
  useEffect(() => {
    if (Allgroup && Allgroup.length > 0) {
      setGroup(Allgroup);
    }

    if (customer) {
      setCustomerName(customer.fullname || "");
      setCustomerMobile(customer.user_name || "");
      // setGroup(cust)
    }
  }, [Allgroup]);

  const HandleSave = () => {
    const formData = new FormData();
    formData.set("user_id", id);
    formData.set("fullname", customerName);
    formData.set("mobile", customerMobile);
    formData.set("group_id", selectedGroupId || customer?.group_id?.id);

    formData.set("user_name", customerMobile);

    dispatch(UpdateCustomerAction(id, formData));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#fff",
      }}
    >
      {/* Header with Avatar and Save Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "50%",

          width: {
            xs: "90%",
            sm: "50%",
          },
          marginBottom: "20px",
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: "25px" }}>
          customer Name
        </Typography>
        {/* <Button
          variant="contained"
          color="success"
          sx={{ boxShadow: "5px 5px 5px #c3c3c3" }}
        >
          Save
        </Button> */}
      </Box>
      {/* second */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "50%",

          width: {
            xs: "90%",
            sm: "50%",
          },
          marginBottom: "20px",
        }}
      >
        <Avatar
          alt="Customer Name"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJm1VcPK75fg8bFTEJ1c4-7rI84xdHK-OhAw&s"
          sx={{ width: 76, height: 66, boxShadow: "5px 5px 5px #c3c3c3" }}
        />
        <Typography>Customer Added by {"App operator name"}</Typography>
      </Box>

      {/* Form Fields */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: {
            xs: "90%",
            sm: "50%",
          },
          gap: 2,
        }}
      >
        <input
          type="text "
          className="inp "
          value={customerName}
          onChange={(e) => {
            setCustomerName(e.target.value);
          }}
          style={{ fontWeight: "Bold", color: "#000000" }}
          placeholder="Customer Name"
        />

        <input
          type="text "
          className="inp "
          value={customerMobile}
          onChange={(e) => {
            setCustomerMobile(e.target.value);
          }}
          style={{ fontWeight: "Bold", color: "#000000" }}
          placeholder="Phone Mobile No"
        />

        {/* Dropdown for General Group */}
        <FormControl
          fullWidth
          sx={{
            border: "1px solid #34c467",
            width: " 98%",
            borderRadius: "8px",
            boxShadow: "5px 5px 5px #c3c3c3",
          }}
        >
          <InputLabel
            id="group-label"
            sx={{ fontSize: "18px", fontWeight: 600, color: "black" }}
          >
            {customer ? customer?.group_id?.group_name : ""}
          </InputLabel>
          <Select
            labelId="group-label"
            id="group-select"
            value={selectedGroupId}
            onChange={handleGroupChange}
            label="Group"
            renderValue={(selected) => {
              const selectedGroup = group.find(
                (group) => group.id === selected
              );
              return selectedGroup
                ? selectedGroup.group_name
                : "Select a group";
            }}
            variant="outlined"
          >
            <MenuItem value="">
              <em>
                <AddIcon fontSize="small" /> Add new group
              </em>
            </MenuItem>
            {group.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.group_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Other Form Fields - Add as per requirement */}

        <input
          type="text "
          className="inp "
          style={{ fontWeight: "Bold", color: "#000000" }}
        />
        <input
          type="text "
          className="inp "
          style={{ fontWeight: "Bold", color: "#000000" }}
        />
        <input
          type="text "
          className="inp "
          style={{ fontWeight: "Bold", color: "#000000" }}
        />
        <input
          type="text "
          className="inp "
          style={{ fontWeight: "Bold", color: "#000000" }}
        />
        <input
          type="text "
          className="inp "
          style={{ fontWeight: "Bold", color: "#000000" }}
        />
      </Box>
      <Button
        variant="contained"
        color="success"
        sx={{ width: "20% ", boxShadow: "5px 5px 5px #c3c3c3" }}
        onClick={HandleSave}
        disabled={loading}
      >
        Save
      </Button>
    </Box>
  );
};

export default CustomerUpdate;
