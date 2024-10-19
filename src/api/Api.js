import axios from "axios";
import { ApiKey, baseUrlApi } from "../config";

export const getLogin = async (payload) => {
  console.log(payload.name, "payload");

  const formData = new FormData();
  formData.set("name", payload.name);
  formData.set("mobile", payload.mobile);
  // formData.set("X-Api-Key", ApiKey);
  // Log FormData entries
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const response = await axios.post(`${baseUrlApi}login_otp/add/`, formData, {
      headers: {
        "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(formData);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const VerifyOtp = async (otp, Mobile, name) => {
  const formData = new FormData();
  formData.set("otp", otp);
  formData.set("mobile", Mobile);
  formData.set("name", name);
  formData.set("X-Api-Key", ApiKey);

  try {
    const response = await axios.post(
      `${baseUrlApi}login_otp/update/`,
      formData,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const ForgotPswrd = async (Mobile) => {
  const formData = new FormData();
  formData.set("mobile", Mobile);
  formData.set("X-Api-Key", ApiKey);

  try {
    const response = await axios.post(
      `${baseUrlApi}forgot_password/add/`,
      formData,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const RegisterMob = async (Mobile) => {
  const formData = new FormData();
  formData.set("mobile", Mobile);
  formData.set("X-Api-Key", ApiKey);

  try {
    const response = await axios.post(
      `${baseUrlApi}register_otp/add/`,
      formData,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error;
    console.log("ReactUserLogin---------", error);
  }
};

export const VerifyOtpReg = async (otp, Mobile) => {
  console.log("action", otp, Mobile);

  const formData = new FormData();
  formData.set("otp", otp);
  formData.set("mobile", Mobile);
  formData.set("X-Api-Key", ApiKey);
  try {
    const response = await axios.post(
      `${baseUrlApi}register_otp/update/`,
      formData,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);

    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const ForgotOtp = async (otp, Mobile) => {
  const formData = new FormData();
  formData.set("otp", otp);
  formData.set("mobile", Mobile);
  formData.set("X-Api-Key", ApiKey);
  try {
    const response = await axios.post(
      `${baseUrlApi}forgot_password/update/`,
      formData,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const setpswrd = async (password, confirmPassword, name, Mobile) => {
  const formData = new FormData();
  formData.set("fullname", name);
  formData.set("password", password);
  formData.set("confirm_password", confirmPassword);
  formData.set("mobile", Mobile);
  formData.set("user_name", Mobile);
  formData.set("group_id", "null");
  formData.set("vendor_id", "null");
  formData.set("user_type", "customer");
  // formData.set("X-Api-Key", ApiKey);
  try {
    const response = await axios.post(`${baseUrlApi}users/add/`, formData, {
      headers: {
        "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const cateList = async () => {
  try {
    const response = await axios.get(`${baseUrlApi}business_category/all/`, {
      headers: {
        "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const business_details = async (
  businessName,
  businessAddress,

  category,
  address
) => {
  console.log(category);
  const formData = new FormData();
  formData.set("b_name", businessName);
  formData.set("b_address", businessAddress);
  formData.set("city", address.county);
  // formData.set("pincode", pinCode);
  formData.set("state", address.state);
  formData.set("country", address.country);
  formData.set("b_category", category);

  try {
    const response = await axios.post(
      `${baseUrlApi}business_details/add/`,
      formData,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);

    return response?.data;
  } catch (error) {
    return error;
  }
};
