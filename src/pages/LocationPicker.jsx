import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css"; // Import leaflet CSS for proper map styling

const LocationPicker = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");

  // Function to get the address based on lat/lng (reverse geocoding)
  const getAddress = async (lat, lng) => {
    try {
      // Using OpenStreetMap Nominatim for reverse geocoding
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const location = response.data;

      localStorage.setItem("Address", JSON.stringify(location.address));

      setAddress(location.display_name); // Set the address from the API response
    } catch (error) {
      console.error("Error fetching the address:", error);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng); // Set the clicked position
        getAddress(lat, lng); // Fetch the address based on lat/lng
      },
    });

    return position === null ? null : <Marker position={position} />;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Select a Location in India:</h3>
      <div style={{ height: "500px", width: "80%", margin: "0 auto" }}>
        {/* The MapContainer is wrapped inside a div with a fixed height */}
        <MapContainer
          center={[20.5937, 78.9629]} // Coordinates to center the map on India
          zoom={5} // Zoom level to show India
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </div>

      {position && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Selected Location Coordinates:</strong>{" "}
            {`Lat: ${position.lat}, Lng: ${position.lng}`}
          </p>
          <p>
            <strong>Address:</strong> {address || "Fetching address..."}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
