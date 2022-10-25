import CartIcon from "../Cart/CardIcon";
import classes from './HeaderCardButton.module.css';
import {useContext, useEffect, useState} from 'react' ;
import CartContext from "../../store/cart-context";
const HeaderCardButton = props => {
    const [buttonIsHighlighed ,setbuttonIsHighlighed] = useState(false)
    const cartctx = useContext(CartContext)
    const numberOfCartItems = cartctx.items.reduce((number,item) => {return number + item.amount},0);
    const btnClasses =     `${classes.button} ${buttonIsHighlighed &&classes.bump}`;
    useEffect(()=>{
    if(cartctx.items.length == 0){
    return;}
     setbuttonIsHighlighed(true)
     const timer = setTimeout(()=>{
        setbuttonIsHighlighed(false)
    },300)
    return ()=>{
        clearTimeout(timer)
    }
    },[cartctx.items])
    return <button className = {btnClasses} onClick = {props.onClick}>
        <span className = {classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className = {classes.badge}>{numberOfCartItems}</span>
    </button>
}
export default HeaderCardButton;