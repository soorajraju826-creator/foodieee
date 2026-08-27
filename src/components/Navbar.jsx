import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/" className="nav-logo">
        <div className="nav-logo-icon">🍴</div>
        <h2>Foodie</h2>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">My Orders</Link>
        <Link to="/owner">Store Owner</Link>
      </div>
    </nav>
  );
}

export default Navbar;