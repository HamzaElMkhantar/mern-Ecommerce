import axios from "axios";
import { 
        CART_ADD_ITEM , 
        CART_REMOVE_ITEM,
        CART_SAVE_PAYEMENT_METHOD,
        CART_SAVE_SHIPPIN_ADDRESS } from "../constants/coonstantCart";

export const addToCart = (id , qty) => async (dispatch , getState) => {

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type : CART_ADD_ITEM ,
        payload : {
            project : data._id,
            name : data.name,
            image : data.image,
            Price : data.price,
            qty
        }
    })



    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
} 

export const removeFromCart = (id) => (dispatch , getState) => {
     
    dispatch({
        type : CART_REMOVE_ITEM ,
        payload : id
    })

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
} 

export const saveShippinAddress = (data) => (dispatch) =>  {
    dispatch({
        type : CART_SAVE_SHIPPIN_ADDRESS ,
        payload : data
    })

    localStorage.setItem('shippinAddress' , JSON.stringify(data) )
}

export const savePayementMethod = (payementMethod) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYEMENT_METHOD ,
        payload : payementMethod
    })

    localStorage.setItem('payementMethod' , JSON.stringify(payementMethod))
}