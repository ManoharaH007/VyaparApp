// const QRCodePage = () => {
//   const [customerData, setCustomerData] = useState(null);

//   // Fetch data from backend (replace URL with your backend API)
//   useEffect(() => {
//     axios
//       .get("http://your-backend-api/customers")
//       .then((response) => setCustomerData(response.data))
//       .catch((error) => console.error("Error fetching customer data:", error));
//   }, []);

//   if (!customerData) {
//     return <p>Loading...</p>;
//   }

//   // For this example, we assume customerData contains `id` and `name`
//   return (
//     <div className="qr-container">
//       <h1>Foodwise Tiffin Service</h1>
//       <p>Customer: {customerData.name}</p>

//       {/* QR Code that encodes a URL with the customer ID */}
//       <QRCode
//         value={`http://your-website.com/details/${customerData.id}`}
//         size={200}
//       />

//       <p>Scan to get record</p>
//     </div>
//   );
// };
// QRCodePage.js
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, styled } from "@mui/material"; // Ensure you import Typography
import { useLocation } from "react-router-dom";

const TopPattern = styled("div")({
  position: "relative",
  height: "128px",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "#f4a261", // Orange color
    transform: "skewY(-6deg)",
    transformOrigin: "top left",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "#1d3557", // Navy blue color
    transform: "skewY(6deg)",
    transformOrigin: "top right",
  },
});

const Logo = styled("img")({
  maxWidth: "200px",
  height: "auto",
  margin: "20px 0",
});

const DownloadButton = styled("img")({
  height: "40px",
  margin: "0 10px",
});

const QRCodePage = ({ customer, id }) => {
  const currentURL = window.location.href; // Get the full current URL

  // Check if the current URL already contains the '/customer/{id}' part
  const qrCodeURL = currentURL.includes(`/customer/${id}`)
    ? currentURL
    : `${currentURL}/customer/${id}`;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        bgcolor: "white",
        color: "#1d3557", // Navy blue for text
      }}
    >
      <TopPattern />
      <Container maxWidth="sm" sx={{ textAlign: "center" }} id="qr-code">
        <Typography
          variant="h4"
          component="h1"
          sx={{ mt: "12px", fontWeight: "bold", mb: "-18px" }}
        >
          Powered by
        </Typography>
        <Logo src="/placeholder.svg?height=60&width=200" alt="Delimove logo" />

        <Box sx={{ my: 3 }}>
          <DownloadButton
            src="https://i0.wp.com/www.farmersbank-trust.com/wp-content/uploads/2017/03/Google-Play-Badge-1.png?ssl=1"
            alt="Get it on Google Play"
          />
          <DownloadButton
            src="https://help.opportunitynetwork.com/hs-fs/hubfs/apple.png?width=400&name=apple.png"
            alt="Download on the App Store"
          />
        </Box>

        <Typography
          variant="h3"
          component="h2"
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          SCAN TO GET RECORD
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          You can scan here!
        </Typography>

        <QRCodeSVG value={qrCodeURL} size={200} />
        <Typography variant="h6" sx={{ my: 2 }}>
          Customer: {customer?.fullname}
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          sx={{ mt: 4, fontWeight: "bold" }}
        >
          FOODWISE TIFFIN SERVICE
        </Typography>
      </Container>
    </Box>
  );
};

export default QRCodePage;

// <div
//   className="qr-container"
//   style={{ textAlign: "center", padding: "20px" }}
// >
//   <h1>Foodwise Tiffin Service</h1>
//   <p>Customer: {dummyData.name}</p>

//   {/* QR code linking to the details page */}
//   <QRCodeSVG
//     value={` http://192.168.0.113:5173/details/${dummyData.id}`}
//     size={200}
//   />

//   <p>Scan to get record or click below to view details</p>

//   {/* Link for testing without scanning */}
//   <Link to={`/details/${dummyData.id}`}>View Customer Details</Link>
// </div>
