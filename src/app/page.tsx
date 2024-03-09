"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


import Header from "../components/Header";
import { useTodo } from '../features/todo/hooks/useTodo';

import TaskInputForm from "../features/todo/components/TaskInputForm";
import TaskList from "../features/todo/components/TaskList";


export default function Home() {
  const { t } = useTranslation();
  const { todo, tasks, showSkeleton, setShowSkeleton, setTodo, handleSubmit, handleCompleteTask, handleDeleteTask, handleEditTask } = useTodo();


  useEffect(() => {
    setTimeout(() => {
      setShowSkeleton(false);
    }, 5000);
  }, []);



  return (
    <div className=" bg-white dark:bg-gray-800 w-screen">
      <Header/>

      <main className="flex flex-col items-center py-2 h-screen">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 mb-4 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text mt-10">
          {t("What are you going to do today?")}
        </h1>
        <TaskInputForm task={todo} setTask={setTodo} onSubmit={handleSubmit} />
        <div className="flex justify-between  mb-4 w-8/12">
          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
            {t("Created")} ({tasks.filter((task) => !task.completed).length})
          </h2>
          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
            {t("Completed")} ({tasks.filter((task) => task.completed).length}{" "}
            {t("of")} {tasks.length})
          </h2>
        </div>
        <TaskList tasks={tasks} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} showSkeleton={showSkeleton} />

      </main>

      {/* <ToastContainer /> */}
    </div>
  );
}
