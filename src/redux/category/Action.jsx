import { api } from "../../config/config";
import { CERTIFICATE_SERVICE_COMMON_URL } from "../../constants/Constants";

import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
} from "./ActionType";

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_REQUEST });
  try {
    const response = await api.get(`${CERTIFICATE_SERVICE_COMMON_URL}/category`);
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) { 
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      payload: error.message,
    });
  }
};
