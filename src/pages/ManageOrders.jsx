import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrder,
} from "../services/api";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../App.css";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();

      setOrders(
        [...response.data].reverse()
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    order,
    status
  ) => {
    try {
      await updateOrder(order.id, {
        ...order,
        status,
      });

      toast.success(
        `Order status: ${status}`
      );

      await fetchOrders();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update order"
      );
    }
  };

  return (
    <div>
      <Navbar />

      <main>
        <h1>
          Received Orders 📦
        </h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>
            No orders received yet.
          </p>
        ) : (
          orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
            >
              <h2>
                Order #{order.id}
              </h2>

              <p>
                <strong>
                  Customer:
                </strong>{" "}
                {order.customerName}
              </p>

              <p>
                <strong>
                  Phone:
                </strong>{" "}
                {order.phone}
              </p>

              <p>
                <strong>
                  Address:
                </strong>{" "}
                {order.address}
              </p>

              <p>
                <strong>
                  Payment:
                </strong>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                <span className="order-status">
                  {order.status}
                </span>
              </p>

              <h3>
                Ordered Items
              </h3>

              {order.items?.map(
                (item) => (
                  <p key={item.id}>
                    {item.name} ×{" "}
                    {item.quantity} — ₹
                    {Number(
                      item.price
                    ) *
                      item.quantity}
                  </p>
                )
              )}

              <h3>
                Total: ₹{order.total}
              </h3>

              <div className="action-buttons">
                <button
                  className="success-button"
                  onClick={() =>
                    updateStatus(
                      order,
                      "Confirmed"
                    )
                  }
                >
                  Confirm
                </button>

                <button
                  className="primary-button"
                  onClick={() =>
                    updateStatus(
                      order,
                      "Preparing"
                    )
                  }
                >
                  Preparing
                </button>

                <button
                  className="secondary-button"
                  onClick={() =>
                    updateStatus(
                      order,
                      "Out for Delivery"
                    )
                  }
                >
                  Out for Delivery
                </button>

                <button
                  className="success-button"
                  onClick={() =>
                    updateStatus(
                      order,
                      "Delivered"
                    )
                  }
                >
                  Delivered
                </button>

                <button
                  className="danger-button"
                  onClick={() =>
                    updateStatus(
                      order,
                      "Cancelled"
                    )
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default ManageOrders;