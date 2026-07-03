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
export const updateTask = async (
  id: number,
  title: string,
  description: string,
  status: string
) => {
  const response = await api.put(`/tasks/${id}`, {
    title,
    description,
    status,
  });

  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};