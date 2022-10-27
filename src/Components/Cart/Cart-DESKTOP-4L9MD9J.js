
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import {useContext, useState} from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
const Cart = props => {
    const cartctx = useContext(CartContext);
    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false)
    const totalAmount = `${cartctx.totalAmount.toFixed(2)}`;
    const cartItemAddHandler = (item)=>{
        cartctx.addItem(item);
    };
    const cartItemRemoveHandler = (id) => {
        cartctx.removeItem(id);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };
    const confirmHandler = async (ConfirmData) => {
        setIsSubmitting(true)
        await fetch('https://react-pratice-610f2-default-rtdb.firebaseio.com/orders.json',{
            method: "POST",
            body: JSON.stringify({
                user: ConfirmData,
                orderedItems: cartctx.items,
            }) 
        }) ;
        setIsSubmitting(false)
        setDidSubmit(true)

        console.log('post done');
    }
    const cartItems =(
        <ul className = {classes['cart-items']}>
        {cartctx.items.map(item => <CartItem key ={item.id} name = {item.name} amount = {item.amount} price = {item.price} onRemove = {cartItemRemoveHandler.bind(null,item.id)} onAdd = {cartItemAddHandler.bind(null,item)}/>)}
        </ul> 
        )
    const hasItem = cartctx.items.length > 0;
    const ModalAction = <div className={classes.actions}>
            <button className={classes['button--all']} onClick = {props.onClose}>Close </button>
            { hasItem &&<button className={classes.button} onClick = {orderHandler}>Order</button>}
        </div>
        
    const cartModalContent = <React.Fragment>
        {cartItems}
        <div  className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCancel = {props.onClose} onConfirm = {confirmHandler} />}
        {!isCheckout && ModalAction}
    </React.Fragment>
    const isSubmittingModalContent = <p>Sending order data ....</p>
    
    const didSubmitModalContent = <Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick = {props.onClose}>Close </button>
        </div>
        </Fragment>
    return (<Modal onClose = {props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent } 
    </Modal>);
} ;
export default Cart;