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

export default function Cart({ onAddToCart, onRemoveFromCart, cart }) {
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
