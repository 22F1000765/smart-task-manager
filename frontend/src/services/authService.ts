import api from "../api/axios";

export const login = async (email: string, password: string) => {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const response = await api.post("/users/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await api.post("/users/", {
    username,
    email,
    password,
  });

  return response.data;
};