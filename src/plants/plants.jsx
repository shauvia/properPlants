import { useState } from "react";

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

export default function Plants({ flowers, onAddToCart }) {
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
