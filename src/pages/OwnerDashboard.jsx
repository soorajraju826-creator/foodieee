import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFoods, getOrders } from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

function OwnerDashboard() {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [foodsResponse, ordersResponse] =
          await Promise.all([
            getFoods(),
            getOrders(),
          ]);

        setFoods(foodsResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, []);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalSales = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (total, order) =>
        total + Number(order.total),
      0
    );

  return (
    <div>
      <Navbar />

      <main>
        <h1>Store Owner Dashboard</h1>

        <p>
          Manage your Foodie store from one place.
        </p>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <h2>{foods.length}</h2>
            <p>Total Foods</p>
          </div>

          <div className="dashboard-card">
            <h2>{orders.length}</h2>
            <p>Total Orders</p>
          </div>

          <div className="dashboard-card">
            <h2>{pendingOrders}</h2>
            <p>Pending Orders</p>
          </div>

          <div className="dashboard-card">
            <h2>{completedOrders}</h2>
            <p>Delivered Orders</p>
          </div>

          <div className="dashboard-card">
            <h2>₹{totalSales}</h2>
            <p>Total Sales</p>
          </div>
        </section>

        <section>
          <h2>Store Management</h2>

          <div className="admin-actions">
            <Link to="/owner/foods">
              <button className="primary-button">
                🍔 Manage Foods
              </button>
            </Link>

            <Link to="/owner/orders">
              <button className="secondary-button">
                📦 Manage Orders
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default OwnerDashboard;