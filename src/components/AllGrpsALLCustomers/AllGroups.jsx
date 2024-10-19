import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteIcon from "@mui/icons-material/Note"; // Import Notepad (Note) icon
import GroupIcon from "@mui/icons-material/Group"; // Import Group icon
import { useSelector, useDispatch } from "react-redux";
import { GetAllGroup } from "../../redux/action_api/productAction";
import { DeleteGroup } from "../../redux/action_api/Api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const AllGroups = ({ lang }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { Allgroup } = useSelector((state) => state.allGroup);
  const { isDeleted, loading, error } = useSelector((state) => state.Addgroup);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isDeleted) {
      Swal.fire({
        title: "group Deleted successfully!",
        text: `${isDeleted.message}`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (error) {
      Swal.fire({
        title: "Somethin gwent wrong!",
        text: `${error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
    }
    dispatch(GetAllGroup());
  }, [dispatch, isDeleted, error]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    const formData = new FormData();
    formData.set("id", id);
    dispatch(DeleteGroup(formData));
  };

  const handleCreateGroup = () => {
    Navigate("/create/group");
  };

  if (!lang) {
    return "..loading";
  }
  return (
    <Container
      maxWidth="xs" // Reduce the width of the container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Full viewport height
        padding: "20px",
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: "25px", mb: "20px" }}>
        {" "}
        {lang.al_grp || "All Groups"}
      </Typography>
      {/* Search Bar */}
      <TextField
        variant="outlined"
        placeholder={lang.src_grp || "Search Group"}
        onChange={handleSearchChange}
        value={searchTerm}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black", // Set border color to black
            },
            "&:hover fieldset": {
              borderColor: "black", // Set border color to black on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "black", // Set border color to black when focused
            },
          },
          borderRadius: "4px", // Set border radius to 4px
          width: "100%", // Reduce the width of the search bar
          marginBottom: "30px", // Add some spacing below the search bar
          border: "0px solid #999",
          boxShadow: "5px 5px 5px #c3c3c3",
        }}
      />

      {/* List of Groups */}
      <List sx={{ width: "100%" }}>
        {Allgroup?.filter(
          (group) =>
            group?.group_name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter groups based on searchTerm
        ).map((group) => (
          <ListItem
            key={group.id}
            style={{
              fontWeight: "bolder",
              marginTop: "3px",
              backgroundColor: "white",
              boxShadow: "2px 4px 4px 4px rgba(0.1, 0, 0, 0.1)",
              borderRadius: "4px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "600px",
              height: "50px",
              border: "1px solid #999",
              boxShadow: "5px 5px 5px #c3c3c3",
            }}
          >
            {/* Group Icon */}
            <GroupIcon
              sx={{
                marginRight: "8px",
                backgroundColor: "#00BFA6",
                color: "white",
                padding: "2px",
                borderRadius: "50%",
                border: "1px solid #999",
                boxShadow: "5px 5px 5px #c3c3c3",
              }}
            />

            {/* Group Content */}
            <Box sx={{ flexGrow: 1 }}>
              <ListItemText
                primary={group.group_name}
                // secondary={group.date_time}
              />
            </Box>

            {/* Label on the Right */}
            <Box
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                backgroundColor: "rosybrown",
                color: "black",
                padding: {
                  sx: "2 , 0px",
                  md: "2px 20px",
                },
                borderRadius: "14px",
                marginRight: {
                  md: "16px",
                },
                border: "1px solid #999",
                boxShadow: "5px 5px 5px #c3c3c3",
              }}
            >
              <Typography variant="body2" sx={{ cursor: "pointer" }}>
                Make All Entries
              </Typography>
            </Box>

            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(group.id)}
              sx={{ color: "brown", marginLeft: "16px" }} // Red delete icon
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      {/* Create Group Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<NoteIcon />} // Add the Notepad icon to the left of the button text
        onClick={handleCreateGroup}
        style={{
          fontWeight: "bold",
          marginTop: "50px",
          padding: "2px 4px",
          backgroundColor: "#00BFA6",
          border: "5px solid #00BFA6",
          borderRadius: "24px",

          boxShadow: "5px 5px 5px #c3c3c3",
        }}
      >
        {lang.crt_grp || "Create Group"}
      </Button>
    </Container>
  );
};

export default AllGroups;
