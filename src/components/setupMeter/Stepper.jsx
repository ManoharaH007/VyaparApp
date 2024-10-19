import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { AttachMoney, CalendarToday, MoreHoriz } from "@mui/icons-material";
import GridViewIcon from "@mui/icons-material/GridView";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import DoneIcon from "@mui/icons-material/Done";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../../pages/AddPRoductForm";
import AddCustomerForm from "../../pages/AddCustomer";
// Inline styles (updated)
const styles = {
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "-15px",
    backgroundColor: "#00BFA6",
    borderRadius: "2px",
    border: "1px solid #999",
    boxShadow: "5px 5px 5px #c3c3c3",
    width: "100%",
    height: "380px",
    margin: "2px auto",

    "@media (max-width: 600px)": {
      width: "110%",
    },
  },
  progressContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "0px",
    alignItems: "center",
    marginBottom: "25px",
  },
  progressCircle: {
    overflow: "hidden",
    width: "80%", //
    height: "100%",
  },
  progressLabel: {
    fontSize: "17px",
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    top: "40%",
    left: "40%",
    transform: "translate(-00%, -00%)",
    fill: "#ffffff",
  },
  edgeAttachCard: {
    position: "relative",
    // width: "343px",
    // 239px;
    // min-height: 90%;
    // minHeight: "90%",
    borderRadius: "20px",
    height: "343px",
    marginTop: "0px",
    padding: "20px 80px",
    backgroundColor: "white",
    "@media (max-width: 600px)": {
      width: "0px",
      // minHeight: "100%",
      // Full width on mobile
      // padding: "20px 20px", // Reduced padding
    },
  },
  verticalStepper: {
    position: "absolute",
    left: "30px",
    top: "32px",
    gap: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  step: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    backgroundColor: "#00BFA6",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    textAlign: "center",
    color: "white",
  },
  stepCompleted: {
    backgroundColor: "#00BFA6",
  },
  stepIndicator: {
    fontSize: "10px",
    fontWeight: "bold",
    color: "black",
  },

  button: {
    fontSize: "10px",
    fontWeight: "bold",
    padding: "2px 4px",
    backgroundColor: " #00BFA6",
    border: "1px solid #999",
    boxShadow: "5px 5px 5px #c3c3c3",
    width: "125px",
    height: "28px",
  },
  heading5: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "black",
    margin: "17px 0",
  },
  heading3: {
    fontSize: "10px",
    fontWeight: "normal",
    color: "black",
    marginBottom: "10px",
  },
  dashboardLinks: {
    marginTop: "1px",
    padding: "20px",
    backgroundColor: "whitesmoke",
    // border: "1px solid #999",
    // boxShadow: "5px 5px 5px #c3c3c3",
    display: "flex",
    // flexWrap: 'wrap',
    gap: "30px",
    width: "90%",
    justifyContent: "center",

    "@media (max-width: 600px)": {
      marginTop: "10vh",
    },
  },
  dashboardLink: {
    display: "flex",
    flexDirection: "column", // Align items horizontally
    alignItems: "center", // Vertically align items
    textAlign: "center",
  },
  dashboardLinkText: {
    marginLeft: "10px", // Add space between icon and text
    textDecoration: "none",
    color: "black",
    fontSize: "10px",
  },
  dashboardLinkIcon: {
    color: "black",
    fontSize: "30px",

    cursor: "pointer",
  },
  smallSquare: {
    width: "12px",
    height: "10px",
    backgroundColor: "black",
    marginRight: "10px",
    marginLeft: "5px",
  },
  labelsContainer: {
    textAlign: "center",
    marginBottom: "10px",
  },
  label1: {
    marginTop: "-120px",
    fontWeight: "bold",
    fontSize: "20px",
    color: "white",
    marginBottom: "10px",
  },
  label2: {
    fontSize: "20px",
    color: "white",
  },
  connector: {
    position: "absolute",
    width: "3px",
    backgroundColor: "#00BFA6",
    gap: "1px",
    zIndex: 0,
    height: "100%",
  },

  viewText: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#00BFA6",
    marginLeft: "24px",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

const Stepper = () => {
  // Initialize progress to 50%
  const [progress, setProgress] = useState(60);
  const [OpenPrdouct, setOpenProduct] = useState("");
  const [hideStepper, sethideStepper] = useState(true);
  const [lastStep, setLastStep] = useState("");

  const Navigate = useNavigate();
  const steps = [
    { number: 1, label: "Step 1", completed: progress >= 60 },
    { number: 2, label: "Step 2", completed: progress >= 75 },
    { number: 3, label: "Step 3", completed: progress >= 100 },
  ];

  useEffect(() => {
    const stepsComplete = JSON.parse(localStorage.getItem("steps"));
    setLastStep(stepsComplete);

    if (stepsComplete === 50) {
      setProgress(100);
    } else {
      setProgress(60);
    }
  }, []);

  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 50) * circumference;

  // Helper function to handle button clicks
  const handleButtonClick = (increment, btnTYpe) => {
    setOpenProduct(btnTYpe);
    sethideStepper(false);
    if (increment === 25) {
      setProgress(75); // Set progress to 75%
    } else if (increment === 50 || lastStep === 50) {
      setProgress(100); // Set progress to 100%
    }
    // setOpenProduct("");
  };

  const CloseHide = () => {
    console.log("CloseHide function called"); // For debugging
    sethideStepper(true); // Assuming you want to hide the stepper
    setOpenProduct(""); // Optionally reset OpenProduct
  };

  const HandleClick = () => {
    Navigate("/home");
  };
  return (
    <div>
      {OpenPrdouct === "addCustomer" && (
        <AddCustomerForm CloseHides={CloseHide} />
      )}
      {OpenPrdouct === "addProduct" && (
        <AddProductForm CloseHides={CloseHide} />
      )}

      {hideStepper && (
        <Container style={styles.mainDiv}>
          <Box style={styles.progressContainer}>
            <svg style={styles.progressCircle} viewBox="0 0 100 100">
              <CircularProgressbar
                value={progress}
                circleRatio={0.5}
                styles={buildStyles({
                  rotation: 0.75,
                  strokeLinecap: "butt",
                  trailColor: "#d6d6d6",
                  pathColor: "#424f96",
                  textColor: "#ffffff",
                })}
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dy=".3em"
                style={styles.progressLabel}
              >
                {progress}%
              </text>
            </svg>
          </Box>

          {/* New labels section */}
          <Box style={styles.labelsContainer}>
            <Typography variant="h5" style={styles.label1}>
              Store setup is completed
            </Typography>
            <Typography
              variant="h6"
              style={styles.label2}
              sx={{ marginTop: "45px" }}
            >
              Finish following steps to unlock features
            </Typography>
          </Box>

          <Box
            style={styles.edgeAttachCard}
            sx={{ width: { xs: "200px", sm: "353px", md: "353px" } }}
          >
            <Box style={styles.verticalStepper}>
              {/* Connector lines */}
              {progress >= 60 && (
                <div
                  style={{
                    ...styles.connector,
                    height: "250px",
                    top: "25px",
                    left: "13px",
                  }}
                ></div> // Step 1 to Step 2
              )}
              {progress >= 75 && (
                <div
                  style={{
                    ...styles.connector,
                    height: "80px",
                    top: "67px",
                    left: "13px",
                  }}
                ></div> // Step 2 to Step 3
              )}
              {progress >= 100 && (
                <div
                  style={{
                    ...styles.connector,
                    height: "150px",
                    top: "100px",
                    left: "13px",
                  }}
                ></div> // From bottom of Step 3
              )}

              {steps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.step,
                    ...(step.completed ? styles.stepCompleted : {}),
                  }}
                >
                  <span style={styles.stepIndicator} id="juct_clr">
                    {step.completed ? (
                      <DoneIcon sx={{ color: "white" }} />
                    ) : (
                      <span style={{ color: "white" }}>{step.number}</span>
                    )}
                  </span>
                </div>
              ))}
            </Box>
            <Typography
              variant="h5"
              style={{
                ...styles.heading5,
              }}
              id="flex_class"
            >
              <p style={{ marginTop: "auto" }}>
                Create online business
                <br />
                <span style={{ fontSize: "13px", fontWeight: 200 }}>
                  Congratulations! Your business is now live
                </span>
              </p>
            </Typography>

            <br />
            <Typography variant="h5" style={styles.heading5} id="flex_class">
              <p style={{ marginTop: "-20px" }}>
                Add first product
                <br />
                <span style={{ fontSize: "13px", fontWeight: 200 }}>
                  Create your first product by adding the product name and image
                </span>
                {progress >= 75 ? (
                  <span style={styles.viewText}>View Products</span>
                ) : (
                  ""
                )}
              </p>
              {progress >= 75 ? (
                ""
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={styles.button}
                  onClick={() => handleButtonClick(25, "addProduct")}
                >
                  Add product
                </Button>
              )}
            </Typography>

            <br />

            <Typography variant="h5" style={styles.heading5} id="flex_class">
              <p style={{ marginTop: "-20px" }}>
                Add first customer
                <br />
                <span style={{ fontSize: "13px", fontWeight: 200 }}>
                  Create your first customer by adding from contact list.
                </span>
                {progress === 100 ? (
                  <span style={styles.viewText}>View Customers</span>
                ) : (
                  ""
                )}
              </p>

              {progress === 100 ? (
                ""
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={styles.button}
                  onClick={() => handleButtonClick(50, "addCustomer")}
                >
                  Add customer
                </Button>
              )}
            </Typography>
          </Box>

          <br />

          <Box style={styles.dashboardLinks}>
            <Box style={styles.dashboardLink} onClick={HandleClick}>
              <GridViewIcon style={styles.dashboardLinkIcon} />
              <Typography variant="body2" style={styles.dashboardLinkText}>
                DashBoard
              </Typography>
            </Box>
            <Box style={styles.dashboardLink}>
              <PersonSearchIcon style={styles.dashboardLinkIcon} />
              <Typography variant="body2" style={styles.dashboardLinkText}>
                Leads
              </Typography>
            </Box>
            <Box style={styles.dashboardLink}>
              <MenuBookIcon style={styles.dashboardLinkIcon} />
              <Typography variant="body2" style={styles.dashboardLinkText}>
                Cashbook
              </Typography>
            </Box>
            <Box style={styles.dashboardLink}>
              <StickyNote2Icon style={styles.dashboardLinkIcon} />
              <Typography variant="body2" style={styles.dashboardLinkText}>
                Plan
              </Typography>
            </Box>
            <Box style={styles.dashboardLink}>
              <MoreHorizIcon style={styles.dashboardLinkIcon} />
              <Typography variant="body2" style={styles.dashboardLinkText}>
                More
              </Typography>
            </Box>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default Stepper;
