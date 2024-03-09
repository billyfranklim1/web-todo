import { useState, useCallback } from "react";
import { Task } from "../types";
import { useToast } from "./useToast";

export const useTodo = () => {
  const [todo, setTodo] = useState<Task>({
    id: null,
    title: "",
    description: "",
    completed: false,
    index: 0,
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const { notify } = useToast();

  const sortTasks = useCallback((tasks: Task[]) => {
    return tasks.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      return b.index - a.index;
    });
  }, []);

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      if (!todo.title.trim()) return;

      const taskExists = tasks.find((task) => task.id === todo.id);
      if (taskExists) {
        const newTasks = tasks.map((task) =>
          task.id === todo.id ? todo : task
        );
        setTasks(sortTasks(newTasks));
        setTodo({
          id: null,
          title: "",
          description: "",
          completed: false,
          index: 0,
        });
      } else {
        setTasks(sortTasks([...tasks, { ...todo, id: Date.now() }]));
        setTodo({
          id: null,
          title: "",
          description: "",
          completed: false,
          index: 0,
        });
      }

      notify(`Task ${todo.id ? "updated" : "created"}`, "success", 2000);
    },
    [sortTasks, tasks, todo, notify]
  );

  const handleCompleteTask = useCallback(
    (index: number) => {
      const newTasks = [...tasks];
      newTasks[index].completed = !newTasks[index].completed;
      setTasks(sortTasks(newTasks));
    },
    [sortTasks, tasks]
  );

  const handleDeleteTask = useCallback(
    (index: number) => {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(sortTasks(newTasks));
      notify("Task deleted", "error", 2000);
    },
    [sortTasks, tasks, notify]
  );

  const handleEditTask = useCallback(
    (index: number) => {
      const task = tasks[index];
      setTodo({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        index: task.index,
      });
    },
    [tasks]
  );

  return {
    todo,
    setTodo,
    tasks,
    setTasks,
    showSkeleton,
    setShowSkeleton,
    sortTasks,
    handleSubmit,
    handleCompleteTask,
    handleDeleteTask,
    handleEditTask,
  };
};
