import axios from "axios";
import { SUB_CATEGORYS } from "../../types/SubCategoryType";

const getAllProductSubCategory = (data) => {
  return {
    type: SUB_CATEGORYS,
    payload: data,
  };
};

export const loadAllProductSubCategory = ({ page, limit }) => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `product-sub-category?page=${page}&count=${limit}`
      );
      //dispatching data
      dispatch(getAllProductSubCategory(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
