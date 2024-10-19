import {
  UPDATE_GROUP_FAILURE,
  UPDATE_GROUP_REQUEST,
  UPDATE_GROUP_SUCCSESS,
} from "../constant/AllConstant";
import {
  ADD_STAFF_FAILURE,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCSESS,
  ALL_CATEGORY_FAILURE,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCSESS,
  ALL_CUSTOMER_FAILURE,
  ALL_CUSTOMER_REQUEST,
  ALL_CUSTOMER_SUCCSESS,
  ALL_LANGUAGES_FAILURE,
  ALL_LANGUAGES_REQUEST,
  ALL_LANGUAGES_SUCCSESS,
  CLEAR_ERROR,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCSESS,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCSESS,
  SINGLE_LANGUAGES_FAILURE,
  SINGLE_LANGUAGES_REQUEST,
  SINGLE_LANGUAGES_SUCCSESS,
  STAFF_GROUP_FAILURE,
  STAFF_GROUP_REQUEST,
  STAFF_GROUP_SUCCSESS,
} from "../constant/productConstant";
import axios from "axios";

export const CreateProduct = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    // const config = {
    //   headers: { "Content-Type": "application/json" },
    // };

    const { data } = await axios.post(
      "https://vr.w4u.in/manage/api/add_products/add",
      formdata,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCSESS,
      payload: data.message,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const AddStaffAction = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: ADD_STAFF_REQUEST });

    const { data } = await axios.post(
      "https://vr.w4u.in/manage/api/staff/add",
      formdata,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(data);

    dispatch({
      type: ADD_STAFF_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: ADD_STAFF_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const GetAllGroup = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_REQUEST });

    const { data } = await axios.get(
      "https://vr.w4u.in/manage/api/c_groups/all",

      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: FETCH_SUCCSESS,
      payload: data.data.c_groups,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: FETCH_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const UpdateGroup = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_GROUP_REQUEST });

    const { data } = await axios.post(
      "https://vr.w4u.in/manage/api/c_groups/update",
      formdata,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: UPDATE_GROUP_SUCCSESS,
      payload: data.message,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: UPDATE_GROUP_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

//category id
//staff id
export const addStaffGroup = (payload) => async (dispatch) => {
  try {
    dispatch({ type: STAFF_GROUP_REQUEST });

    // Create a FormData object to handle multipart/form-data
    const formData = new FormData();
    formData.append("s_name", payload.s_name);
    formData.append("s_mobile", payload.s_mobile);
    formData.append("user_type", payload.user_type);
    formData.append("vendor_id", payload.vendor_id);
    formData.append("password", payload.password);
    formData.append("monthly_salary", payload.monthly_salary);
    formData.append("start_date", payload.start_date);
    formData.append("manage_account", payload.manage_account);
    formData.append("manage_customer", payload.manage_customer);
    formData.append("manage_lead", payload.manage_lead);
    // Convert the manage_group array into a comma-separated string
    formData.append("manage_group", payload.manage_group);

    // Add other fields as needed
    const { data } = await axios.post(
      "https://vr.w4u.in/manage/api/staff/add",
      formData,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: STAFF_GROUP_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: STAFF_GROUP_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const ALLCategoryAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORY_REQUEST });

    const { data } = await axios.get(
      "https://vr.w4u.in/manage/api/business_category/all",

      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: ALL_CATEGORY_SUCCSESS,
      payload: data.data.business_category,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const allCustomersAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CUSTOMER_REQUEST });

    const { data } = await axios.get("https://vr.w4u.in/manage/api/users/all", {
      headers: {
        "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({
      type: ALL_CUSTOMER_SUCCSESS,
      payload: data.data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_CUSTOMER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getAllLanguages = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_LANGUAGES_REQUEST });
    const { data } = await axios.get(
      "https://vr.w4u.in/manage/api/languages/all?X-Api-Key=8YUI3673DEB6F281A8F2E856902HJKU7",

      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // console.log(data);

    dispatch({
      type: ALL_LANGUAGES_SUCCSESS,
      payload: data.data.languages,
    });
  } catch (error) {
    dispatch({
      type: ALL_LANGUAGES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const getSingleanguages = () => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_LANGUAGES_REQUEST });
    const { data } = await axios.get(
      "https://vr.w4u.in/manage/api/lang_translate/all?X-Api-Key=8YUI3673DEB6F281A8F2E856902HJKU7&lang_id=2&lang_id=1&start=0&limit=1000000",

      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const langData = data.data.lang_translate;

    // Create an object to store translations by param
    const translatedText = {};
    langData.forEach((item) => {
      translatedText[item.param] = item.text;
    });

    dispatch({
      type: SINGLE_LANGUAGES_SUCCSESS,
      payload: translatedText,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_LANGUAGES_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// actions/productActions.js
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
