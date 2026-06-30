import api from "../api/axios";

export const getTasks = async () => {
  const response = await api.get("/tasks/");
  return response.data;
};
export const createTask = async (
  title: string,
  description: string
) => {
  const response = await api.post("/tasks/", {
    title,
    description,
  });

  return response.data;
};