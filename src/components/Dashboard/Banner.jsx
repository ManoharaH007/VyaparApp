import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { QrReader } from "react-qr-reader";
export default function Banner() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [BuisnessName, setBuisname] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const menuItems = [
    { name: "Customer", route: "/customer/1", style: { marginBottom: "10px" } }, // Add the corresponding route
    { name: "Group", route: "/groups" },
    { name: "AllCustomers", route: "/list/customers" },
    { name: "Employs", route: "/employs" },
    { name: "Expenses", route: "/expenses" },
    { name: "Products", route: "/products" },
    { name: "Events", route: "/events" },
    { name: "Sale", route: "/sale" },
    { name: "Purchase", route: "/purchase" },
    { name: "Backup", route: "/backup" },
  ];

  const bottomNavItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "Lead", icon: "🎯" },
    { name: "Cashbook", icon: "📒" },
    { name: "Plan", icon: "📅" },
    { name: "More", icon: "⋯" },
  ];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      marginLeft: isMobile ? "auto" : "500px",
      marginRight: isMobile ? "-50px" : "400px",
      minWidth: isMobile ? "100vw" : "400px",
      maxWidth: isMobile ? "100vw" : "400px",
      margin: "0px auto",
      backgroundColor: "#1de9b6",
      fontFamily: "Arial, sans-serif",
    },

    header: {
      display: "flex",
      alignItems: "center",
      padding: "10px 30px",
      backgroundColor: "#1de9b6",
      color: "white",
    },
    homeIcon: {
      marginRight: "25px", // Adds space between the home icon and the business name
      width: "45px",
      height: "40px",
      cursor: "pointer",
    },
    businessName: {
      fontSize: "20px",
      fontWeight: "bold",

      marginRight: "3px", // Pushes the other icons to the right
    },
    bellIcon: {
      marginRight: "90px",
      width: "25px",
      height: "20px",
      cursor: "pointer",
    },
    switchIcon: {
      marginRight: "10px",
      width: "15px",
      height: "15px",
      cursor: "pointer",
    },
    onOffText: {
      fontSize: "10px",
      fontWeight: "bold",
    },

    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      maxWidth: isMobile ? "150vw" : "400px",
    },
    banner: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "20px",
      height: "100px",
      marginBottom: "20px",
   
    },
    bannerText: {
      margin: 84,
      textAlign: "center",
    },
    menuGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "6px",
    },
    menuItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: "10px",
      padding: isMobile ? "10px 15px 25px" : "10px 15px 18px",
      cursor: "pointer",
      marginBottom: "20px",
    
    },
    menuTitle: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginTop: "20px",
    },
    bottomDiv: {
      backgroundColor: "brown",
      height: "13vh",
      width: "100%",
   
    },
    bottomNav: {
      display: "flex",
      justifyContent: "space-around",
      backgroundColor: "white",
      padding: "10px 10px",
      marginTop: isMobile ? "35px" : "18px",
      marginLeft: "2px",
      width: "94%",
      height: "50px",
      borderRadius: "20px",
    },
    navItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
    },
    navIcon: {
      fontSize: "20px",
      marginBottom: "2px",
    },
    navText: {
      fontSize: "12px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "12px 20px",
    },
    button: {
      backgroundColor: "white",
      color: "black",
      border: "none",
      width: isMobile ? "40%" : "%",
      padding: "12px 2px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
      textAlign: "left",
      fontSize: isMobile ? "9px" : "10px",
    },
    scannerButton: {
      backgroundColor: "white",
      color: "black",
      border: "none",
      width: "12%",
      padding: "4px 10px",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    buttonIcon: {
      fontSize: "10px",
      marginBottom: "5px",
    },
    scannerText: {
      fontSize: "10px",
    },
  };

  useEffect(() => {
    const Buisname = localStorage.getItem("businessForm");
    setBuisname(Buisname);
  }, []);
  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setScanning(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };
  const handleScannerClick = () => {
    setScanning(true);
  };

  const handleMenuItemClick = (route) => {
    navigate(route);
  };

  return (
    <div style={styles.container}>
      {scanning && (
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </div>
      )}
      {scanResult && <p>Scanned Result: {scanResult}</p>}
      <div style={styles.header}>
        {/* Home Icon on the left side */}
        <img src="./images/home.png" alt="Home Icon" style={styles.homeIcon} />

        {/* Business Name in the center */}
        <div style={styles.businessName}>
          <p>{BuisnessName}</p>
        </div>

        {/* Bell and Switch Icons on the right side */}
        <img src="./images/bell.gif" alt="Bell Icon" style={styles.bellIcon} />
        <span style={styles.onOffText}>ON</span>
        <img
          src="./images/switch.png"
          alt="Switch Icon"
          style={styles.switchIcon}
        />
        <span style={styles.onOffText}>OFF</span>
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.button}>Make All entries at once</button>
        <button style={styles.scannerButton} onClick={handleScannerClick}>
          <img
            src="./images/scanner.jpeg"
            alt="Scanner Icon"
            style={{ width: "30px", height: "25px" }}
          />
          <span style={styles.scannerText}>Scanner</span>
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.banner}>
          <h2 style={styles.bannerText}>Banners</h2>
        </div>

        <div style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={styles.menuItem}
              onClick={() => handleMenuItemClick(item.route)} // Handle click
            >
              <span style={styles.menuIcon}>{item.icon}</span>
              <span style={styles.menuTitle}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.bottomDiv}>
        <div style={styles.bottomNav}>
          {bottomNavItems.map((item, index) => (
            <div key={index} style={styles.navItem}>
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navText}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
