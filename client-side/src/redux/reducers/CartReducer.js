import { CART_ADD_ITEM , 
          CART_REMOVE_ITEM,
          CART_SAVE_PAYEMENT_METHOD,
          CART_SAVE_SHIPPIN_ADDRESS } from "../constants/coonstantCart";

export const cartReducer = (state = { cartItems : [] , shippingAddress: {} } , action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find((x) => x.project === item.project)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                    x.product !== existItem.product ? item : x) 
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM : 
        console.timeLog(action.payload)
        return{...state , 
                cartItems : state.cartItems.filter( x => x.project !== action.payload)
        }
        case CART_SAVE_SHIPPIN_ADDRESS : 
        return{
            ...state,
            shippingAddress :  action.payload,
        }
        case CART_SAVE_PAYEMENT_METHOD : 
        return{
            ...state,
            payementMethod :  action.payload ,
        }

        default :
            return state
    }
}