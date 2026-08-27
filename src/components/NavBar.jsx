import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">🍴 Foodie</Link>
      </div>

      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">My Orders</Link>
        <Link to="/owner">Store Owner</Link>
      </div>
    </nav>
  );
}

export default Navbar;