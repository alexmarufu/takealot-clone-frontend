import { Paper } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline, Delete, Favorite, FavoriteSharp } from '@material-ui/icons'
import React, { useState } from "react"

import "../styles.css"


function Item({ name, price, img, quantity, increaseQuantity, decreaseQuantity, removeItem }) {

  const [ newQuantity, setNewQuantity ] = useState(quantity);

  const increaseQty = () => {
    setNewQuantity(qty => qty + 1);
    increaseQuantity();
}


const decreaseQty = () => {
    if(newQuantity <= 1) {
       return
    } else {
        setNewQuantity(qty => qty - 1);
        decreaseQuantity();
    }
   
}

  
  return (
     <>
       <Paper className="border" style={{ }}>
             <div className="border2" style={{  }}>
                  <img style={{width: 100, height: 120}} src={img} alt=""/>
                 
                 <p className="para" style={{ color: "#474747", }}>{name}</p>
                  <div className="mobiletab" style={{ }}>
                  <p style={{ color: "#474747", width: 150 }}>{name}</p>
                  <h4 style={{ color: "#474747"}}>R {price}</h4>
                  <div style={{display: "flex", alignItems: "center",  marginRight: 50, }}>
                  <span style={{  marginRight: 5  }} onClick={decreaseQty}>
                    <RemoveCircleOutline size="small"/>
                    </span>
                  <span style={{ fontWeight: "bold"  }} >{newQuantity}</span>
                  <span style={{ marginLeft: 5 }} onClick={increaseQty}>
                  <AddCircleOutline size="small" />
                  </span>
                  <span style={{ marginLeft: 20 }} onClick={removeItem}>
                  <Delete size="small" />
                  </span>
                  <span style={{ marginLeft: 8 }} onClick={() => console("added")}>
                  <Favorite size="small" />
                  </span>
                  </div>    
                              
                  </div>

                  </div>
                  <div className="bigview" style={{ flexDirection:"column", }}>
                  <h4 style={{ color: "#474747", textAlign: "end"}}>R {price}</h4>
                
                  <div style={{display: "flex", alignItems: "center",  marginRight: 50, textAlign: "center" }}>
                  <span style={{  marginRight: 5  }} onClick={decreaseQty}>
                    <RemoveCircleOutline size="small"/>
                    </span>
                  <span style={{ fontWeight: "bold"  }} >{newQuantity}</span>
                  <span style={{ marginLeft: 5 }} onClick={increaseQty}>
                  <AddCircleOutline size="small" />
                  </span>
                  </div>
                  <div style={{display: "flex", alignItems: "center", }}>
                  <div style={{ display: "flex", alignItems: "center", marginRight: 10 }}>
                  <p onClick={removeItem} >
                  <Delete size="small" />
                  </p>
                  <p style={{  marginLeft: 5  }} > Remove</p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", marginRight: 10 }}>
                  <p onClick={removeItem} >
                  <Favorite size="small" />
                  </p>
                  <p style={{  marginLeft: 5  }} >Wishlist</p>
                  </div>
                 
                  </div>
                  </div>
   </Paper>
     </>
  )
}

export default Item
