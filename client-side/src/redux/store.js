import {createStore , applyMiddleware , combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer , productDETAILSReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/CartReducer';

const reducer = combineReducers({
  productList : productListReducer , 
  productDetails : productDETAILSReducer ,
  cart : cartReducer
}) ;

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
                                ? JSON.parse(localStorage.getItem('cartItems'))
                                : []

const initialState = {
  cart : { cartItems : cartItemsFromLocalStorage }
} ;

const middleware = [thunk] ;


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  
  export default store