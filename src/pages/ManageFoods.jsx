import { useEffect, useState } from "react";
import {
  getFoods,
  addFood,
  updateFood,
  deleteFood,
} from "../services/api";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../App.css";

function ManageFoods() {
  const emptyForm = {
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    available: true,
  };

  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const response = await getFoods();
      setFoods(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load foods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.price ||
      !form.category.trim() ||
      !form.image.trim() ||
      !form.description.trim()
    ) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    try {
      const foodData = {
        ...form,
        price: Number(form.price),
      };

      if (editingId) {
        await updateFood(
          editingId,
          foodData
        );

        toast.success(
          "Food updated successfully"
        );
      } else {
        await addFood(foodData);

        toast.success(
          "Food added successfully"
        );
      }

      setForm(emptyForm);
      setEditingId(null);

      await fetchFoods();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to save food"
      );
    }
  };

  const handleEdit = (food) => {
    setEditingId(food.id);

    setForm({
      name: food.name,
      price: food.price,
      category: food.category,
      image: food.image,
      description: food.description,
      available: food.available,
    });
  };

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this food?"
      );

    if (!confirmed) return;

    try {
      await deleteFood(id);

      toast.success(
        "Food deleted successfully"
      );

      await fetchFoods();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete food"
      );
    }
  };

  const toggleAvailability = async (
    food
  ) => {
    try {
      await updateFood(food.id, {
        ...food,
        available: !food.available,
      });

      toast.success(
        food.available
          ? "Food marked unavailable"
          : "Food marked available"
      );

      await fetchFoods();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update availability"
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div>
      <Navbar />

      <main>
        <div className="form-container">
          <h1>
            {editingId
              ? "Edit Food"
              : "Add New Food"}
          </h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Food Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              min="1"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />

            <label>
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
              />
              {" "}Available
            </label>

            <br />
            <br />

            <button
              type="submit"
              className="primary-button"
            >
              {editingId
                ? "Update Food"
                : "Add Food"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <h2 className="section-title">
          Food Items
        </h2>

        {loading ? (
          <p>Loading foods...</p>
        ) : foods.length === 0 ? (
          <p>No food items available.</p>
        ) : (
          foods.map((food) => (
            <div
              className="manage-food-card"
              key={food.id}
            >
              <img
                src={food.image}
                alt={food.name}
              />

              <div>
                <h3>{food.name}</h3>

                <p>
                  Category: {food.category}
                </p>

                <p>
                  Price: ₹{food.price}
                </p>

                <p>
                  Status:{" "}
                  {food.available
                    ? "Available"
                    : "Unavailable"}
                </p>

                <div className="action-buttons">
                  <button
                    className="primary-button"
                    onClick={() =>
                      handleEdit(food)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="danger-button"
                    onClick={() =>
                      handleDelete(food.id)
                    }
                  >
                    Delete
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() =>
                      toggleAvailability(food)
                    }
                  >
                    {food.available
                      ? "Mark Unavailable"
                      : "Mark Available"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default ManageFoods;