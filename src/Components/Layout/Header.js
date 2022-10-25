import { Fragment } from "react";
import mealsImg from '../../assets/meal.jpg'
import classes from './Header.module.css'
import HeaderCardButton from "./HeaderCardButton";

const Header = props => {
    return <Fragment>
    <header className={classes.header}>
    <h1>ReactMeals</h1>
    <HeaderCardButton onClick = {props.onShowCart} />
    </header>
    <div className={classes['main-image']}>
    <img src = {mealsImg} alt = 'delicous chicken fried' />
    </div>
    </Fragment>
}

export default Header;