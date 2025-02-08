const API_URL = `${process.env.REACT_APP_API_URL}/tasks/`;

export const getTasks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao buscar tarefas");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addTask = async (task) => {
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

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}${taskId}/`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Erro ao excluir tarefa");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const completeTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}${task.id}/`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Erro ao excluir tarefa");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
