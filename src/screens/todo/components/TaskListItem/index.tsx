"use client";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TaskListItemProps } from "../../types";
import { Task } from "../../types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useTranslation } from "react-i18next";

export default function TaskListItem({
  task,
  i,
  handleCompleteTask,
  handleIncompleteTask,
  handleDeleteTask,
  handleEditTask,
}: TaskListItemProps) {
  const { t } = useTranslation();

  const askDelete = (task: Task) => {
    confirmAlert({
      title: t("delete_task"),
      message: t("are_you_sure_you_want_to_delete_this_task"),
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleDeleteTask(task),
        },
        {
          label: t("no"),
          onClick: () => {},
        },
      ],
    });
  };

  const updateStatus = (task: Task) => {
    task.completed ? handleIncompleteTask(task) : handleCompleteTask(task);
  };

  return (
    <motion.div
      key={task.id}
      animate={{ opacity: 1, x: 0 }}
      layout
      className="w-full"
    >
      <li
        key={i}
        className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-md p-2 mb-2"
      >
        <div className="flex items-center">
          <input
            id={`default-checkbox-${i}`}
            type="checkbox"
            name="taskCompletion"
            className="h-5 w-5 rounded-md cursor-pointer"
            checked={task.completed}
            onChange={() => updateStatus(task)}
          />

          <div className="flex flex-col ms-2">
            <label
              htmlFor={`default-checkbox-${i}`}
              className={`cursor-pointer text-sx font-medium ${
                task.completed ? "line-through text-gray-400 dark:text-gray-400" : ""
              } text-gray-800 dark:text-gray-300 flex items-center`}
            >
              {task.title}
            </label>
            <span className={`text-xs text-gray-500 dark:text-gray-400 ${ task.completed ? "line-through" : ""} `}> 
              {task.description ? task.description : t("no_description")}
            </span>
          </div>
        </div>
        <div className="flex">
          <button
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 font-bold py-2 px-2 rounded-md h-8 w-8 flex items-center justify-center"
            onClick={() => askDelete(task)}
          >
            <FaTrash size={13} />
          </button>
          <button
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 font-bold py-2 px-2 rounded-md h-8 w-8 flex items-center justify-center"
            onClick={() => handleEditTask(task)}
          >
            <FaEdit size={13} />
          </button>
        </div>
      </li>
    </motion.div>
  );
}
