import CartContext  from "./cart-context"
import { useReducer } from "react";
const defaultCartState = {
    items : [],
    totalAmount : 0
};
const cartReducer = (state,action) =>{
    if(action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount; 
        const existingCartItemIndex  = state.items.findIndex(
            item => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItem;
        let updatedItems;
        if( existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            updatedItem = {...action.item};
            updatedItems = state.items.concat(updatedItem);
        }
        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount,
        };
    }
    if(action.type ===  'REMOVE') {
        console.log('action' + action.id)
        const existingCartItemIndex  = state.items.findIndex(
            item => item.id === action.id
        );
        const exisitingItem = state.items[existingCartItemIndex];
        console.log(exisitingItem)
        const updatedTotalAmount = state.totalAmount - exisitingItem.price;
        let updatedItems;
        if(exisitingItem.amount ===1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
        const updatedItem = {...exisitingItem,amount: exisitingItem.amount -1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
}
const CartProvider = props => {
    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);
    const addItemToCartHandler = item => {
        dispatchCartAction({type : 'ADD',item : item})
    };
    const removeItemFromCartHandler = id => {
        dispatchCartAction({type : 'REMOVE',id : id})
    };
    const cartContext = {
        items: cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemToCartHandler ,
        removeItem :  removeItemFromCartHandler,
    };
    return <CartContext.Provider value  = {cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider