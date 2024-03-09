import React from "react";
import { TaskListProps } from "../../types";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import TaskListItem from "../TaskListItem";
import LoadingSkeleton from "../LoadingSkeleton";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  handleCompleteTask,
  handleDeleteTask,
  handleEditTask,
  showSkeleton,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center w-8/12">
      {tasks.length > 0 &&
        tasks.map((task, i) => (
          <TaskListItem
            key={i}
            task={task}
            i={i}
            handleCompleteTask={handleCompleteTask}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        ))}

      {tasks.length === 0 && (
        <div className="w-full flex justify-center items-center flex-col">
          <Image
            src="/images/empty.jpg"
            alt="Empty tasks"
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

      {showSkeleton && <LoadingSkeleton />}
    </div>
  );
};

export default TaskList;
