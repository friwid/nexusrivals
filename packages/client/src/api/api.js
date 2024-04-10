import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const authFetch = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});

export const login = async (e, formData) => {
  const username = formData.username;
  const password = formData.password;
  const isRememberMe = formData.isRememberMe;

  try {
    const resp = await authFetch.post("/login", {
      username,
      password,
      isRememberMe,
    });
    console.log("api.js resp.data: " + resp.data);
  } catch (error) {
    console.error(error);
  }
};

export const register = async (e, formData) => {
  const username = formData.username;
  const email = formData.email;
  const password = formData.password;
  const isTerms = formData.isTerms;

  try {
    const resp = await authFetch.post("/register", {
      username,
      email,
      password,
      isTerms,
    });
    console.log("api.js resp.data: " + resp.data);
  } catch (error) {
    console.error(error);
  }
};

