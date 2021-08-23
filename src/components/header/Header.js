import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Favorite, Search, Menu } from '@material-ui/icons';

import "./styles.css"
import { getCart, updateCart } from '../../actions/cart.action';
import { Paper } from '@material-ui/core';
import { logOut } from '../../actions/auth.action';

function Header({ children, login, search, logout }) {

 const dispatch = useDispatch();

 const [open, setOpen]= useState(false)
 /*
 useEffect(() => {
  dispatch(updateCart());
}, [])
*/
 const cart = useSelector(state => state.cart);

  /* 
useEffect(() => {
  dispatch(updateCart());
 }, [cart.loading])
 
 */


  return (
    <>
      <div className="main" style={{  }}>
       
        <div className="mainbar" style={{  }}>
        <p onClick={() => !open ? setOpen(true) : setOpen(false)} className="navIcon" style={{ color: "#202020", marginLeft: 15 }}><Menu /></p>
     
        <Link to="/">
          <img className="logo" style={{  }}
            src="https://www.bursariesportal.co.za/sites/default/files/bursaries/takealotLogo%20%281%29.png"
            alt=""
          /></Link>
          <a className="navName"  style={{ color: "#202020", marginRight: 15, marginLeft: 20, textDecoration: "none" }} href="#"><p>Help</p></a>
          
         {/*<a style={{ color: "#202020", marginRight: 15, textDecoration: "none" }} href="#"><p>Sell On Takealot</p></a>*/}
        </div>
        {open && (<Paper className="sidebar">
         <p></p>
         <Link style={{ textDecoration: "none", }} to="/orders">
            <p style={{ color: "#202020", marginRight: 15, textDecoration: "none" }} href="/orders">Orders</p>
        </Link>
         
         {login && (
                <>
              <Link className="navName" style={{ textDecoration: "none", }} to="/login"><p style={{ color: "#202020", marginRight: 15 }}>Login</p></Link>
              <Link className="navName" style={{ textDecoration: "none", }} to="/register"><p style={{ color: "#202020", marginRight: 15 }}>Register</p></Link>
             </>
            )}
             {logout && (
     
              <p onClick={() => dispatch(logOut())} style={{ color: "#202020", marginRight: 15 }}>Log Out</p>
              
             )}
        </Paper>)}
        
        <Link to="/">
          <img className="logo2" style={{  }}
            src="https://www.bursariesportal.co.za/sites/default/files/bursaries/takealotLogo%20%281%29.png"
            alt=""
          /></Link>

        <div className="menulinks" style={{   }}>
            {login && (
                <>
              <Link className="navName" style={{ textDecoration: "none", }} to="/login"><p style={{ color: "#202020", marginRight: 15 }}>Login</p></Link>
              <Link className="navName" style={{ textDecoration: "none", }} to="/register"><p style={{ color: "#202020", marginRight: 15 }}>Register</p></Link>
             </>
            )
            }
          <Link className="navName" style={{ textDecoration: "none", }} to="/orders">
            <p style={{ color: "#202020", marginRight: 15, textDecoration: "none" }} href="/orders">Orders</p></Link>
          <a className="navName" style={{ color: "#202020", marginRight: 15, textDecoration: "none" }} href="#"><p>My Account</p></a>

          <Link className="navName" style={{ textDecoration: "none", }} to="/cart">
          <div style={{ padding: 6, color: "#fff",  backgroundColor: "#f4697a", marginRight: 15, display: "flex", alignItems: "center", borderRadius: "50%", height: "auto" }}>
           <Favorite  fontSize="small" />
           </div>
           </Link>
          
          <Link className="cart" style={{ textDecoration: "none", }} to="/cart">
         <div style={{ padding: 5, paddingLeft: 9, paddingRight: 9,  color: "#fff", backgroundColor: "#1c8644",  marginRight: 15, display: "flex", alignItems: "center", borderRadius: 20, height: "auto" }}>
           <ShoppingCart fontSize="small" /><span style={{ color: "#fff", borderColor: "#1c8644", marginLeft: 5,  }}><b>{cart.cartProducts.length}</b></span>
           </div>
         </Link>
        </div>

      </div>
      <div style={{ backgroundColor: "#0b79bf", height: "auto", alignItems: "center"}}>
         {search && (
         <div className="inputContainer" style={{  }}>
     <input className="inputBox" style={{ display: "block" }} type="text" placeholder=" Search for products, brands"/>
      <Search className="search-icon" style={{ display: "block" }} fontSize="small"/>     
      </div>)}
       </div>
       {children}
    </>
  )
}

export default Header
