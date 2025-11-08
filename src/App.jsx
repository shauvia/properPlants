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
  // const [chosenFlower, setChosenFlower] = useState({});
  return (
    <section className="plant">
      <h2>Plants</h2>
      <ul>
        {flowers.map((flower) => (
          <PlantDetails
            key={flower.id}
            onAddToCart={onAddToCart}
            // onClick={() => setChosenFlower(flower)}
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
        <span>{1}</span>
        <button onClick={() => onAddToCart(plant)}>+</button>
      </div>
    </li>
  );
}

export default function App() {
  const [flowers] = useState(PLANTS);
  const [cart, setCart] = useState([]);
  // const { purchase, setPurchase } = useState({
  //   id: -100,
  //   quantity: 0,
  //   image: "",
  //   name: "",
  // });

  function handleOnAddToCart(purchasedItem) {
    let newCart = [...cart];
    newCart.push(purchasedItem);
    setCart(newCart);
  }

  function handleOnRemoveFromCart(purchasedItem) {
    let newCart = [...cart];
    let filteredCart = newCart.filter((item) => item.id !== purchasedItem.id);
    setCart(filteredCart);
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
