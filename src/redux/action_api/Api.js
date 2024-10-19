import axios from "axios";
import { baseUrlApi } from "../../config";
import {
  ADD_CUSTOMER_FAILURE,
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_SUCCSESS,
  ADD_NEW_GROUP_FAILURE,
  ADD_NEW_GROUP_REQUEST,
  ADD_NEW_GROUP_SUCCSESS,
  DELETE_GROUP_FAILURE,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCSESS,
} from "../constant/AllConstant";

export const addGroupAction = (newGroup) => async (dispatch) => {
  const formData = new FormData();
  formData.append("group_name", newGroup);
  try {
    dispatch({ type: ADD_NEW_GROUP_REQUEST });
    const { data } = await axios.post(`${baseUrlApi}c_groups/add/`, formData, {
      headers: {
        "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: ADD_NEW_GROUP_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_NEW_GROUP_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const addCustomer = (formData) => async (dispatch) => {
  console.log("function call");
  console.log(
    formData,
    "customerName ,contactNumber,selectedGroupId,selectedGroup============="
  );

  try {
    dispatch({ type: ADD_CUSTOMER_REQUEST });
    const { data } = await axios.post(`${baseUrlApi}users/add`, formData, {
      headers: {
        "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
        // "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: ADD_CUSTOMER_SUCCSESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_CUSTOMER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const DeleteGroup = (idData) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_GROUP_REQUEST });

    const { data } = await axios.post(
      "https://vr.w4u.in/manage/api/c_groups/delete",
      idData,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: DELETE_GROUP_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_GROUP_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
