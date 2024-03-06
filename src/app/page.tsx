"use client";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
  interface Task {
    id: number;
    title: string;
    completed: boolean;
  }

  const [todo, setTodo] = useState<Task>({
    id: 0,
    title: "",
    completed: false,
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (event: any) => {
    setTodo({
      id: todo.id ? todo.id : tasks.length + 1,
      title: event.target.value,
      completed: false,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!todo.title.trim()) return;

    const taskExists = tasks.find((task) => task.id === todo.id);
    if (taskExists) {
      const newTasks = tasks.map((task) => (task.id === todo.id ? todo : task));
      setTasks(newTasks);
      setTodo({
        id: 0,
        title: "",
        completed: false,
      });
      return;
    }

    setTasks([...tasks, todo]);
    setTodo({ id: 0, title: "", completed: false });
  };

  const handleCompleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleEditTask = (index: number) => {
    const selectedTask = tasks[index];
    console.log("selectedTask", selectedTask);
    setTodo(selectedTask);
  };

  return (
    <main className="flex flex-col items-center justify-center py-2 mt-64">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
        What do you do today ?
      </h1>
      <form className="w-96 mb-2" onSubmit={handleSubmit}>
        <div className="w-full flex gap-2 items-center">
          <input
            type="text"
            className="border-2 border-gray-100 rounded-md py-2 px-4 w-full h-12"
            placeholder="Add your task here ..."
            value={todo.title}
            onChange={handleAddTask}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md flex items-center justify-center py-2 px-4 h-12"
            type="submit"
          >
            <FaPlus />
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-2">
          Press Enter to save task
        </p>
      </form>
      <div className="flex flex-col items-center justify-center w-96">
        {tasks.length > 0 &&
          tasks
            .map((task, i) => (
              <li
                key={i}
                className="bg-gray-100 w-full rounded-md flex justify-between items-center p-2 m-2"
              >
                <div className="flex items-center align-center">
                  <input
                    id={`default-checkbox${i}`}
                    type="checkbox"
                    value=""
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={task.completed}
                    onChange={() => handleCompleteTask(i)}
                  />
                  <label
                    htmlFor={`default-checkbox${i}`}
                    className={`ms-2 text-sx font-medium ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    {task.title}
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-md h-8 w-8 flex items-center justify-center"
                    onClick={() => handleDeleteTask(i)}
                  >
                    <FaTrash size={13} />
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-md h-8 w-8 flex items-center justify-center"
                    onClick={() => handleEditTask(i)}
                  >
                    <FaEdit size={13} />
                  </button>
                </div>
              </li>
            ))}
      </div>
    </main>
  );
}
