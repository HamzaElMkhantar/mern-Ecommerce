import axios from 'axios' ;
import { PRODUCT_LIST_FAIL ,  
          PRODUCT_LIST_SUCCESS , 
          PRODUCT_LIST_REQUIST ,
          PRODUCT_DETAILS_FAIL ,  
          PRODUCT_DETAILS_SUCCESS , 
          PRODUCT_DETAILS_REQUIST, 
          PRODUCT_ADD_REQUIST,
          PRODUCT_ADD_FAIL,
          PRODUCT_ADD_SUCCESS,
          PRODUCT_USER_REQUIST,
          PRODUCT_USER_SUCCESS,
          PRODUCT_USER_FAIL,
          PRODUCT_DELETE_REQUIST,
          PRODUCT_DELETE_SUCCESS,
          PRODUCT_DELETE_FAIL,
          PRODUCT_UPDATE_REQUIST,
          PRODUCT_UPDATE_SUCCESS,
          PRODUCT_UPDATE_FAIL,
      } from '../constantsProduct./constantsProduct.' ;

export const listProducts = () => async (dispatch) => {
    try{
        dispatch({type : PRODUCT_LIST_REQUIST})

        const {data} = await axios.get('/api/products')
        dispatch({
            type: PRODUCT_LIST_SUCCESS ,
            payload: data
        })
    }catch(error){
        dispatch({
            type : PRODUCT_LIST_FAIL ,
            payload: error.response 
                        && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }
}

export const listProductsDetails = (id) => async (dispatch) => {
    try{
        dispatch({type : PRODUCT_DETAILS_REQUIST})

        const {data} = await axios.get(`/api/products/${id}`)
        
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS ,
            payload: data
        })
    }catch(error){
        dispatch({
            type : PRODUCT_DETAILS_FAIL ,
            payload: error.response 
                        && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }
}


export const addProduct = (product) => async dispatch => {
    try{
        dispatch({type: PRODUCT_ADD_REQUIST})

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
              },
        }

        const {data} = await axios.post(`/api/products/addproduct`, product )
        console.log(data)
        dispatch({
            type: PRODUCT_ADD_SUCCESS ,
            payload: data
        })

    }catch(error){
        dispatch({
            type : PRODUCT_ADD_FAIL ,
            payload: error.response 
                        && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }
} 

export const getUserProduct = (id) => async dispatch => {
    try{
        dispatch({type : PRODUCT_USER_REQUIST})

        const {data} = await axios.get(`/api/products/userproduct/${id}`)

        dispatch({
            type : PRODUCT_USER_SUCCESS ,
            payload : data
        })
    }catch(error){
        console.log(error)
        dispatch({
            type : PRODUCT_USER_FAIL ,
            payload: error.response 
                        && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }
}

export const deleteProductUser = (id) => async dispatch => {
    try{
        console.log(id)

        dispatch({type:PRODUCT_DELETE_REQUIST})

        const {data} = await axios.delete(`/api/products/deleteproduct/${id}`)

        dispatch({
                    type : PRODUCT_DELETE_SUCCESS ,
                    payload : data
                })

    }catch(error){
        console.log(error)
        dispatch({
            type : PRODUCT_DELETE_FAIL ,
            payload: error.response 
                        && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }
}

export const updateProducts = (product , prodcutId) => async dispatch => {
    console.log(prodcutId)
    try{
        dispatch({type:PRODUCT_UPDATE_REQUIST})
        
        const {data} = await axios.put(`/api/products/updateproduct/${prodcutId}` , product)

        dispatch({
            type:PRODUCT_UPDATE_SUCCESS , 
            payload : data
        })
    }catch(error){
        console.log(error)
        dispatch({
            type : PRODUCT_UPDATE_FAIL ,
            payload: error.response 
                        && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }
}