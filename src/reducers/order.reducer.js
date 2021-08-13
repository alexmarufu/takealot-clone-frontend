import {   
    ORDERS_FETCH_REQUEST, 
    ORDERS_FETCH_SUCCESS,
    ORDER_DETAILS_FETCH_SUCCESS,
    ORDERS_FETCH_ERROR
} from "../constants";

const initialState = {
    orders: [],
    orderDetails: [],
    loading: false,
    error: null
}

const orderReducer = (state = initialState, action) => {
   switch (action.type) {
       case ORDERS_FETCH_REQUEST:
         return state = {
              ...state,
              loading: true
          }

       case ORDERS_FETCH_SUCCESS:
         return state = {
              ...state,
              loading: false,
              orders: action.payload.orders,
           }
      case ORDER_DETAILS_FETCH_SUCCESS:
            return state = {
                 ...state,
                 loading: false,
                 orderDetails: action.payload.orderDetails,
              }
        case ORDERS_FETCH_ERROR:
          return state = {
              ...state,
              error: action.payload.error,
           }
        
      
       default: return state;
          
   }
}

export default orderReducer;