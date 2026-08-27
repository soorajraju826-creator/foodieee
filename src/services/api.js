import axios from "axios";

const API = axios.create({
  baseURL: "https://foodieee.onrender.com",
});

export const getFoods = () =>
  API.get("/foods");

export const getFoodById = (id) =>
  API.get(`/foods/${id}`);

export const addFood = (food) =>
  API.post("/foods", food);

export const updateFood = (id, food) =>
  API.put(`/foods/${id}`, food);

export const deleteFood = (id) =>
  API.delete(`/foods/${id}`);

export const getOrders = () =>
  API.get("/orders");

export const addOrder = (order) =>
  API.post("/orders", order);

export const updateOrder = (id, order) =>
  API.put(`/orders/${id}`, order);

export const deleteOrder = (id) =>
  API.delete(`/orders/${id}`);

export default API;