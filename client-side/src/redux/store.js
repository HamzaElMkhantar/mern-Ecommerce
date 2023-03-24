import {createStore , applyMiddleware , combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer , productDETAILSReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/CartReducer';
import { userLoginReducer , userRegisterReducer , userDetailsReducer , userUpdateProfileReducer } from './reducers/userLoginReducer';

const reducer = combineReducers({
  productList : productListReducer , 
  productDetails : productDETAILSReducer ,
  cart : cartReducer,
  userLogin : userLoginReducer ,
  userRegister : userRegisterReducer,
  userDetaills : userDetailsReducer,
  userUpdateProfile : userUpdateProfileReducer
  
}) ;

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
                                ? JSON.parse(localStorage.getItem('cartItems'))
                                : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
                                ? JSON.parse(localStorage.getItem('userInfo'))
                                : []

const initialState = {
  cart : { cartItems : cartItemsFromLocalStorage } ,
  userInfo : {userInfo : userInfoFromLocalStorage}
} ;

const middleware = [thunk] ;


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  
  export default store