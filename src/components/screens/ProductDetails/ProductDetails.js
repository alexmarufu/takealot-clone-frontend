import React, { useEffect } from 'react'
import Header from "../../header/Header"
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails } from "../../../actions/products.action"
import { addToCart } from '../../../actions/cart.action';
import "./styles.css";
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function ProductDetails(props) {

   const dispatch = useDispatch();
 
   useEffect(() => {
     dispatch(fetchProductDetails(props.match.params.id));
    }, []);  
  
    console.log(props)
  
   const product = useSelector(state => state.product);
   const auth = useSelector(state => state.auth);

    const { name, price, description, productImage, productId, category, slug } = product.productDetails;
    console.log(product.productDetails);

    const newQuantity = parseInt(1);
   
    const addProductToCart = () => {
        dispatch(addToCart({name, price, quantity: 1, description, productId, productImage, category, slug }, newQuantity));
    }

  return (
     <Header login={!auth.signedIn} logout={auth.signedIn} search>
        {product.error ? <h4>error</h4> : product.loading ? <h4>loading</h4> : product.productDetails ? (
        <div className="realmainborder" style={{ justifyContent: "center", alignItems: "center" }}>
        <div className="mainborder" style={{ }}>    
        <div className="parentborder" style={{ }}>
         <div className="imgborder" style={{ marginTop: 10, borderWidth: 1, borderColor: "#cac8c8", borderStyle: "solid", borderRadius: 3  }}>
        <img className="product-img" style={{  }} src={productImage}/>
        
        </div>
        <div style={{marginLeft: 20}}>
        <p style={{ marginLeft: 22 }}>{name}</p>
        <br/>
        <hr style={{ marginLeft: 22 }}/>
        <p style={{ marginLeft: 22 }}><b>In stock</b></p>
        <hr  style={{ marginLeft: 22, }}/>
        <ul style={{color: "#3a3939"}}>
           <li>Eligible for Cash on Delivery.</li>
           <li>Free Delivery Available.</li>
           <li>Hassle-Free Exchanges & Returns for 30 Days.</li>
           <li>6-Month Limited Warranty.</li>
        </ul>
        </div>
        </div>


        <div className="sideprice">
            <h2>R {price}</h2>
            <p>FREE DELIVERY</p>
            <button className="button" onClick={addProductToCart}>Add To Cart</button>
        </div>
      </div>
      <div className="description" style={{}}>
      <h4 style={{ color: "#0b79bf", marginBottom: 2 }}>Description</h4>
      <div  style={{ height:3, backgroundColor: "#0b79bf", width: 90 }}></div>
      <p style={{}}>{description}</p>
      </div>
     </div>) : <Redirect to="/" />}
     </Header>
  )
}

export default ProductDetails
