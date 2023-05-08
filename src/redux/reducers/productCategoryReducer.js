import { message } from "antd";
import {
	ADD_PRODUCT_CATEGORY, ADD_PRODUCT_CATEGORY_ERROR, DELETE_PRODUCT_CATEGORY,
	PRODUCT_CATEGORYS, PRODUCT_CATEGORY_DETAILS
} from "../types/ProductCategoryType";

const initialState = {
  list: null,
  category: null,
};

const productCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORYS:
      return { ...state, list: action.payload };
    case ADD_PRODUCT_CATEGORY:
      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload);
      return { ...state, list };

    case PRODUCT_CATEGORY_DETAILS:
      return { ...state, category: action.payload.data };

    case DELETE_PRODUCT_CATEGORY:
      const filtercategory = state.list.filter(
        (category) => category.id !== parseInt(action.payload) && category
      );

      return { ...state, list: filtercategory };

    // return {
    //   list: [
    //     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
    //   ],
    // };

    case ADD_PRODUCT_CATEGORY_ERROR:
      message.error(action.payload);
      return state;
    default:
      return state;
  }
};

export default productCategoryReducer;
