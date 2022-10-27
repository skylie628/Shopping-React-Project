import classes from './Checkout.module.css';
import { useRef, useState } from 'react';
const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;
const Checkout = (props) => {
const [formValidity,setFormValidity] = useState ({
    name : true,
    street: true,
    city: true,
    postal : true,
}) 

const nameInputRef = useRef();
const streetInputRef = useRef();
const postalInputRef = useRef();
const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    
    setFormValidity({
        name: enteredNameIsValid,
        city: enteredCityIsValid,
        street: enteredStreetIsValid,
        postal: enteredPostalIsValid
    })
    const formIsValid = enteredNameIsValid && enteredPostalIsValid && enteredCityIsValid && enteredStreetIsValid;
    if (!formIsValid){
        return
    }
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal : enteredPostal,
        city: enteredCity
    });
};
const nameControlClasses = `${classes.control} ${formValidity.name ? ' ' : classes.invalid}`;
const streetControlClasses = `${classes.control} ${formValidity.street ? ' ' : classes.invalid}`;
const postalControlClasses = `${classes.control} ${formValidity.postal ? ' ' : classes.invalid}`;
const cityControlClasses = `${classes.control} ${formValidity.city ? ' ' : classes.invalid}`; 
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref ={nameInputRef}/>
        {!formValidity.name && <p>Please input name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref = {streetInputRef}/>
        {!formValidity.street && <p>Please input street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref ={postalInputRef}/>
        {!formValidity.postal && <p>Please input right format of postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city'  ref = {cityInputRef}/>
        {!formValidity.city && <p>Please input city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;