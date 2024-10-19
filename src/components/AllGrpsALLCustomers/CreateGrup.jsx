import React, { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loader from "../Loder/Loder";
import { addGroupAction } from "../../redux/action_api/Api";

const InputShadowTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    boxShadow: "inset 0 4px 6px rgba(1, 0, 0, 0.1)",
    borderRadius: "8px", // Optional: add border-radius for rounded corners
  },
}));

const CreateGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isSucsess } = useSelector((state) => state.Addgroup);

  const [GroupName, SetGroupName] = useState("");

  useEffect(() => {
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
  }, [error, isSucsess]);

  const handleAddNewGroup = () => {
    dispatch(addGroupAction(GroupName));
  };

  return (
    <div>
      <div
        style={{
          maxWidth: 400,
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, fontSize: "32px" }}
        >
          Create New Group
        </Typography>

        {/* icon */}
        <GroupIcon
          style={{
            fontSize: 50,
            marginBottom: 30,
            marginTop: 10,
            background: "#00BFA6",
            boxShadow: "5px 5px 5px #c3c3c3c3",
            borderRadius: "10px",
          }}
        />
        <InputShadowTextField
          label="Enter Group Name"
          variant="outlined"
          fullWidth
          vcalue={GroupName}
          onChange={(e) => {
            SetGroupName(e.target.value);
          }}
          margin="normal"
          sx={{
            border: "1px solid #999",
            boxShadow: "5px 5px 5px #c3c3c3c3",
            borderRadius: "10px",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddNewGroup}
          style={{
            marginTop: 20,
            padding: "7px 81px",
            borderRadius: "25px",
            fontWeight: "bold",
            background: "#00BFA6",
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreateGroup;
