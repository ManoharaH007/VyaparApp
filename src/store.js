import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import {
  AddStaf,
  PrdReducer,
  FetchAll,
  AllLanguages,
} from "./redux/reducer/productReducer";
import {
  addCustomer,
  GetSingleCustomer,
  newGrpReducer,
  UpdateCustomer,
} from "./redux/reducer/AllReducer";

const reducers = combineReducers({
  products: PrdReducer,
  addStaff: AddStaf,
  allGroup: FetchAll,
  Addgroup: newGrpReducer,
  AddCustomer: addCustomer,
  allLng: AllLanguages,
  SingleCustomer: GetSingleCustomer,
  updCustomer: UpdateCustomer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
