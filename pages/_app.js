import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useState } from 'react';


function MyApp({ Component, pageProps }) {

  
const [cart, setCart] = useState({})
const [subTotal, setSubTotal] = useState(0)

useEffect(() => {
  console.log("hey i am nandan useeffect fromj app.js")
  try
  {
    if(localStorage.getItem("cart"))
  {
    setCart(JSON.parse(localStorage.getItem("cart")))
  }
}
  catch(error){
    console.error(error)
    localStorage.clear()
    
  }
}, [])


const saveCart=(myCart)=>{
  localStorage.setItem("cart",JSON.stringify(myCart))
  let subt=0
  let keys=Object.keys(myCart)
  for(let i=0; i<keys.length;i++)
  {
    //console.log(keys)
    subt+=myCart[keys[i]].price * myCart[keys[i]].qty;
  }
  setSubTotal(subt)
}

const addToCart= (itemCode,qty,price,name,author) => {
  let newCart=cart
  if(itemCode in cart){
    newCart[itemCode].qty=newCart[itemCode].qty + qty;
  }
  else{
    newCart[itemCode]={qty:1,price,name,author}
  }
  setCart(newCart)
  //console.log(newCart)
  saveCart(newCart)

}

const removeFromCart= (itemCode,qty,price,name,author) => {
  let newCart=JSON.parse(JSON.stringify(cart))
  if(itemCode in cart){
    newCart[itemCode].qty=newCart[itemCode].qty - qty;
  }
  if(newCart[itemCode].qty<=0)
  {
    delete newCart[itemCode]
  }
  setCart(newCart)
  saveCart(newCart)

}


const clearCart =()=>{
  setCart({})
  saveCart({})
}


  return (
    <>
      <NavBar cart={cart} addToCart={addToCart}  removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
