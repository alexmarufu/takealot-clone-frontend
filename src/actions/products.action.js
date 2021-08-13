import axios from "../Axios/index.js";
import { 
     PRODUCTS_FETCH_REQUEST, 
     PRODUCTS_FETCH_SUCCESS, 
     PRODUCTS_FETCH_ERROR,
     PRODUCTS_DETAILS_FETCH_REQUEST,
     PRODUCTS_DETAILS_FETCH_SUCCESS,
     PRODUCTS_DETAILS_FETCH_ERROR
} from "../constants/index.js"

export const fetchProducts = () => async (dispatch) => {

     dispatch({type: PRODUCTS_FETCH_REQUEST});
     try {
         const res = await axios.get("/getproducts");
         console.log(res);
         if(res.status === 200) {
              const { products } = res.data;
              
              dispatch({type: PRODUCTS_FETCH_SUCCESS, payload : { products }});
         } else {
            const { error } = res.data
            dispatch({type: PRODUCTS_FETCH_ERROR, payload : { error }});
         }
     } catch (error) {
          dispatch({type: PRODUCTS_DETAILS_FETCH_ERROR, payload : { error }});
          console.log(error);
     }
}


export const fetchProductDetails = (productId) => async (dispatch) => {

     dispatch({type: PRODUCTS_DETAILS_FETCH_REQUEST});
     try {
         const res = await axios.get(`/getproduct/${productId}`);
         console.log(res);
         if(res.status === 200) {
              const { productDetails } = res.data;
              
              dispatch({type: PRODUCTS_DETAILS_FETCH_SUCCESS, payload : { productDetails }});
         } else {
            const { error } = res.data
            dispatch({type: PRODUCTS_DETAILS_FETCH_ERROR, payload : { error }});
         }
     } catch (error) {
          dispatch({type: PRODUCTS_DETAILS_FETCH_ERROR, payload : { error }});
          console.log(error);
     }
}