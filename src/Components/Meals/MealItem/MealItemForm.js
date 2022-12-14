import { useRef ,useState} from 'react';
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
const MealItemForm = props => {
    const [amoutIsValid,setAmountIsValid] = useState(true)
    const amountInputRef = useRef()
    const submitHandler = event => {
    event.preventDefault();
    const enterAmount = amountInputRef.current.value;
    const enterAmountNumber = +enterAmount;
    if(enterAmount.trim().length === 0 || enterAmountNumber < 1 || enterAmountNumber > 5){
        setAmountIsValid(false);
        return;
    };
    props.onAddToCart(enterAmountNumber);
};
    return <form className={classes.form} onSubmit ={submitHandler}>
        <Input
            ref = {amountInputRef}
            label = "Amount"  input={{
            id : 'amount'+ props.id,
            type : 'number',
            min : '1',
            max : '5',
            step: '1',
            defaultValue :1,
        }}/>
        <button>+ Add</button>
        {!amoutIsValid && <p>Please enter valid amount</p>}
    </form>
};

export default MealItemForm;