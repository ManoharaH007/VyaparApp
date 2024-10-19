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
  CREATE_PRODUCT_RESET,
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

const initialState = {
  loading: false,
  success: false, // or whatever state is relevant to show success
  product: null,
  error: null,
};
// Reducer function
export const PrdReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state, // Spread the current state
        loading: true, // Set loading to true
      };

    case CREATE_PRODUCT_SUCCSESS: // Corrected the spelling from SUCCSESS to SUCCESS
      return {
        ...state, // Spread the current state
        loading: false, // Set loading to false
        product: action.payload, // Update the product with the payload
        isSucsess: action.payload.status,
      };

    case CREATE_PRODUCT_FAILURE:
      return {
        ...state, // Spread the current state
        loading: false, // Set loading to false
        error: action.payload, // Update the error with the payload
      };

    case CREATE_PRODUCT_RESET:
      return { ...initialState };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state; // Return the current state if no action matches
  }
};

export const AddStaf = (state = {}, action) => {
  switch (action.type) {
    case ADD_STAFF_REQUEST:
    case STAFF_GROUP_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case ADD_STAFF_SUCCSESS:
    case STAFF_GROUP_SUCCSESS:
      return {
        loading: false,
        ...state,
        isAdded: action.payload,
      };

    case ADD_STAFF_FAILURE:
    case STAFF_GROUP_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const FetchAll = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
    case ALL_CUSTOMER_REQUEST:
    case ALL_CATEGORY_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case FETCH_SUCCSESS:
      return {
        loading: false,
        ...state,
        Allgroup: action.payload,
      };

    case ALL_CUSTOMER_SUCCSESS:
      return {
        loading: false,
        ...state,
        allCustomers: action.payload,
      };

    case ALL_CATEGORY_SUCCSESS:
      return {
        loading: false,
        allCategory: action.payload,
        ...state,
      };

    case FETCH_FAILURE:
    case ALL_CUSTOMER_FAILURE:
    case ALL_CATEGORY_FAILURE:
      return {
        loading: false,
        error: action.payload,
        ...state,
      };
    default:
      return state;
  }
};

export const AllLanguages = (state = {}, action) => {
  switch (action.type) {
    case ALL_LANGUAGES_REQUEST:
    case SINGLE_LANGUAGES_REQUEST:
      return {
        loading: false,
        ...state,
      };

    case ALL_LANGUAGES_SUCCSESS:
      return {
        loading: true,
        lang: action.payload,
        ...state,
      };

    case SINGLE_LANGUAGES_SUCCSESS:
      return {
        loading: false,
        slang: action.payload,
        ...state,
      };

    case ALL_LANGUAGES_FAILURE:
    case SINGLE_LANGUAGES_FAILURE:
      return {
        loading: false,
        error: action.payload,
        ...state,
      };

    default:
      return state;
  }
};
