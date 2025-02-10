import { Task } from "../Task.interface";
const API_URL = `${process.env.REACT_APP_API_URL}/tasks/`;

export const getTasks = async (sort?: string): Promise<Task[]> => {
  const url = new URL(API_URL);
  url.searchParams.append("ordering", sort || "-id");
  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Erro ao buscar tarefas");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addTask = async (task: Task): Promise<Task> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!response.ok) throw new Error("Erro ao adicionar tarefa");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTask = async (taskId: number): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}${taskId}/`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Erro ao excluir tarefa");
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTask = async (task: Task): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}${task.id}/`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Erro ao excluir tarefa");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
