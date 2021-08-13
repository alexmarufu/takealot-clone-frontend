import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import Header from "../../header/Header"
import { fetchProducts } from "../../../actions/products.action"

import "./styles.css"

import store from "../../../store/store"
import { address, updateUser } from "../../../actions/auth.action";
import { Container, Paper } from "@material-ui/core";


function Home(props) {

  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();
 
   useEffect(() => {
     dispatch(updateUser());
     dispatch(fetchProducts());
     dispatch(address());
    }, []);  

   
  
   
   const product = useSelector(state => state.product);
    
   const products = product.products

   
   console.log("all-products", products);
   
    return (
        
        <Header login={!auth.signedIn} search>
        <img className="headerImg" src="https://food.ubc.ca/wp-content/uploads/2020/02/Save-Money-On-Groceries_UBC-Food-Services.jpg" alt="" style={{ width: "100%", height: 700 }} />
       
        <Container className="border" style={{ }}>
            {product.error ? <h4>error</h4> : product.loading ? <h4>loading</h4> : products.length >= 1 ? (
            <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: 80, marginRight: 80,  }}>
              <h3 style={{ color: "#474747" }}>Daily Deals</h3>

              <button style={{ width: 120 }} className="button">View More</button>
              </div>
                <div className="itemWrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                    {products.map(({ name, price, productImage, productId, slug } , key) => ( 
                     <Link key={key} style={{textDecoration: "none"}} to={`/${slug}/${productId}`}>
                     <div className="product">                   
                     <img style={{width: 200, height: 220}} src={productImage} alt=""/>
                     <p style={{ color: "#474747", maxWidth: 200, margin: 5, marginTop:5}}>{name}</p>
                     <h4 style={{ color: "#474747" , margin: 5, marginTop:15, marginBottom: 10}}>R    {price}</h4>                   
                     </div>
                    </Link>
                    ))}
            
              </div>
              </>) : products.length <= 0 ? <h2>no products available</h2> : null}
        </Container>
        
        </Header>
       
    )
}

export default Home;