import { PRODUCT_BRAND_DETAILS } from "../../types/ProductBrandType";
import axios from "axios";

const detailProductBrand = (data) => {
	return {
		type: PRODUCT_BRAND_DETAILS,
		payload: data,
	};
};

export const loadSingleProductBrand = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const data = await axios.get(`product-brand/${id}`);
			//dispatching data
			dispatch(detailProductBrand(data));
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};
};
