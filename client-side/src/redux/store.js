import {createStore , applyMiddleware , combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer , 
         productDETAILSReducer, 
         addProductsReducer,
         getUserProductsReducer,
         deleteProductReducer,
         updateproductsReducer
        } from './reducers/productReducer';
import {  cartReducer } from './reducers/CartReducer';
import {  userLoginReducer , 
          userRegisterReducer , 
          userDetailsReducer , 
          userUpdateProfileReducer 
        } from './reducers/userLoginReducer';
import {  orderCreateReducer , 
          orderDetailsReducer , 
          orderPayReducer ,
          userOrderReducer,
          deleteOrderReducer
        } from './reducers/orderReducer';

const reducer = combineReducers({
  productList : productListReducer , 
  productDetails : productDETAILSReducer ,
  cart : cartReducer,
  userLogin : userLoginReducer ,
  userRegister : userRegisterReducer,
  userDetaills : userDetailsReducer,
  userUpdateProfile : userUpdateProfileReducer,
  orderCreate : orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay : orderPayReducer,
  userOrder : userOrderReducer,
  deleteOrder : deleteOrderReducer,
  addProducts: addProductsReducer , 
  getUserProducts : getUserProductsReducer,
  deleteProduct : deleteProductReducer ,
  updateproducts : updateproductsReducer
}) ;

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
                                ? JSON.parse(localStorage.getItem('cartItems'))
                                : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
                                ? JSON.parse(localStorage.getItem('userInfo'))
                                : null

const shippinAddressFromLocalStorage = localStorage.getItem('shippinAddress')
                                ? JSON.parse(localStorage.getItem('shippinAddress'))
                                : {}

const initialState = {
  cart : { cartItems : cartItemsFromLocalStorage , shippinAddress : shippinAddressFromLocalStorage} ,
  userInfo : {userInfo : userInfoFromLocalStorage}
} ;

const middleware = [thunk] ;


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  
  export default store