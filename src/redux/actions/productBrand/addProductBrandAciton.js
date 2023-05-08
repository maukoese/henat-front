import { ADD_PRODUCT_BRAND } from "../../types/ProductBrandType";
import axios from "axios";
import { toast } from "react-toastify";

const addProductBrandAction = (data) => {
	return {
		type: ADD_PRODUCT_BRAND,
		payload: data,
	};
};

export const addProductBrand = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `product-brand/`,
				data: {
					...values,
				},
			});
			//dispatching data
			dispatch(addProductBrandAction(data));
			toast.success("product Brand Added");
		} catch (error) {
			toast.error("Error in adding product Brand try again");
			console.log(error.message);
		}
	};
};
