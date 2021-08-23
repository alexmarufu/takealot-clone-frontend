import React, { useEffect } from "react";
import Header from "../../header/Header";
import { Container, Paper } from '@material-ui/core';
import { AccountBox, LocalShippingOutlined, ReorderOutlined, CreditCardOutlined } from '@material-ui/icons'
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../../actions/order.action";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { updateCart } from "../../../actions/cart.action";
import "./styles.css"

function Orders(props) {
  const auth = useSelector(state => state.auth);

  const order = useSelector(state => state.orders);
  const cart = useSelector(state => state.cart);

  console.log(order)


  const dispatch = useDispatch();

  //dispatch(getOrders());

  useEffect(() => {
    dispatch(getOrders());
  }, [])

  useEffect(() => {
    dispatch(getOrders());
  }, [order.loading])

  
useEffect(() => {
  dispatch(updateCart());
 }, [cart.loading])
 

 if(!auth.signedIn) {
  return <Redirect to="/login" />
}


    return (
      <Header login={!auth.signedIn} logout={auth.signedIn}>
       <Container>
     <h3 style={{ color: "#474747", padding: 10}}>Orders</h3>

      {order.orders.map((item, index) => (
      <Paper key={index} elevation={3} style={{ marginTop: 20, padding: 20 }}>
        <div className="smalltext" style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}} >
        <h4>Order <span style={{marginLeft: 10}}> #{item.orderId}</span></h4>
        <h4>We be delivered in 3 days</h4>
        </div>
        <hr className="hr"/>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}} >
        <h4> {item.orderDate}</h4>
        <Link to={`/${item.orderId}`}>
         <button className="order-details-button">Order Details</button>
        </Link>

         </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginRight: 20 }}>
          {JSON.parse(item.orderItems).map((item, key) => (<div key={key} className="product-border" style={{ width: 100, height: 100 }} >
           <img style={{ width: 100, height: 100, marginBottom: 20 }} src={item.productImage} alt=""/>
          </div>))}              
         </div>     
      </Paper>))}
      
      </Container>
      </Header>
    )
}

export default Orders