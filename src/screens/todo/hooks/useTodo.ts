import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  completeTask,
  incompleteTask,
} from "../api";

import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

export const useTodo = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["todos"], queryFn: getTasks });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(t('task_added_successfully'), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(t('task_updated_successfully'), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      console.error("Error updating task:", error);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(t('task_deleted_successfully'), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });

  const completeTaskMutation = useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Error completing task:", error);
    },
  });

  const incompleteTaskMutation = useMutation({
    mutationFn: incompleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Error marking task as incomplete:", error);
    },
  });

  const totals = (): {
    totalTasks: number;
    completedTasks: number;
    incompleteTasks: number;
  } => {
    if (!tasks) return { totalTasks: 0, completedTasks: 0, incompleteTasks: 0 };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const incompleteTasks = totalTasks - completedTasks;

    return { totalTasks, completedTasks, incompleteTasks };
  };

  return {
    tasks,
    isLoading,
    isError,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    completeTaskMutation,
    incompleteTaskMutation,
    totals,
  };
};
