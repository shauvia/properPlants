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
    if (newCart.length === 0) {
      purchasedItem.quantity = 1;
      newCart.push(purchasedItem);
    } else {
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
    }
    setCart(newCart);

    // newCart.forEach((item) => {
    //   console.log("item94", item);
    //   if (item.id === purchasedItem.id) {
    //     console.log("item101", item);
    //     item.quantity += 1;
    //     console.log("item103", item);
    //   } else {
    //     purchasedItem.quantity = 1;
    //     console.log("purchasedIte97", purchasedItem);
    //     newCart.push(purchasedItem);
    //     console.log("newCart99", newCart);
    //   }
    // });

    // for (let plant of newCart) {
    //   if ()
    //   if (plant.id === purchasedItem.id) {
    //     plant.quantity += 1;

    //   }
    // }
    // purchasedItem.quantity = 1;
    // newCart.push(purchasedItem);
    // setCart(newCart);
  }

  function handleOnRemoveFromCart(purchasedItem) {
    let newCart = [...cart];
    console.log("newCart", newCart);
    let filteredCart;
    let filteredItem = newCart.filter((item) => item.id === purchasedItem.id);
    // console.log(
    //   "filteredItem",
    //   filteredItem,
    //   "filteredItem[0].quantity",
    //   filteredItem[0].quantity
    // );
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

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Puppies</h1>
    <main>
    <section>
    <PlayersList></PlayersList>
    </section>
    <section id="selected">
    <h2>Puppy Details</h2>
    <PuppyDetails></PuppyDetails>
    </section>
    <section id='playerForm'>
    <NewPlayerForm><NewPlayerForm>
    </section>
    
    </main>
  `;
  $app.querySelector("PlayersList").replaceWith(PlayersList());
}

async function init() {
  await getTeams();
  render();
}

init();
