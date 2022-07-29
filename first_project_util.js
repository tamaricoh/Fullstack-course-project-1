// @author Tamar Cohen
import axios from "axios";

const getUsers = async () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

const getTodos = async () => {
  return await axios.get("https://jsonplaceholder.typicode.com/todos");
};

const getPosts = async () => {
  return await axios.get("https://jsonplaceholder.typicode.com/posts");
};

export default {
  getUsers,
  getTodos,
  getPosts,
};
// @author Tamar Cohen
