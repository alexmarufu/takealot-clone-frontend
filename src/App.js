import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './components/screens/home/Home';
import ProductDetails from './components/screens/ProductDetails/ProductDetails';
import Login from './components/screens/login/index';
import Signup from './components/screens/signup/index';
import Cart from "./components/screens/cart/index"
import { useSelector, useDispatch } from 'react-redux';
import Checkout from "./components/screens/checkout";
import Orders from "./components/screens/orders/index";
import OrdersDetails from "./components/screens/Orderdetails/Orderdetails";
import { updateUser } from "./actions/auth.action";
import { updateCart } from "./actions/cart.action";

function App() {

  const auth = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);
  
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(updateUser());
   }, []);  
 

  useEffect(() => {
    dispatch(updateUser());
   }, [auth.loading]);  
   


   useEffect(() => {
    dispatch(updateCart());
  }, [])
    

  useEffect(() => {
    dispatch(updateCart());
   }, [cart.loading])
   
 
   if(cart.loading ) {
     return <h3>loading</h3>
   }
  
 
  return (
    
    <Router> 
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login"component={Login}/> 
          <Route path="/register"component={Signup}/> 
          <Route path="/cart"component={Cart}/>       
          <Route path="/:slug/:id" component={ProductDetails}/>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/:orderId" component={OrdersDetails} />
        </Switch>
    </Router>
  );
}

export default App;
