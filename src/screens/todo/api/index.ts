import axios from "axios";
import { Task } from "../types";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const sortTasks = (tasks: Task[]) => {
  return tasks.sort((a: Task, b: Task) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.index - a.index;
  });
}

export const getTasks = async () : Promise<Task[]> => {
  try {
    const url = `/api/todos`;

    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
      },
    });

    // delay for testing skeleton loading
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    return sortTasks(response.data); 

  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    throw error;
  }
};


export const createTask = async (task: Task) => {
  try {
    const url = `/api/todos`;
    const response = await axios.post(url, task, {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
};

export const updateTask = async (task: Task) => {
  try {
    const url = `/api/todos/${task.id}`;
    const response = await axios.put(url, task, {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
};

export const deleteTask = async (task: Task) => {
  try {
    const url = `/api/todos/${task.id}`;
    const response = await axios.delete(url, {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    throw error;
  }
};

export const completeTask = async (task: Task) => {
  try {
    const url = `/api/todos/${task.id}/complete`;
    const response = await axios.put(url, {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao marcar tarefa como completa:", error);
    throw error;
  }
};

export const incompleteTask = async (task: Task) => {
  try {
    const url = `/api/todos/${task.id}/incomplete`;
    const response = await axios.put(url, {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao desmarcar tarefa como completa:", error);
    throw error;
  }
};
