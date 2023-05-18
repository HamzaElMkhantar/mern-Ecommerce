import { PRODUCT_LIST_FAIL , 
         PRODUCT_LIST_SUCCESS , 
         PRODUCT_LIST_REQUIST ,
         PRODUCT_DETAILS_FAIL , 
         PRODUCT_DETAILS_SUCCESS , 
         PRODUCT_DETAILS_REQUIST, 
         PRODUCT_ADD_REQUIST,
         PRODUCT_ADD_SUCCESS,
         PRODUCT_ADD_FAIL,
         PRODUCT_USER_REQUIST,
         PRODUCT_USER_SUCCESS,
         PRODUCT_USER_FAIL,
         PRODUCT_DELETE_REQUIST,
         PRODUCT_DELETE_SUCCESS,
         PRODUCT_DELETE_FAIL,
         PRODUCT_UPDATE_REQUIST,
         PRODUCT_UPDATE_SUCCESS,
         PRODUCT_UPDATE_FAIL,
     } from "../constants/constantsProduct.js";

export const productListReducer = (state = {products : []} , action) => {

    switch(action.type){
        case PRODUCT_LIST_REQUIST :
            return {loading : true , products : []}
        case PRODUCT_LIST_SUCCESS :
            return {loading : false , products : action.payload}
            case PRODUCT_LIST_FAIL :
        return {loading : false , error : action.payload}
        default : 
            return state
    }
}

export const productDETAILSReducer = (state = {product : {reviews : []} } , action) => {

    switch(action.type){
        case PRODUCT_DETAILS_REQUIST :
            return {loading : true , ...state}
        case PRODUCT_DETAILS_SUCCESS :
            return {loading : false , product : action.payload}
            case PRODUCT_DETAILS_FAIL :
        return {loading : false , error : action.payload}
        default : 
            return state
    }
}


export const addProductsReducer = ( state = { } , action ) => {

    switch(action.type){
        case PRODUCT_ADD_REQUIST :
            return {loading : true ,  success : false , ...state}
        case PRODUCT_ADD_SUCCESS :
            return {loading : false , newProduct : action.payload , success : true}
            case PRODUCT_ADD_FAIL :
        return {loading : false ,  error : action.payload , success : false}
        default : 
            return state
    }
}

export const getUserProductsReducer = (state = {} , action) => {
    switch(action.type){
        case PRODUCT_USER_REQUIST :
            return {loading : true ,  success : false , ...state}
        case PRODUCT_USER_SUCCESS :
            return {loading : false , userProducts : action.payload , success : true}
            case PRODUCT_USER_FAIL :
        return {loading : false ,  error : action.payload , success : false}
        default : 
            return state
    }
}

export const deleteProductReducer = (state = {} , action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUIST :
            return {loading : true ,  success : false , ...state}
        case PRODUCT_DELETE_SUCCESS :
            return {loading : false , userProducts : action.payload , success : true}
            case PRODUCT_DELETE_FAIL :
        return {loading : false ,  error : action.payload , success : false}
        default : 
            return state
    
    }
}

export const updateproductsReducer =  ( state = { } , action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUIST :
            return {loading : true ,  success : false , ...state}
        case PRODUCT_UPDATE_SUCCESS :
           
            return {loading : false , updatedProduct : action.payload , success : true}
            case PRODUCT_UPDATE_FAIL :
        return {loading : false ,  error : action.payload , success : false}
        default : 
            return state
    
    }
}