import Header from "./Components/Layout/Header";
import {Fragment, useState} from 'react';
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [cardIsShow, setcardIsShow] = useState(false)
  const showCartHandler = () => {
    setcardIsShow(true)
  }
  const hideCartHandler = () => {
    setcardIsShow(false)
  }
  return (
     <CartProvider>
      {cardIsShow && <Cart onClose ={hideCartHandler}/> }
      <Header onShowCart = {showCartHandler}/>
      <main>
        <Meals />
      </main>
      </CartProvider>
  );
}

export default App;
