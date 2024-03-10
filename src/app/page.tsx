"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Head from "next/head";

import Header from "./components/Header";
import { useTodo } from "../screens/todo/hooks/useTodo";

import TaskInputForm from "../screens/todo/components/TaskInputForm";
import TaskList from "../screens/todo/components/TaskList";

import { ToastContainer } from "react-toastify";
import { Task } from "@/screens/todo/types";

export default function Home() {
  const { t } = useTranslation();

  const {
    tasks,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    completeTaskMutation,
    incompleteTaskMutation,
  } = useTodo();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
 
  const handleCreateTask = (task: Task) => {
    createTaskMutation.mutate(task)
    setIsEditing(false);
  };

  const handleUpdateTask = (task: Task) => {
    updateTaskMutation.mutate(task);
    setIsEditing(false);
  };

  const handleDeleteTask = (task: Task) => {
    deleteTaskMutation.mutate(task);
  };

  const handleCompleteTask = (task: Task) => {
    completeTaskMutation.mutate(task);
  };

  const handleIncompleteTask = (task: Task) => {
    incompleteTaskMutation.mutate(task);
  };

  const handleEditTask = (task: Task) => {

    window.scrollTo(0, 0);

    setSelectedTask(task);
    setIsEditing(true);
  }

  const handleCancelEdit = () => {
    setSelectedTask(null);
    setIsEditing(false);
  }

  return (
    <>
      <Head>
        <title>Minhas Tarefas - App de Todo</title>
        <meta
          name="description"
          content="Organize suas tarefas diárias com facilidade."
        />
      </Head>
      <div className=" bg-white dark:bg-gray-800 w-screen min-h-screen">
        <Header />
        <main className="flex flex-col items-center py-2 ">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 dark:text-gray-300 mb-4 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text mt-10">
          {t("what_are_you_going_to_do_today")}
        </h1>

          <TaskInputForm
            onSubmit={isEditing ? handleUpdateTask : handleCreateTask}
            selectedTask={selectedTask}
            isEditing={isEditing}
            closeEdit={handleCancelEdit}
          />

          <TaskList
            handleCompleteTask={handleCompleteTask}
            handleIncompleteTask={handleIncompleteTask}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        </main>
      </div>
      <ToastContainer />
    </>
  );
}
