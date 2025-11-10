import { useState } from "react";
import PLANTS from "./data";

function PlantDetails({ weed, onAddToCart }) {
  return (
    <>
      <li className="plant">
        <figure>{weed.image}</figure>
        <h3>{weed.name}</h3>
        <button onClick={() => onAddToCart(weed)}>Add to cart</button>
      </li>
    </>
  );
}

function Plants({ flowers, onAddToCart }) {
  return (
    <section className="plants">
      <h2>Plants</h2>
      <ul>
        {flowers.map((flower) => (
          <PlantDetails
            key={flower.id}
            onAddToCart={onAddToCart}
            weed={flower}
          />
        ))}
      </ul>
    </section>
  );
}

function Cart({ onAddToCart, onRemoveFromCart, cart }) {
  if (!cart) {
    return <p>Cart is empty</p>;
  }

  return (
    <section className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <CartItem
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
            plant={item}
            key={item.id}
          />
        ))}
      </ul>
    </section>
  );
}

function CartItem({ plant, onRemoveFromCart, onAddToCart }) {
  return (
    <li className="cartItem">
      <div>
        {plant.image}
        {plant.name}
      </div>
      <div className="cartItemQuantity">
        <button onClick={() => onRemoveFromCart(plant)}>-</button>
        <span>{plant.quantity}</span>
        <button onClick={() => onAddToCart(plant)}>+</button>
      </div>
    </li>
  );
}

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
