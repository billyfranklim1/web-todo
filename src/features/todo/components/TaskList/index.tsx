"use client";

import React from "react";
import { TaskListProps } from "../../types";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import TaskListItem from "../TaskListItem";
import LoadingSkeleton from "../LoadingSkeleton";
import { useTodo } from "../../hooks/useTodo";

export default function TaskList({
  handleCompleteTask,
  handleIncompleteTask,
  handleDeleteTask,
  handleEditTask,
}: TaskListProps) {
  const { t } = useTranslation();
  const { tasks, isLoading, totals } = useTodo();

  return (
    <>
      <div className="flex justify-between mb-4 w-8/12">
        <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
          {t("Created")} {totals().totalTasks}
        </h2>
        <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
          {t("Completed")} {totals().completedTasks} {t("of")}{" "}
          {totals().totalTasks}
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center w-8/12">
        <ol className="w-full">
          {!isLoading &&
            tasks &&
            tasks.length > 0 &&
            tasks.map((task: any, i: number) => (
              <TaskListItem
                key={i}
                task={task}
                i={i}
                handleCompleteTask={handleCompleteTask}
                handleIncompleteTask={handleIncompleteTask}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
              />
            ))}
        </ol>

        {tasks && tasks.length === 0 && !isLoading && (
          <div className="w-full flex justify-center items-center flex-col">
            <Image
              src="/images/empty.jpg"
              alt="Empty tasks"
              priority
              width={200}
              height={200}
            />
            <p className="text-gray-500 dark:text-gray-400 text-md mt-2 font-bold">
              {t("No tasks to show")}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-md">
              {t("Create task and organize your day")}
            </p>
          </div>
        )}

        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  );
}
