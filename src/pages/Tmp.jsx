import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  GetSingleCustomer,
  UpdateCustomerAction,
} from "../redux/action_api/AllAction";
import { GET_SINGLE_CUSTOMER_UPDATE_RESET } from "../redux/constant/AllConstant";
import Swal from "sweetalert2";

export default function Tmp({ lang }) {
  const { customer } = useSelector((state) => state.SingleCustomer);
  const { updSucsess, loading, error } = useSelector(
    (state) => state.updCustomer
  );

  const dispatch = useDispatch();
  const { id } = useParams();
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [group, setGroup] = useState(
    customer ? customer?.group_id?.group_name : ""
  );
  const [deliveryDays, setDeliveryDays] = useState("");
  const [Deposit, setDeposit] = useState("");
  const [Due, setDue] = useState("");
  const [Address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [referName, setReferName] = useState("");
  const [referNumber, setReferNumber] = useState("");
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
  }, [dispatch, id, error, updSucsess]);

  useEffect(() => {
    if (customer) {
      setCustomerName(customer.fullname || "");
      setPhoneNumber(customer.user_name || "");
      // setGroup(cust)
    }
  }, [customer]);
  // const [products, setProducts] = useState([
  //   { name: "Product Name 1", price: 70, delivered: "", emptyBalance: "" },
  //   { name: "Product Name 2", price: 80, delivered: "", emptyBalance: "" },
  // ]);

  const handleDeliveryDayToggle = (day) => {
    setDeliveryDays(day);
  };

  if (!lang) {
    return "...loading language";
  }

  const HandleSubmit = () => {
    const formData = new FormData();

    formData.set("user_id", id);
    formData.set("fullname", customerName);
    formData.set("mobile", phoneNumber);
    formData.set("user_name", phoneNumber);
    formData.set("address1", Address);
    formData.set("email", email);
    formData.set("referName", referName);
    formData.set("referNumber", referNumber);
    formData.set("DeliveryDays", deliveryDays);
    formData.set("security_deposit", Deposit);
    formData.set("	current_due_payment", Due);

    dispatch(UpdateCustomerAction(id, formData));
  };

  return (
    <div className="customer-form">
      <header>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJm1VcPK75fg8bFTEJ1c4-7rI84xdHK-OhAw&s"
          alt=""
          className="back-button"
        />

        <h1>{customerName || "(Customer Name)"}</h1>
        <button className="save-button" onClick={HandleSubmit}>
          {" "}
          {lang.sav || "Save"}
        </button>
      </header>
      {lang?.customer_add || "Customer added by (App operator name)"}
      <p className="subtitle"></p>

      <input
        className="inp"
        type="text"
        placeholder={lang.Customer_Name || "Customer Name"}
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <input
        type="tel"
        className="inp "
        placeholder={lang.Ph_no || "Phone  No."}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div className="group-select">
        <input
          style={{ fontSize: "18px", fontWeight: 400 }}
          type="text"
          className="inp "
          placeholder={lang.g_grup || "General Group"}
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          disabled
        />
        <span className="dropdown-icon">▼</span>
      </div>

      <div className="balance-section">
        <div className="balance green">
          <input
            type="number"
            placeholder="₹00.00"
            style={{ width: "12vh", color: "green" }}
            className="inp "
            value={Deposit}
            onChange={(e) => {
              setDeposit(e.target.value);
            }}
          />
          <span> {lang.enter_d_sec || "Enter deposit/Security"}</span>
        </div>
        <div className="balance red">
          <input
            type="number"
            placeholder="₹00.00"
            style={{ width: "12vh" }}
            className="inp "
            value={Due}
            onChange={(e) => {
              setDue(e.target.value);
            }}
          />
          <span> {lang.e_c_p_due || "Enter current payment due"}</span>
        </div>
      </div>

      <div className="delivery-days">
        <h2>{lang.d_days || "Delivery Days"}</h2>
        <div className="day-buttons">
          {[
            lang.d_ly || "Daily",
            lang.a_nate || "Alternate",
            lang.w_days || "Weekdays",
          ].map((day) => (
            <button
              key={day}
              className={deliveryDays.includes(day) ? "active" : ""}
              onClick={() => handleDeliveryDayToggle(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="product-details">
        <div className="product-details-header">
          <div className="product-details-content">
            <h2>{lang.pdt_dts || "Product Details"}</h2>
            <p>
              {lang.p_sub ||
                "   Select which products do you want to deliver to this customer."}

              <span id="icon">
                <ArrowForwardIosIcon
                  sx={{ fontSize: 40, marginRight: "0px", marginTop: "5px" }}
                />
              </span>
            </p>
          </div>
        </div>
      </div>

      <Box sx={{ maxWidth: "100%", margin: "auto" }} id="box">
        <Grid item xs={12}>
          <Table
            sx={{
              maxWidth: "100%", // Adjust this value to control the table width
              margin: "0 auto", // Center the table horizontally
              backgroundColor: "#664F4F",
              borderCollapse: "collapse",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "white",
                    border: "1px solid white",
                  }}
                >
                  <p style={{ width: "auto" }}>
                    {lang.pdt_name || "Product Name"}
                  </p>
                </TableCell>
                <TableCell
                  sx={{ color: "white", border: "1px solid white", padding: 1 }}
                >
                  {lang.p_ce || "Price"}
                </TableCell>
                <TableCell
                  sx={{ color: "white", border: "1px solid white", padding: 1 }}
                >
                  {lang.dd || " Delivered"}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    width: "80px", // Reduced width of TableCell
                    padding: 1, // Remove padding inside TableCell
                  }}
                >
                  {lang.eb || "Empty Balance"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    color: "white",
                    border: "1px solid white",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox defaultChecked sx={{ color: "green" }} />
                    }
                    label={
                      <span
                        style={{
                          color: "white",

                          // paddingLeft: "5px",
                          // paddingRight: "5px",
                          // padding: "5px 0px 0px 5px",
                        }}
                      >
                        Product
                      </span>
                    }
                  />
                </TableCell>
                <TableCell sx={{ color: "white", border: "1px solid white" }}>
                  <p
                    style={{
                      color: "white",
                      // paddingLeft: "5px",
                      // paddingRight: "5px",
                    }}
                  >
                    70
                  </p>
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    width: "40px", // Further reduced width of TableCell for responsiveness
                    padding: 0, // Remove padding inside TableCell
                  }}
                >
                  <input
                    style={{
                      backgroundColor: "#D9D9D9",
                      width: "85%", // Ensure input takes full width of the TableCell
                      padding: "2px", // Remove padding from the input
                      margin: "3px", // Remove margin from the input
                      border: "none", // No border for a cleaner look
                      outline: "none", // Remove focus outline
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    width: "50px", // Further reduced width of TableCell for responsiveness
                    padding: 0, // Remove padding inside TableCell
                  }}
                >
                  <input
                    type="number"
                    style={{
                      backgroundColor: "#D9D9D9",
                      width: "85%", // Ensure input takes full width of the TableCell
                      padding: "2px", // Remove padding from the input

                      marginLeft: "5px",

                      border: "none", // No border for a cleaner look
                      outline: "none", // Remove focus outline
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "white", border: "1px solid white" }}>
                  Product Name 2
                </TableCell>
                <TableCell sx={{ color: "white", border: "1px solid white" }}>
                  85
                </TableCell>
                <TableCell sx={{ color: "white", border: "1px solid white" }}>
                  3
                </TableCell>
                <TableCell sx={{ color: "white", border: "1px solid white" }}>
                  1
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Box>

      <div className="product-details">
        <div className="product-details-header">
          <div
            className="product-details-content"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              height: "8vh",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
              {lang.o_dtls || "Other Details"}
            </h2>
            <ArrowForwardIosIcon
              sx={{ fontSize: 40, marginRight: "0px", marginBottom: "10px" }}
            />
          </div>
        </div>
      </div>
      <div>
        <input
          type="text "
          className="inp "
          placeholder={lang.ad_ss || " Address"}
          style={{ fontWeight: "Bold", color: "#000000" }}
          value={Address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <input
          type="text "
          className="inp "
          placeholder={lang.e_Id || "email"}
          style={{ fontWeight: "Bold", color: "#000000" }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text "
          className="inp "
          value={referName}
          onChange={(e) => {
            setReferName(e.target.value);
          }}
          placeholder={lang.rf_name || "Refer Name"}
          style={{ fontWeight: "Bold", color: "#000000" }}
        />
        <input
          type="text "
          className="inp "
          placeholder={lang.rmn || "Refer mobile no"}
          value={referNumber}
          onChange={(E) => {
            setReferNumber(E.target.value);
          }}
          style={{ fontWeight: "Bold", color: "#000000" }}
        />
      </div>
    </div>
  );
}
