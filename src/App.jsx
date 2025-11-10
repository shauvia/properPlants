import { useState } from "react";
import PLANTS from "./data";
import Plants from "./plants/plants";
import Cart from "./cart/cart";

export default function App() {
  const [flowers] = useState(PLANTS);
  const [cart, setCart] = useState([]);

  function handleOnAddToCart(purchasedItem) {
    let newCart = [...cart];
    let found = newCart.find((item) => item === purchasedItem);
    if (!found) {
      purchasedItem.quantity = 1;
      newCart.push(purchasedItem);
    } else {
      newCart.forEach((item) => {
        if (item.id === purchasedItem.id) {
          item.quantity += 1;
        }
      });
    }

    setCart(newCart);
  }

  function handleOnRemoveFromCart(purchasedItem) {
    let newCart = [...cart];
    console.log("newCart", newCart);
    let filteredCart;
    let filteredItem = newCart.filter((item) => item.id === purchasedItem.id);
    if (filteredItem[0].quantity > 1) {
      newCart.forEach((item) => {
        if (item.id === purchasedItem.id) {
          item.quantity -= 1;
        }
      });
      setCart(newCart);
    } else {
      filteredCart = newCart.filter((item) => item.id !== purchasedItem.id);
      setCart(filteredCart);
    }
  }

  return (
    <>
      <header>
        <h1>Proper Plants</h1>
      </header>
      <main>
        <Plants flowers={flowers} onAddToCart={handleOnAddToCart} />
        <Cart
          onAddToCart={handleOnAddToCart}
          onRemoveFromCart={handleOnRemoveFromCart}
          cart={cart}
        />
        ;
      </main>
    </>
  );
}
