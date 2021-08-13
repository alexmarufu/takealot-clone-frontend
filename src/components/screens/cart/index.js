import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getCart, removeCartItem, updateCart, } from "../../../actions/cart.action";
import authReducer from "../../../reducers/auth.reducer";
import store from "../../../store/store";
import Header from "../../header/Header"
import Item from "./components/item"

import "./styles.css"


function Cart(props) {

    const dispatch = useDispatch();   

    useEffect(() => {
        dispatch(updateCart());
    }, [])

    const cart = useSelector(state => state.cart);

    const auth = useSelector(state => state.auth);

    const myCart = cart.cartProducts;
    
   
     console.log(cart)

    useEffect(() => {
        dispatch(updateCart());
    }, [cart.loading])

    
    const increaseQty = parseInt(1);
    const decreaseQty = parseInt(-1);

  
    const TotalPrice = myCart.length >= 1 ? myCart.reduce((initQty, { productId, quantity, price }, index) => {
        //const itemQuantity = myCart.find((item) => item.productId === productId);
        return quantity * price + initQty
    }, 0) :  0;

    console.log(myCart);
    

    return (
        
        <Header login={!auth.signedIn} search>
        <Container style= {{ margin:0, alignItems: "center", justifyContent: "center" }}>
       
        <h3 style={{ textAlign: "center", color: "#474747", padding: 10 }}>Shopping Cart</h3>
        {cart.error ? <h4>error</h4> : cart.loading ? <h4>loading</h4> : myCart.length >= 1 ? (
            <div className="maindiv" style={{ display: "flex", justifyContent: "space-between"}}>
              <div style={{ flexDirection: "column"  }}>
            
            {myCart.map(({id,name, price, quantity, description, productId, productImage, category, slug, orderId}, index) => 

            (<Item 
              key={index}
              name={name}
              img={productImage}
              price={price}
              quantity={quantity}
              increaseQuantity={() =>  dispatch(addToCart({name, price, quantity, description, productId, productImage, category, slug, orderId},increaseQty))}
              decreaseQuantity={() =>  dispatch(addToCart({name, price, quantity, description, productId, productImage, category, slug , orderId},decreaseQty))}
              removeItem={() => dispatch(removeCartItem(id))}
              />
              ))}
             
              </div>
              
             <div style={{ alignItems: "center", height: 170, marginLeft: 10  }} className="sideprice">
             <h3 style={{ color: "#474747"}}>Cart Summary</h3>
           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p>Total Items ({myCart.length})</p>
            <h2 style={{color: "#1c8644"}}>R {TotalPrice}</h2>
            </div>
            <Link to="/checkout">
            <button className="button" onClick={() => console.log("checking out")}>Proceed to Checkout</button>
            </Link>
           </div>
        </div>) : myCart.length <= 0 ? <h2>your cart is empty</h2> : null}
         
       </Container>
        </Header>
    )
}

export default Cart;