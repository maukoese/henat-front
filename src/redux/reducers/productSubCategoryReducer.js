import { message } from "antd";
import {
	ADD_SUB_CATEGORY, ADD_SUB_CATEGORY_ERROR, DELETE_SUB_CATEGORY,
	SUB_CATEGORYS, SUB_CATEGORY_DETAILS
} from "../types/SubCategoryType";

const initialState = {
  list: null,
  sub_category: null,
};

const productSubCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUB_CATEGORYS:
      return { ...state, list: action.payload };
    case ADD_SUB_CATEGORY:
      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload);
      return { ...state, list };

    case SUB_CATEGORY_DETAILS:
      return { ...state, sub_category: action.payload.data };

    case DELETE_SUB_CATEGORY:
      const filterSubCategory = state.list.filter(
        (sub_category) =>
          sub_category.id !== parseInt(action.payload) && sub_category
      );

      return { ...state, list: filterSubCategory };

    // return {
    //   list: [
    //     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
    //   ],
    // };

    case ADD_SUB_CATEGORY_ERROR:
      message.error(action.payload);
      return state;
    default:
      return state;
  }
};

export default productSubCategoryReducer;
