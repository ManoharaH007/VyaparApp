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
  GET_SINGLE_CUSTOMER_FAILURE,
  GET_SINGLE_CUSTOMER_REQUEST,
  GET_SINGLE_CUSTOMER_SUCCSESS,
  GET_SINGLE_CUSTOMER_UPDATE_FAILURE,
  GET_SINGLE_CUSTOMER_UPDATE_REQUEST,
  GET_SINGLE_CUSTOMER_UPDATE_RESET,
  GET_SINGLE_CUSTOMER_UPDATE_SUCCSESS,
  SEARCH_CUSTOMER_FAILURE,
  SEARCH_CUSTOMER_REQUEST,
  SEARCH_CUSTOMER_RESET,
  SEARCH_CUSTOMER_SUCCSESS,
  UPDATE_GROUP_FAILURE,
  UPDATE_GROUP_REQUEST,
  UPDATE_GROUP_SUCCSESS,
} from "../constant/AllConstant";
import { CLEAR_ERROR } from "../constant/productConstant";

export const newGrpReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_GROUP_REQUEST:
    case DELETE_GROUP_REQUEST:
    case UPDATE_GROUP_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case ADD_NEW_GROUP_SUCCSESS:
      return {
        loading: false,
        isSucsess: action.payload,
        ...state,
      };

    case UPDATE_GROUP_SUCCSESS:
      return {
        isUpdated: action.payload,
        loading: false,
        ...state,
      };

    case DELETE_GROUP_SUCCSESS:
    case UPDATE_GROUP_FAILURE:
      return {
        loading: false,
        isDeleted: action.payload,
        ...state,
      };

    case ADD_NEW_GROUP_FAILURE:
    case DELETE_GROUP_FAILURE:
      return {
        loading: false,
        error: action.payload,
        ...state,
      };

    default:
      return state;
  }
};

export const addCustomer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CUSTOMER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ADD_CUSTOMER_SUCCSESS:
      return {
        loading: false,
        isSucsess: action.payload,
        ...state,
      };
    case ADD_CUSTOMER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  searchCustomer: [],
  customer: null,
  error: null,
};

export const GetSingleCustomer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_CUSTOMER_REQUEST:
    case SEARCH_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_SINGLE_CUSTOMER_SUCCSESS:
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };

    case SEARCH_CUSTOMER_SUCCSESS:
      return {
        ...state,
        loading: false,
        searchCustomer: action.payload,
      };

    case GET_SINGLE_CUSTOMER_FAILURE:
    case SEARCH_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SEARCH_CUSTOMER_RESET:
      return {
        ...state,
        loading: false,
        searchCustomer: [], // Resetting to empty array instead of null
        error: null,
      };

    default:
      return state;
  }
};

export const UpdateCustomer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_CUSTOMER_UPDATE_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case GET_SINGLE_CUSTOMER_UPDATE_SUCCSESS:
      return {
        loading: false,
        updSucsess: action.payload,
        ...state,
      };

    case GET_SINGLE_CUSTOMER_UPDATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
        ...state,
      };

    case GET_SINGLE_CUSTOMER_UPDATE_RESET:
      return {
        loading: false,
        error: null,
        updSucsess: null,
        ...state,
      };

    case CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};
