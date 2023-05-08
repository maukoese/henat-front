import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import accountReducer from "./reducers/accountReducer";
import customerReducer from "./reducers/customerReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import designationReducer from "./reducers/designationReducer";
import productBrandReducer from "./reducers/productBrandReducer";
import productCategoryReducer from "./reducers/productCategoryReducer";
import productReducer from "./reducers/productReducer";
import productSubCategoryReducer from "./reducers/productSubCategoryReducer";
import purchaseReducer from "./reducers/purchaseReducer";
import saleReducer from "./reducers/saleReducer";
import supplierPaymentReducer from "./reducers/supplierPaymentReducer";
import supplierReducer from "./reducers/supplierReducer";
import transactionReducer from "./reducers/transactionReducer";
import userReducer from "./reducers/userReducer";

const store = createStore(
	combineReducers({
		suppliers: supplierReducer,
		products: productReducer,
		purchases: purchaseReducer,
		customers: customerReducer,
		sales: saleReducer,
		users: userReducer,
		supplierPayments: supplierPaymentReducer,
		accounts: accountReducer,
		dashboard: dashboardReducer,
		transactions: transactionReducer,
		productCategories: productCategoryReducer,
		productSubCategories: productSubCategoryReducer,
		productBrands: productBrandReducer,
		designations: designationReducer,
	}),

	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
