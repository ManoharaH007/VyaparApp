import React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function CustomerForm() {
  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <Grid container spacing={2}>
        {/* Avatar with Upload Icon */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <IconButton>
            <Avatar alt="Customer" sx={{ width: 64, height: 64 }}>
              <CameraAltIcon />
            </Avatar>
          </IconButton>
        </Grid>

        {/* Form Inputs */}
        <Grid item xs={12}>
          <TextField label="Customer Name" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Phone Mobile No." fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Select fullWidth defaultValue="General Group">
            <MenuItem value="General Group">General Group</MenuItem>
            <MenuItem value="VIP Group">VIP Group</MenuItem>
          </Select>
        </Grid>

        {/* Price Section */}
        <Grid item xs={6}>
          <TextField
            label="₹ 00.00"
            helperText="Enter Deposit / Security"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="₹ 00.00"
            helperText="Enter current payment due"
            fullWidth
          />
        </Grid>

        {/* Delivery Days */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined">Daily</Button>
            <Button variant="outlined">Alternate</Button>
            <Button variant="outlined">Weekdays</Button>
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Product Details
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Delivered</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Product Name 1</TableCell>
                <TableCell>70</TableCell>
                <TableCell>2</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product Name 2</TableCell>
                <TableCell>85</TableCell>
                <TableCell>3</TableCell>
                <TableCell>1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
}
