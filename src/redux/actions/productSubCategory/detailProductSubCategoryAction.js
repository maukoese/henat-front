import axios from "axios";
import { SUB_CATEGORY_DETAILS } from "../../types/SubCategoryType";

const detailProductSubCategory = (data) => {
	return {
		type: SUB_CATEGORY_DETAILS,
		payload: data,
	};
};

export const loadSingleProductSubCategory = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const data = await axios.get(`product-sub-category/${id}`);
			//dispatching data
			dispatch(detailProductSubCategory(data));
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};
};
