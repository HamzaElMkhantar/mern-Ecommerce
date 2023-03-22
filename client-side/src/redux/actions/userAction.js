import { USER_LOGIN_REQUIST,
         USER_LOGIN_SUCCESS,
         USER_LOGIN_FAIL,
         USER_LOGOUT   } from "../constantsProduct./userConstants";
import axios from 'axios'

export const login = (password,email) => async (dispatch) => {

    console.log(password,email)
    const config = {
        Headers: {
          'Content-Type': 'application/json'
        }
      }
    try{
        dispatch({
            type: USER_LOGIN_REQUIST
        })
        

        const {data} = await axios.post(`/api/users/login`, 
                        {password, email},
                        config
                        )

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