import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../App.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      String(item.id) === String(id)
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => String(item.id) !== String(id)
    );

    updateCart(updatedCart);

    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");

    toast.success("Cart cleared");
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div>
      <Navbar />

      <main>
        <h1>Your Cart 🛒</h1>

        {cart.length === 0 ? (
          <div className="cart-summary">
            <h2>Your cart is empty</h2>

            <p>
              Add some delicious food to your cart.
            </p>

            <br />

            <Link to="/">
              <button className="primary-button">
                Browse Foods
              </button>
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    ₹{item.price} each
                  </p>

                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      -
                    </button>

                    <strong>
                      {item.quantity}
                    </strong>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p>
                    Item Total: ₹
                    {Number(item.price) *
                      item.quantity}
                  </p>

                  <button
                    className="danger-button"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <h2>Total: ₹{total}</h2>

              <br />

              <button
                className="primary-button"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

              <button
                className="secondary-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Cart;