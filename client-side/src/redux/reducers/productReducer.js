import { PRODUCT_LIST_FAIL , 
         PRODUCT_LIST_SUCCESS , 
         PRODUCT_LIST_REQUIST ,
         PRODUCT_DETAILS_FAIL , 
         PRODUCT_DETAILS_SUCCESS , 
         PRODUCT_DETAILS_REQUIST ,
     } from "../constantsProduct./constantsProduct.";

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