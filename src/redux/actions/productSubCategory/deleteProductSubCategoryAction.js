import { DELETE_SUB_CATEGORY } from "../../types/SubCategoryType";
import axios from "axios";

const deleteProductSubCategory = (id) => {
	return {
		type: DELETE_SUB_CATEGORY,
		payload: id,
	};
};

export const DeleteProductSubCategory = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `product-sub-category/${id}`,
				data: {
					status: false,
				},
			});
			//dispatching data
			dispatch(deleteProductSubCategory(id));
		} catch (error) {
			console.log(error.message);
		}
	};
};
