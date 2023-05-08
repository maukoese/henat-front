import axios from "axios";
import { PRODUCT_BRANDS } from "../../types/ProductBrandType";

const getAllProductBrand = (data) => {
	return {
		type: PRODUCT_BRANDS,
		payload: data,
	};
};

export const loadAllProductBrand = ({ page, limit }) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(
				`product-brand?page=${page}&count=${limit}`
			);
			//dispatching data
			dispatch(getAllProductBrand(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
