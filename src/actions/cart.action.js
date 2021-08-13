import axios from "../Axios/index.js";
import {   
    ADD_TO_CART_REQUEST, 
    ADD_TO_CART_SUCCESS, 
    ADD_TO_CART_ERROR,
    LOGGED_OUT_USER_CART,
    EMPTY_CART,
    
} from "../constants";
import store from "../store/store.js";

export const addToCart = (cartProducts, qty) => async (dispatch) => {

    dispatch({ type: ADD_TO_CART_REQUEST });

     try {      
        const auth = store.getState().auth;
        console.log(cartProducts);

        if (auth.signedIn) {

        const res = await axios.post("/addcart", {...cartProducts, qty});
        console.log(res); 
        if(res.status === 201) {            
      
         dispatch(updateCart());
         //dispatch({ type: ADD_TO_CART_SUCCESS, payload: { cartProducts } });
        } else {
            const { error } =  res.data;
            dispatch({ type: ADD_TO_CART_ERROR, payload: { error } });
            console.log(error);  
        }

        } else {

            const cart = store.getState().cart;

            //const itemExist = cart.cartProducts.some(product => product.productId === item.productId)
            
            const itemExist = cart.cartProducts.find(product => product.productId === cartProducts.productId);    
           
            if(itemExist) {

             const productIndex = cart.cartProducts.indexOf(itemExist);    
             console.log(productIndex);    

             const quantity = itemExist.quantity + qty;
      
             cart.cartProducts[productIndex] = {
                ...cartProducts,
                 quantity
             }
             const cartQtyUpdate = store.getState().cart.cartProducts;
             localStorage.setItem("cart", JSON.stringify(cartQtyUpdate));

            } else {
                dispatch({ type: LOGGED_OUT_USER_CART, payload: { cartProducts } });
                const cartLocalStorage = store.getState().cart.cartProducts;
                localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
                console.log(cart);
                   
          }          
        }

     } catch (error) {
        dispatch({ type: ADD_TO_CART_ERROR, payload: { error } });
        console.log(error);
     }
     
 }





 
  export const updateCart = () => async (dispatch) => {

     //dispatch({ type: ADD_TO_CART_REQUEST });
    try {
     const auth = store.getState().auth;
     if(auth.signedIn) {         

            const cart = localStorage.getItem("cart");
            if(!cart) {

              const res = await axios.get("/getcart");
              if (res.status === 202) {
               const { cartProducts } = res.data;
                dispatch({ type:  ADD_TO_CART_SUCCESS, payload: { cartProducts } });                
                //console.log(cartProducts)
              } else {
                const { error } = res.data;
                dispatch({ type: ADD_TO_CART_ERROR, payload: { error } });
            }
            } else {
              
              const res = await axios.post("/updatecart", { cart });
              console.log(res); 
              if(res.status === 201) {  
                const { cartProducts } =  res.data;          
                //console.log(cartProducts);               
                dispatch({ type: ADD_TO_CART_SUCCESS, payload: { cartProducts } });
                localStorage.removeItem("cart");
             } else {
                 const { error } =  res.data;
                 dispatch({ type: ADD_TO_CART_ERROR, payload: { error } });
                 console.log(error);  
             }

             //const cartQtyUpdate = store.getState().cart.cartProducts;
              //console.log(cart); 
            }

         } else {
         const cart = localStorage.getItem("cart");
         if(!cart) {
            dispatch({ type: EMPTY_CART });
         } else {
            const cartProducts = JSON.parse(cart);   
                       
            dispatch({ type: ADD_TO_CART_SUCCESS, payload: { cartProducts } });

            const cartQtyUpdate = store.getState().cart.cartProducts;
            console.log(cartQtyUpdate); 
          }
              
         } 
     } catch(error) {
       dispatch({ type: ADD_TO_CART_ERROR, payload: { error } });
       console.log(error);
    }

   }



/*
export const getCart = () => async (dispatch) => {

       try {

        const auth = store.getState().auth;
        if(auth.signedIn) { 

        const res = await axios.get("/getcart");
        if (res.status === 202) {
         const { cartProducts } = res.data;
          dispatch({ type:  ADD_TO_CART_SUCCESS, payload: { cartProducts } });
          //console.log(cartProducts)
        } else {
          const { error } = res.data;
          dispatch({ type: ADD_TO_CART_ERROR, payload: { error } });
      }
      }
       } catch (error) {
        dispatch({ type: ADD_TO_CART_ERROR, payload: { error } });
       }
}

 */



 export const removeCartItem = (itemId) => async (dispatch) => {
    dispatch({ type: ADD_TO_CART_REQUEST });
    
      try {
        const auth = store.getState().auth;
        if (auth.signedIn) {
            const res = await axios.delete(`/removeitem/${itemId}`);
             if(res.status === 200) {
                dispatch(updateCart());
             } else {
               const { error } = res.data;
               dispatch({ type: ADD_TO_CART_ERROR, payload: { error } });
             }
         } else {
             const cart = store.getState().cart;
             const product = cart.cartProducts.find(item => item.productId === itemId);
             if(product) {                               
                    //const item = cart.cartProducts.splice(productIndex, 1);
                    const productIndex = cart.cartProducts.indexOf(product);
               
                    const cartProducts = [...cart.cartProducts]
                    cartProducts.splice(productIndex, 1)
                    dispatch({ type: ADD_TO_CART_SUCCESS, payload: { cartProducts } });
                    
                    localStorage.setItem("cart", JSON.stringify(cartProducts));
                    console.log(cartProducts);              
             } else {
                console.log("item not found")
             }
                 
        }

    } catch (error) {
          dispatch({ type: ADD_TO_CART_ERROR, payload: { error } });
           console.log(error)
    }
     
  }