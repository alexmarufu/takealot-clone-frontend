import {   
    ADD_TO_CART_REQUEST, 
    ADD_TO_CART_SUCCESS, 
    ADD_TO_CART_ERROR,
    EMPTY_CART,
    LOGGED_OUT_USER_CART
} from "../constants";

const initialState = {
    cartProducts: [],
    loading: false,
    error: null
}

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_TO_CART_REQUEST:
         return state = {
              ...state,
              loading: true
          }

      case ADD_TO_CART_SUCCESS:
         return state = {
              ...state,
              loading: false,
              cartProducts:  action.payload.cartProducts
           }
    case LOGGED_OUT_USER_CART:
            return state = {
                 ...state,
                 loading: false,
                 cartProducts:  [...state.cartProducts, action.payload.cartProducts]
              }
      case ADD_TO_CART_ERROR:
          return state = {
                    ...state,
                    error: action.payload.error,
                 }
    
      case EMPTY_CART:
            return state = {
                ...initialState
         }

       default: return state;
          
   }
}

export default cartReducer;