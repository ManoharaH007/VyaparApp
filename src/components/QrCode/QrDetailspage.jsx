// export const CustomerDetailsPage = () => {
//   const { customerId } = useParams();
//   const [customerDetails, setCustomerDetails] = useState(null);

//   useEffect(() => {
//     // Fetch details of a specific customer
//     axios
//       .get(`http://your-backend-api/customers/${customerId}`)
//       .then((response) => setCustomerDetails(response.data))
//       .catch((error) =>
//         console.error("Error fetching customer details:", error)
//       );
//   }, [customerId]);

//   if (!customerDetails) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="details-container">
//       <h2>Customer Details</h2>
//       <p>Name: {customerDetails.name}</p>
//       <p>Service: {customerDetails.service}</p>
//       <p>Address: {customerDetails.address}</p>
//       {/* Add more customer details here */}
//     </div>
//   );
// };
// CustomerDetailsPage.js
import React from "react";
import { useParams } from "react-router-dom";

const QrDetailsPage = () => {
  const { customerId } = useParams();

  // Dummy customer details
  const customerDetails = {
    id: "12345",
    name: "John Doe",
    service: "Foodwise Tiffin Service",
    address: "123 Main St, Cityville",
  };

  return (
    <div className="details-container" style={{ padding: "20px" }}>
      <h2>Customer Details</h2>
      <p>ID: {customerDetails.id}</p>
      <p>Name: {customerDetails.name}</p>
      <p>Service: {customerDetails.service}</p>
      <p>Address: {customerDetails.address}</p>
    </div>
  );
};

export default QrDetailsPage;
