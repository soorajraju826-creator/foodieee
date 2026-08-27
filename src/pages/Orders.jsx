import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/api";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await getOrders();
        setOrders([...response.data].reverse());
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <main>
          <h2>Loading orders...</h2>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main>
        <h1>My Orders</h1>

        <br />

        {orders.length === 0 ? (
          <div>
            <h2>No orders yet</h2>
            <p>Your placed orders will appear here.</p>

            <br />

            <Link to="/">
              <button className="primary-button">
                Browse Foods
              </button>
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <span className="order-status">
                  {order.status}
                </span>
              </div>

              <div>
                {order.items?.map((item) => (
                  <div
                    className="order-item"
                    key={item.id}
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <strong>
                      ₹
                      {Number(item.price) *
                        item.quantity}
                    </strong>
                  </div>
                ))}
              </div>

              <hr />

              <div className="order-footer">
                <strong>
                  Total: ₹{order.total}
                </strong>
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
}

export default Orders;