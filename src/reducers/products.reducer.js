import {   
    PRODUCTS_FETCH_REQUEST, 
    PRODUCTS_FETCH_SUCCESS, 
    PRODUCTS_FETCH_ERROR,
    PRODUCTS_DETAILS_FETCH_REQUEST,
    PRODUCTS_DETAILS_FETCH_SUCCESS,
    PRODUCTS_DETAILS_FETCH_ERROR 
} from "../constants";

const initialState = {
    products: [],
    productDetails: {},
    loading: false,
    error: null
}

const productsReducer = (state = initialState, action) => {
   switch (action.type) {
       case PRODUCTS_FETCH_REQUEST:
         return state = {
              ...state,
              loading: true
          }

       case PRODUCTS_FETCH_SUCCESS:
         return state = {
              ...state,
              loading: false,
              products: action.payload.products
           }

        case PRODUCTS_FETCH_ERROR:
          return state = {
              ...state,
              error: action.payload.error,
           }

        case PRODUCTS_DETAILS_FETCH_REQUEST:
           return state = {
              ...state,
              loading: true
           }   

        case PRODUCTS_DETAILS_FETCH_SUCCESS:
            return  {
                ...state,
                productDetails: action.payload.productDetails,
                loading: false
             }
        case PRODUCTS_DETAILS_FETCH_ERROR:
              return state = {
                    ...state,
                    error: action.payload.error,
               }
   
       default: return state;
          
   }
}

export default productsReducer;