import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OwnerDashboard from "./pages/OwnerDashboard";
import ManageFoods from "./pages/ManageFoods";
import ManageOrders from "./pages/ManageOrders";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/food/:id"
          element={<FoodDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/owner"
          element={<OwnerDashboard />}
        />

        <Route
          path="/owner/foods"
          element={<ManageFoods />}
        />

        <Route
          path="/owner/orders"
          element={<ManageOrders />}
        />
      </Routes>
    </>
  );
}

export default App;