import axios from "../Axios"
import { ORDERS_FETCH_REQUEST, ORDERS_FETCH_SUCCESS, ORDER_DETAILS_FETCH_SUCCESS, ORDERS_FETCH_ERROR, USER_LOGOUT } from "../constants"
import store from "../store/store.js";


export const addOrder = (orders) => async (dispatch) => {
      dispatch({ type: ORDERS_FETCH_REQUEST });
      const auth = store.getState().auth;
      console.log(orders);
     if (auth.signedIn) {

     
       try {
          const res = await axios.post("/addorder", { ...orders });
         if(res.status === 201) {
             console.log(res);
         } else {
            const { error } = res.data;
            dispatch({ type: ORDERS_FETCH_ERROR, payload: { error } });
         }
      } catch (error) {
        dispatch({ type: ORDERS_FETCH_ERROR, payload: { error } });
      }
 } else {

   }
}





export const getOrders = () => async (dispatch) => {
    dispatch({ type: ORDERS_FETCH_REQUEST });
    const auth = store.getState().auth;

try {
    if (auth.signedIn) {
    const res = await axios.get("/getorder");
    if(res.status === 202) {
         const { orders } = res.data
         console.log(res)
         dispatch({ type: ORDERS_FETCH_SUCCESS, payload: { orders } });
         console.log(orders);
    } else {
        const { error } = res.data;
        dispatch({ type: ORDERS_FETCH_ERROR, payload: { error } });
       }
  } else {
    dispatch({ type: USER_LOGOUT });
   } 
 } catch (error) {
    dispatch({ type: ORDERS_FETCH_ERROR, payload: { error } });
   }
}


export const getOrderDetails = (orderId) => async (dispatch) => {
   dispatch({ type: ORDERS_FETCH_REQUEST });
   const auth = store.getState().auth;

try {
   if (auth.signedIn) {
   const res = await axios.get(`/getorder/${orderId}`);
   if(res.status === 202) {
        const { orderDetails } = res.data
        console.log(res)
        dispatch({ type: ORDER_DETAILS_FETCH_SUCCESS, payload: { orderDetails } });
        console.log(orderDetails);
   } else {
       const { error } = res.data;
       dispatch({ type: ORDERS_FETCH_ERROR, payload: { error } });
      }
 } else {
   dispatch({ type: USER_LOGOUT });
  } 
} catch (error) {
   dispatch({ type: ORDERS_FETCH_ERROR, payload: { error } });
  }
}