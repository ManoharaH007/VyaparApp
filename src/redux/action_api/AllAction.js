import axios from "axios";

import {
  GET_SINGLE_CUSTOMER_SUCCSESS,
  GET_SINGLE_CUSTOMER_FAILURE,
  GET_SINGLE_CUSTOMER_REQUEST,
  GET_SINGLE_CUSTOMER_UPDATE_FAILURE,
  GET_SINGLE_CUSTOMER_UPDATE_REQUEST,
  GET_SINGLE_CUSTOMER_UPDATE_SUCCSESS,
  SEARCH_CUSTOMER_REQUEST,
  SEARCH_CUSTOMER_SUCCSESS,
  SEARCH_CUSTOMER_FAILURE,
  SEARCH_CUSTOMER_RESET,
} from "../constant/AllConstant";
import { baseUrlApi } from "../../config";
import { CLEAR_ERROR } from "../constant/productConstant";

export const GetSingleCustomer = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_CUSTOMER_REQUEST,
    });

    const { data } = await axios.get(
      `${baseUrlApi}users/detail?user_id=${id}`,
      {
        headers: {
          "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({
      type: GET_SINGLE_CUSTOMER_SUCCSESS,
      payload: data.data.users,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CUSTOMER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const UpdateCustomerAction = (id, formdata) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CUSTOMER_UPDATE_REQUEST });

    const { data } = await axios.post(
      `https://vr.w4u.in/manage/api/users/update?user_id=${id}`,
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
      type: GET_SINGLE_CUSTOMER_UPDATE_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CUSTOMER_UPDATE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const SearchCustomer =
  (q = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: SEARCH_CUSTOMER_REQUEST });

      console.log("callll sarch", q);

      const { data } = await axios.get(
        `https://vr.w4u.in/manage/api/users/all?q=${q}`,

        {
          headers: {
            "X-Api-Key": "8YUI3673DEB6F281A8F2E856902HJKU7",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch({
        type: SEARCH_CUSTOMER_SUCCSESS,
        payload: data.data.users,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: SEARCH_CUSTOMER_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
