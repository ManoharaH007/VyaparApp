import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Switch,
  Box,
  Paper,
} from "@mui/material";

const BusinessForm = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="sm">
      {/* Header Section */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <Typography variant="h6">{"{Customer Name}"}</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Button variant="outlined" size="small">
              Edit
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1">Advance / Due</Typography>
            <Typography variant="h5" color="green">
              Rs +5000
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button variant="outlined" size="small">
              Set Date
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs Section */}
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Daily Entry" />
        <Tab label="Bills" />
        <Tab label="Ledger" />
      </Tabs>

      {/* Content Section */}
      {selectedTab === 0 && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">05 July 2024</Typography>
              <Typography variant="body2">Friday, 05:32 PM</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="App (Operator Name)" size="small" />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" fullWidth>
                Upload Photo
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Balance Product" size="small" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Enter Amount" size="small" />
            </Grid>

            {/* Product List */}
            <Grid item xs={12}>
              {[
                "Basic Lunch Tiffin",
                "Basic Dinner Tiffin",
                "Super Lunch Tiffin",
                "Premium Lunch Tiffin",
              ].map((product, index) => (
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  key={index}
                  sx={{ mb: 1 }}
                >
                  <Grid item xs={6}>
                    <Typography>{product}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField size="small" type="number" fullWidth value={5} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField size="small" type="number" fullWidth value={3} />
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* History Section */}
      <Box mt={2}>
        {["04 July 2024", "03 July 2024", "02 July 2024", "01 July 2024"].map(
          (date, index) => (
            <Paper key={index} sx={{ p: 2, mb: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>{date}</Typography>
                  <Typography variant="body2">Friday, 05:32 PM</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="center">4</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="center">2</Typography>
                </Grid>
              </Grid>
            </Paper>
          )
        )}
      </Box>
    </Container>
  );
};

export default BusinessForm;
