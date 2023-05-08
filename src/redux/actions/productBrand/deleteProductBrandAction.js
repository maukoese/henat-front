import { DELETE_PRODUCT_BRAND } from "../../types/ProductBrandType";
import axios from "axios";

const deleteProductBrand = (id) => {
	return {
		type: DELETE_PRODUCT_BRAND,
		payload: id,
	};
};

export const DeleteProductBrand = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `product-brand/${id}`,
				data: {
					status: false,
				},
			});
			//dispatching data
			dispatch(deleteProductBrand(id));
		} catch (error) {
			console.log(error.message);
		}
	};
};
