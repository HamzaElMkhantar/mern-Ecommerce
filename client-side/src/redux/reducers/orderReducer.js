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
    ORDER_PAY_RESET,
    ORDER_USER_REQUIST,
    ORDER_USER_SUCCESS,
    ORDER_USER_FAIL,
    ORDER_DELETE_REQUIST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
            } from '../constants/orderConstants'

export const orderCreateReducer = (state = {} , action) => {
    switch(action.type){
        case ORDER_CREATE_REQUIST : 
            return {loading : true}
        case ORDER_CREATE_SUCCESS : 
            return {loading : false , 
                    succes: true , 
                    order : action.payload}
        case ORDER_CREATE_FAIL : 
            return {loading : false ,
                    error : action.payload}

        default:
            return state
    }
}

export const orderDetailsReducer = (state = { loading : true , orderItem : []  , shippingAddress : {}} , action) => {
    switch(action.type){

        case ORDER_DETAILS_REQUIST : 
            return {
                ...state,
                loading : true}

        case ORDER_DETAILS_SUCCESS : 
            return {
                    ...state,
                    loading : false , 
                    order : action.payload}

        case ORDER_DETAILS_FAIL : 
            return {
                    ...state,
                    loading : false ,
                    error : action.payload}

        default:
            return state
    }

}

export const orderPayReducer = (state = {} , action) => {
    switch(action.type){

        case ORDER_PAY_REQUIST : 
            return {
                loading : true}

        case ORDER_PAY_SUCCESS : 
            return {
                    loading : false , 
                    succes : true}

        case ORDER_PAY_FAIL : 
            return {
                    loading : false ,
                    error : action.payload}
        case ORDER_PAY_RESET : 
            return {}

        default:
            return state
    }

}

export const userOrderReducer = (state = { userOrder : []  } , action) => {

    switch(action.type){
        case ORDER_USER_REQUIST : 
            return {
                ...state,
                loading : true}

        case ORDER_USER_SUCCESS : 
            return {
                    loading : false , 
                    succes : true,
                    userOrder : action.payload }

        case ORDER_USER_FAIL : 
            return {
                    ...state,
                    loading : false ,
                    error : action.payload}

        default:
            return state
    }
}

export const deleteOrderReducer = (state = { } , action) => {

    switch(action.type){
        case ORDER_DELETE_REQUIST : 
            return {
                ...state,
                loading : true}

        case ORDER_DELETE_SUCCESS : 
            return {
                    loading : false , 
                    succes : true,
                    userOrder : action.payload }

        case ORDER_DELETE_FAIL : 
            return {
                    ...state,
                    loading : false ,
                    error : action.payload}

        default:
            return state
    }
}