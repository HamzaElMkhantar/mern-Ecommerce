import axios from 'axios'

import {
    ORDER_CREATE_REQUIST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUIST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
            } from '../constantsProduct./orderConstants'

export const createdOrder = (order) => async (dispatch, getState) => {
    console.log(order)
    try{
        dispatch({
            type:ORDER_CREATE_REQUIST
        })
        const {userLogin} = getState()
        const userInfo = userLogin.userInfo || JSON.parse(localStorage.getItem('userInfo'))
        console.log(userInfo)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo && userInfo.token}`,
              },
        }

        const {data} = await axios.post(`/api/orders`,order ,config)

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

        const {data} = await axios.get(`/api/orders/&{id}` ,config)

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