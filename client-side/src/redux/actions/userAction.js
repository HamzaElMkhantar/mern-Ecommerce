import { USER_LOGIN_REQUIST,
         USER_LOGIN_SUCCESS,
         USER_LOGIN_FAIL,
         USER_LOGOUT,
         USER_REGISTER_REQUIST,
         USER_REGISTER_SUCCESS,
         USER_REGISTER_FAIL,   
         USER_DETAILS_FAIL,
         USER_DETAILS_REQUIST,
         USER_DETAILS_SUCCESS,
         USER_UPDATE_PROFILE_REQUIST,
         USER_UPDATE_PROFILE_SUCCESS,
         USER_UPDATE_PROFILE_FAIL} from "../constantsProduct./userConstants";
import axios from 'axios'
import { Action } from "@remix-run/router";

export const login = (password,email) => async (dispatch) => {

    console.log(password,email)
    try{
        dispatch({
            type: USER_LOGIN_REQUIST
        })
        const config = {
            Headers: {
              'Content-Type': 'application/json'
            }
          }
        

        const {data} = await axios.post(`/api/users/login`, 
                        {password, email},
                        config
                        )
                        console.log(data)
        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data
        })

        localStorage.setItem('userInfo' , JSON.stringify(data))
    }catch(error){
        console.log(error)
        dispatch({
            type : USER_LOGIN_FAIL,
            payload : error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message 
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')

    dispatch({
        type: USER_LOGOUT
    })
}

export const register = (name , email , password) => async (dispatch) => {

    try{
        dispatch({
            type: USER_REGISTER_REQUIST,
        })

        const config = {
            Headers:{
                'Content-Type':'application/json'
            },
        }

        const {data} = await axios.post(`/api/users`,
                                {name , email , password} , 
                                config )
        console.log(data)

        dispatch({
            type : USER_REGISTER_SUCCESS,
            payload : data
        })
        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data
        })

        localStorage.setItem('userInfo' , JSON.stringify(data))
    }catch(error){
        console.log(error)
        dispatch({
            type : USER_REGISTER_FAIL,
            payload : error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

export const getUserProfile = (profile) => async (dispatch , getState) => {
    try{

        dispatch({
            type : USER_DETAILS_REQUIST
        })

        const {userLogin : { userInfo }} = getState()

        console.log(userInfo)

        const config = {
            Headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(`/api/users/${profile}` , config)

        console.log(data)

        dispatch({
            type : USER_DETAILS_SUCCESS,
            payload : data 
        })

    }catch(error){
        console.log(error)
        dispatch({
            type : USER_DETAILS_FAIL,
            payload : error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message 
        })
    }
}

export const  updateUserProfile = (user) => async (dispatch , getState) => {
    try{

        dispatch({
            type : USER_UPDATE_PROFILE_REQUIST
        })

        const {userLogin : { userInfo }} = getState()

        console.log(userInfo)

        const config = {
            Headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(`/api/users/profile` , user ,  config)
        dispatch({
            type : USER_UPDATE_PROFILE_SUCCESS,
            payload : data 
        })

    }catch(error){
        console.log(error)
        dispatch({
            type : USER_UPDATE_PROFILE_FAIL,
            payload : error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message 
        })
    }
}