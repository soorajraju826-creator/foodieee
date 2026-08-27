import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFoods } from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

function Home() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const response = await getFoods();
        setFoods(response.data);
      } catch (error) {
        console.error(
          "Failed to load foods:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, []);

  const categories = [
    "All",
    ...new Set(
      foods.map((food) => food.category)
    ),
  ];

  const filteredFoods = foods.filter(
    (food) => {
      const matchesSearch =
        food.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        food.category === category;

      return (
        food.available &&
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
    <div>
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="hero-tag">
              🍽️ Fresh & Delicious
            </span>

            <h1>
              Good Food.
              <br />
              Good Mood.
            </h1>

            <p>
              Discover delicious meals prepared
              fresh and delivered straight to
              your door.
            </p>

            <Link
              to="#foods"
              className="hero-button"
            >
              Explore Foods →
            </Link>
          </div>
        </section>

        <section
          className="search-section"
          id="foods"
        >
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search your favourite food..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="category-buttons">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <h2 className="section-title">
          Popular Foods
        </h2>

        {loading ? (
          <p>Loading foods...</p>
        ) : filteredFoods.length === 0 ? (
          <p>No food found.</p>
        ) : (
          <div className="food-grid">
            {filteredFoods.map((food) => (
              <div
                className="food-card"
                key={food.id}
              >
                <img
                  src={food.image}
                  alt={food.name}
                  loading="lazy"
                />

                <div className="food-card-content">
                  <h3>{food.name}</h3>

                  <p>{food.category}</p>

                  <p className="price">
                    ₹{food.price}
                  </p>

                  <Link
                    to={`/food/${food.id}`}
                  >
                    <button className="primary-button">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;