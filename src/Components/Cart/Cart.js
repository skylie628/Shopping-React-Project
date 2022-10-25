
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import {useContext} from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
const Cart = props => {
    const cartctx = useContext(CartContext)
    const totalAmount = `${cartctx.totalAmount.toFixed(2)}`;
    const cartItemAddHandler = (item)=>{
        cartctx.addItem(item)
    };
    const cartItemRemoveHandler = (id) => {
        cartctx.removeItem(id)
    };
    const cartItems =(
        <ul className = {classes['cart-items']}>
        {cartctx.items.map(item => <CartItem key ={item.id} name = {item.name} amount = {item.amount} price = {item.price} onRemove = {cartItemRemoveHandler.bind(null,item.id)} onAdd = {cartItemAddHandler.bind(null,item)}/>)}
        </ul> 
        )

    const hasItem = cartctx.items.length > 0;
    return (<Modal onClose = {props.onClose}>
        {cartItems}
        <div  className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--all']} onClick = {props.onClose}>Close </button>
            {hasItem &&<button className={classes.button}>Order</button>}
        </div>
    </Modal>);
} ;
export default Cart;