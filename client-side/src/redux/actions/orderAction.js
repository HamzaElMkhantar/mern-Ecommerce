import axios from 'axios'
import { config } from 'dotenv'
import { ORDER_USER_SUCCESS } from '../constants/orderConstants'
import { ORDER_USER_REQUIST } from '../constants/orderConstants'
import { ORDER_USER_FAIL } from '../constants/orderConstants'

import {
    ORDER_CREATE_REQUIST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUIST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUIST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_DELETE_REQUIST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
            } from '../constants/orderConstants'

export const createdOrder = (order) => async (dispatch, getState) => {

    const {userLogin} = getState()
    const userInfo = userLogin.userInfo || JSON.parse(localStorage.getItem('userInfo'))
    
    console.log(order)
    try{
        dispatch({
            type:ORDER_CREATE_REQUIST
        })
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo && userInfo.token}`,
              },
        }

        const {data} = await axios.post(`/api/orders`,order ,config)
        console.log(data)

        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
    }catch(error){
        console.log(error)
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload: error.response 
                        && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }
}

export const getOrderDeatails = (id) => async (dispatch, getState) => {
    try{

        dispatch({
            type:ORDER_DETAILS_REQUIST
        })

        const {userLogin} = getState()
        const userInfo = userLogin.userInfo || JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.get(`/api/orders/${id}` ,config)

        console.log(data)

        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })

    }catch(error){
        console.log(error)
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload: error.response 
                        && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }
}

export const payOrder = (orderId , paymentResults) => async (dispatch, getState) => {
    try{

        dispatch({
            type:ORDER_PAY_REQUIST
        })

        const {userLogin} = getState()
        const userInfo = userLogin.userInfo || JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
              },
        }

        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResults , config)

        console.log(data)

        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })

    }catch(error){
        console.log(error)
        dispatch({
            type:ORDER_PAY_FAIL,
            payload: error.response 
                        && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }
}

export const getUserOrder = (id) => async (dispatch, getState) => {

    try{

        dispatch({
            type:ORDER_USER_REQUIST
        })

        const {userLogin} = getState()
        const userInfo = userLogin.userInfo || JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
              },
        }

        const {data} = await axios.get(`/api/orders/userorder/${id}`, config)

        console.log(data)

        dispatch({
            type:ORDER_USER_SUCCESS,
            payload:data
        })

    }catch(error){
        console.log(error)
        dispatch({
            type:ORDER_USER_FAIL,
            payload: error.response 
                        && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }
}

export const deleteOrderProfile = (id) => async (dispatch , getState) => {

    console.log(id)
    
    try{
        
        dispatch({
            type : ORDER_DELETE_REQUIST
        })
        
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
                        ? JSON.parse(localStorage.getItem('userInfo'))
                        : null

        const  config = {
            headers : {
                Authorization : `Bearer ${userInfo && userInfo._id}`
            }
        }

        const {data} = await axios.delete('/api/orders/deleteorder' , id , config)

        console.log(data)

        dispatch({
            type:ORDER_DELETE_SUCCESS,
            payload : data
        })
    }catch(error){
        console.log(error)
        dispatch({
            type:ORDER_USER_FAIL,
            payload: error.response 
                        && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }

}