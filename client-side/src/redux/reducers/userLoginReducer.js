import {USER_LOGIN_REQUIST,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAIL,
        USER_LOGOUT ,
        USER_REGISTER_REQUIST,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAIL, 
        USER_DETAILS_FAIL,
        USER_DETAILS_REQUIST,
        USER_DETAILS_SUCCESS,
        USER_UPDATE_PROFILE_REQUIST,
        USER_UPDATE_PROFILE_SUCCESS,
        USER_UPDATE_PROFILE_FAIL} from '../constants/userConstants'

export const userLoginReducer = (state = { } , action) => {
    switch(action.type){
        case USER_LOGIN_REQUIST:
            return { loading :  true }
        case USER_LOGIN_SUCCESS:
            return { loading :  false , userInfo :  action.payload }
        case USER_LOGIN_FAIL:
            return { loading :  false , error :  action.payload }
        case USER_LOGOUT:
            return { }
        
        default : 
            return state
        
    }
}

export const userRegisterReducer = ( state = {} , action) => {
    switch(action.type){
        case USER_REGISTER_REQUIST:
            return { loading :  true }
        case USER_REGISTER_SUCCESS:
            return { loading :  false , userInfo :  action.payload }
        case USER_REGISTER_FAIL:
            return { loading :  false , error :  action.payload }
        default : 
            return state
    }
}

export const userDetailsReducer = ( state = { user : {} } , action) => {
    switch(action.type){
        case USER_DETAILS_REQUIST:
            return { loading :  true , ...state}
        case USER_DETAILS_SUCCESS:
            return { loading :  false , user :  action.payload }
        case USER_DETAILS_FAIL:
            return { loading :  false , error :  action.payload }
        default : 
            return state
    }
}

export const userUpdateProfileReducer = ( state = { } , action) => {
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUIST:
            return { loading :  true , success : false  }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading :  false , userInfo :  action.payload , success : true }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading :  false , error :  action.payload , success : false  }
        default : 
            return state
    }
}