import {
	ADD_PRODUCT_BRAND,
	DELETE_PRODUCT_BRAND,
	PRODUCT_BRANDS,
	ADD_PRODUCT_BRAND_ERROR,
	PRODUCT_BRAND_DETAILS,
} from "../types/ProductBrandType";
import { message } from "antd";

const initialState = {
	list: null,
	brand: null,
};

const productBrandReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCT_BRANDS:
			return { ...state, list: action.payload };
		case ADD_PRODUCT_BRAND:
			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload);
			return { ...state, list };

		case PRODUCT_BRAND_DETAILS:
			return { ...state, brand: action.payload.data };

		case DELETE_PRODUCT_BRAND:
			const filtercategory = state.list.filter(
				(brnad) => brnad.id !== parseInt(action.payload) && brnad
			);

			return { ...state, list: filtercategory };

		// return {
		//   list: [
		//     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
		//   ],
		// };

		case ADD_PRODUCT_BRAND_ERROR:
			message.error(action.payload);
			return state;
		default:
			return state;
	}
};

export default productBrandReducer;
