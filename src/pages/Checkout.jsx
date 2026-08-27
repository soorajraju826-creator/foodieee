import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../services/api";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../App.css";

function Checkout() {
  const navigate = useNavigate();

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      navigate("/");
      return;
    }

    if (
      !customerName.trim() ||
      !phone.trim() ||
      !address.trim()
    ) {
      toast.error(
        "Please fill all delivery details"
      );
      return;
    }

    try {
      setLoading(true);

      const order = {
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        paymentMethod,
        items: cart,
        total,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      await addOrder(order);

      localStorage.removeItem("cart");

      toast.success(
        "Order placed successfully!"
      );

      navigate("/orders");
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main>
        <div className="form-container">
          <h1>Checkout</h1>

          <h2>Order Summary</h2>

          {cart.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity} — ₹
              {Number(item.price) * item.quantity}
            </p>
          ))}

          <br />

          <h2>Total: ₹{total}</h2>

          <br />

          <form onSubmit={handlePlaceOrder}>
            <h2>Delivery Details</h2>

            <br />

            <input
              type="text"
              placeholder="Your Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
            />

            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              required
            />

            <h3>Payment Method</h3>

            <br />

            <label>
              <input
                type="radio"
                value="Cash on Delivery"
                checked={
                  paymentMethod ===
                  "Cash on Delivery"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />
              {" "}Cash on Delivery
            </label>

            <br />

            <label>
              <input
                type="radio"
                value="Online Payment"
                checked={
                  paymentMethod ===
                  "Online Payment"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />
              {" "}Online Payment
            </label>

            <br />
            <br />

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Checkout;