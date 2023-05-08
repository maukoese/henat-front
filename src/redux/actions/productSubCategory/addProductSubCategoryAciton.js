import axios from "axios";
import { toast } from "react-toastify";
import { ADD_SUB_CATEGORY } from "../../types/SubCategoryType";

const addProductSubCategoryAction = (data) => {
	return {
		type: ADD_SUB_CATEGORY,
		payload: data,
	};
};

export const addProductSubCategory = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `product-sub-category/`,
				data: {
					...values,
				},
			});
			//dispatching data
			dispatch(addProductSubCategoryAction(data));
			toast.success("product Sub-Category Added");
			return {
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding product Sub-Category try again");
			console.log(error.message);
		}
	};
};
