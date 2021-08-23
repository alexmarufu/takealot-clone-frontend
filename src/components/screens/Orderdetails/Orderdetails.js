
import React, { useEffect } from "react";
import Header from "../../header/Header";
import { Container, Paper } from '@material-ui/core';
import { AccountBox, LocalShippingOutlined, ReorderOutlined, CreditCardOutlined } from '@material-ui/icons'

import "./styles.css"
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../../actions/order.action";


function ProductDetails(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(props.match.params.orderId));
  }, [])

  const orders = useSelector(state => state.orders);

  const auth = useSelector(state => state.auth);

  const orderDetails = orders.orderDetails;

//const delivery = JSON.parse(orders.deliveryAddress);

//console.log(Object.keys(orders.deliveryAddress));


    return (
         
      <Header login={!auth.signedIn} logout={auth.signedIn}>
      <Container>
      {orders.error ? <h4>error</h4> : orders.loading ? <h4>loading</h4> : orders.orderDetails ? (
        <div>
         {orderDetails.map((item, index) =>  (
         <div key={index}>
        <Paper elevation={3} style={{ padding: 20 }}>
       <h4 style={{marginLeft: 5}}><b> Order <span style={{ marginLeft: 10, marginRight: 10 }}>#{item.orderId}</span> | <span style={{ marginLeft: 10, marginRight: 10}}>{item.orderDate}</span> </b></h4>
       <hr className="hr"/>
       <div>
           <div className="order-border" style={{  }}>
               <div>
                 <div style={{ alignItems: "center", display: "flex" }}>
                 <AccountBox fontSize="small" /><p style={{marginLeft: 5}}><b> Shipping Address</b></p>
                 </div>
                 <div>
                 <p>{JSON.parse(item.deliveryAddress).Address1}</p>
                 <p>{JSON.parse(item.deliveryAddress).Address2}</p>
                 <p>{JSON.parse(item.deliveryAddress).City}</p>
                 <p>{JSON.parse(item.deliveryAddress).Province}</p>
                 <p>{JSON.parse(item.deliveryAddress).Zip}</p>
                 <p>{JSON.parse(item.deliveryAddress).Country}</p>
                 </div>
               </div>
               <div> 
               <div style={{ alignItems: "center", display: "flex" }}>
               <LocalShippingOutlined fontSize="small" /> <p style={{marginLeft: 5}}><b> Delivery Method</b></p>
                 </div>
                 <p>Standard</p>
                 <div>
                 <div style={{ alignItems: "center", display: "flex" }}>
               <CreditCardOutlined fontSize="small" /><p style={{marginLeft: 5}}><b> Payment Method</b></p>
                 </div>
                 <p>{item.paymentMethod}</p>
                 </div>
                 </div>
               <div> 
               <div style={{ alignItems: "center", display: "flex" }}>
               <ReorderOutlined fontSize="small" /><p style={{marginLeft: 5}}><b> Order Summary</b></p>
                 </div>
                 <div style={{width: 300,}}>
                 <div style={{ display: "flex",  justifyContent: "space-between" }}>
               <p>{item.totalItems} item(s)</p>
               <p style={{fontWeight: "bold", color: "#474747"}}>R {item.totalPrice}</p>
               </div>
               <div style={{ display: "flex",  justifyContent: "space-between" }}>
               <p>Delivery</p>
               <p style={{fontWeight: "bold", color: "#474747"}}>{0}</p>
               </div>
               </div>
               </div>
               
          </div>         
      </div>
      </Paper>

      <Paper elevation={3} style={{ marginTop: 20, padding: 20, marginBottom: 20 }}>
        
      <h4>Status: {item.status}</h4> 
        
        <div  style={{ display: "", alignItems: "center",}} >
        
        {JSON.parse(item.orderItems).map((item, index) => (

    <div key={index} style={{ display: "flex", alignItems: "center" }}>

    <div className="product-border" style={{ width: 100, height: 100, marginBottom: 10 }} >
      <img style={{ width: 100, height: 100, }} src={item.productImage} alt=""/>
   </div>
    <div>
    <p style={{marginLeft: 5}}>{item.name}</p>
    <p style={{marginLeft: 5}}>qty: {item.quantity}</p>
    <p style={{marginLeft: 5}}>R {item.price}</p>
    </div>       
    </div>      
        ))}


         </div>
      </Paper>
      </div>))}
      </div>
      
      ) : <h4>error again</h4>}
      </Container>
      
      </Header>
     
    )
}

export default ProductDetails