import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { getFoodById } from "../services/api";
import Navbar from "../components/Navbar";

function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFood = async () => {
      try {
        const response = await getFoodById(id);
        setFood(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Food not found");
      } finally {
        setLoading(false);
      }
    };

    loadFood();
  }, [id]);

  const addToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) =>
        String(item.id) === String(food.id)
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        String(item.id) === String(food.id)
          ? {
              ...item,
              quantity:
                item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...food,
          quantity,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    toast.success("Added to cart!");
    navigate("/cart");
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main>
          <p>Loading food...</p>
        </main>
      </>
    );
  }

  if (!food) {
    return (
      <>
        <Navbar />

        <main>
          <h2>Food not found</h2>

          <Link to="/">
            Back to Home
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main>
        <Link to="/">
          ← Back to Foods
        </Link>

        <br />
        <br />

        <div className="food-details">
          <div>
            <img
              src={food.image}
              alt={food.name}
            />
          </div>

          <div>
            <h1>{food.name}</h1>

            <p>{food.description}</p>

            <br />

            <p>
              <strong>Category:</strong>{" "}
              {food.category}
            </p>

            <br />

            <h2 className="price">
              ₹{food.price}
            </h2>

            <div className="quantity-control">
              <button
                onClick={() =>
                  setQuantity((value) =>
                    Math.max(1, value - 1)
                  )
                }
              >
                -
              </button>

              <strong>{quantity}</strong>

              <button
                onClick={() =>
                  setQuantity(
                    (value) => value + 1
                  )
                }
              >
                +
              </button>
            </div>

            <h3>
              Total: ₹
              {Number(food.price) * quantity}
            </h3>

            <br />

            <button
              className="primary-button"
              onClick={addToCart}
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default FoodDetails;