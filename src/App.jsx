import React, { useEffect, useState, Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllLanguages,
  getSingleanguages,
} from "./redux/action_api/productAction";
import Loader from "./components/Loder/Loder";
import SupplierPage from "./ClientSide/cliPages/SupplierPage";
import AllGroups from "./components/AllGrpsALLCustomers/AllGroups";
import AddExpenses from "./components/expenses/AddExpenses";

// Lazy loading components
const Login = lazy(() => import("./components/login/Login"));
const OtpVerification = lazy(() => import("./components/login/Otp-verify"));
const ForgotPassword = lazy(() => import("./components/login/ForgotPassword"));
const Signup = lazy(() => import("./components/login/Signup"));
const SetPassword = lazy(() => import("./components/login/SetPassword"));
const CategoryComp = lazy(() => import("./components/Category/CategoryComp"));

const StaffForm = lazy(() => import("./pages/StafForm"));
// const BusinessForm = lazy(() => import("./pages/CustomerName"));
const AllCustomer = lazy(() => import("./pages/AllCustomers"));
const AddCustomerForm = lazy(() => import("./pages/AddCustomer"));
const Banner = lazy(() => import("./components/Dashboard/Banner"));
const Tmp = lazy(() => import("./pages/Tmp"));
const QRCodePage = lazy(() => import("./components/QrCode/QRCodePage"));
// const QrDetailsPage = lazy(() => import("./components/QrCode/QrDetailspage"));
const Ledger = lazy(() => import("./components/Ledger"));
const Home = lazy(() => import("./ClientSide/cliComponents/ListHome/Home"));
const CustomerDetails = lazy(() => import("./pages/CustomerDetails"));
const Bills = lazy(() => import("./pages/Bills"));
import BusinessForm from "./pages/BuisnesForm";
// const adsPlan = lazy(() => import("./components/Adsplan/adsPlan"));

import AdssPlan from "./components/Adsplan/AdssPlan";
import CreateGroup from "./components/AllGrpsALLCustomers/CreateGrup";
import ALlCustomersList from "./components/AllGrpsALLCustomers/ALlCustomersList";
import Stepper from "./components/setupMeter/Stepper";

import LocationPicker from "./pages/LocationPicker";
import CustomerUpdate from "./components/AllGrpsALLCustomers/UpdateCustomer";

const App = () => {
  const dispatch = useDispatch();
  const { loading, error, slang } = useSelector((state) => state.allLng);

  useEffect(() => {
    dispatch(getAllLanguages());
    dispatch(getSingleanguages());
  }, [dispatch]);

  if (loading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>Error loading languages: {error}</div>;
  }

  return (
    <div>
      <Router>
        {/* Suspense wraps the routes and shows a fallback UI while loading */}
        <Suspense fallback={<div>..loading</div>}>
          <Routes>
            <Route path="/" exact element={<Login lang={slang} />} />
            <Route
              path="/otp-verification"
              exact
              element={<OtpVerification value="signup" lang={slang} />}
            />
            <Route
              path="/otp-Forgot"
              element={<OtpVerification value="forgot" lang={slang} />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Signup lang={slang} />} />
            <Route path="/setPassword" element={<SetPassword lang={slang} />} />
            <Route path="/select-category" element={<CategoryComp />} />
            <Route
              path="/buisness/detail"
              element={<BusinessForm lang={slang} />}
            />

            <Route path="/staf" element={<StaffForm lang={slang} />} />
            <Route
              path="/all/customers"
              element={<AllCustomer lang={slang} />}
            />
            <Route path="/add/customer" element={<AddCustomerForm />} />

            <Route path="/home" element={<Banner />} />
            <Route path="/qrcode" element={<QRCodePage />} />
            {/* <Route path="/details/:customerId" element={<QrDetailsPage />} /> */}
            <Route path="/customer/:id" element={<CustomerDetails />} />
            <Route path="/customer/update/:id" element={<CustomerUpdate />} />
            <Route path="/customer/prd/:id" element={<Tmp lang={slang} />} />

            <Route path="/ledger" element={<Ledger lang={slang} />} />
            <Route path="/Bills" element={<Bills lang={slang} />} />
            <Route path="/plan" element={<AdssPlan />} />
            <Route path="/steps" element={<Stepper />} />

            {/* all Groups and customers */}
            <Route path="/groups" element={<AllGroups lang={slang} />} />
            <Route
              path="/create/group"
              element={<CreateGroup lang={slang} />}
            />
            <Route
              path="/list/customers"
              element={<ALlCustomersList lang={slang} />}
            />

            {/* ALl Expenses */}
            <Route
              path="/add/expenses"
              element={<AddExpenses lang={slang} />}
            />
            <Route path="/location" element={<LocationPicker />} />

            {/* sample fro test  */}

            {/* Client Side Routes */}
            <Route path="/my/home" element={<Home />} />
            <Route path="/suplier" element={<SupplierPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
