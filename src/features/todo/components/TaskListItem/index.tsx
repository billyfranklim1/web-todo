import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TaskListItemProps } from "../../types";

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  i,
  handleCompleteTask,
  handleDeleteTask,
  handleEditTask,
}) => {
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
        <div className="flex items-center align-center">
          <input
            id={`default-checkbox-${i}`}
            type="checkbox"
            name="taskCompletion"
            className="custom-checkbox opacity-0 absolute"
            checked={task.completed}
            onChange={() => handleCompleteTask(i)}
          />
          <label
            htmlFor={`default-checkbox-${i}`}
            className={`cursor-pointer text-sx font-medium ${
              task.completed ? "line-through" : ""
            } text-gray-800 dark:text-gray-300 flex items-center`}
          >
            {task.title}
          </label>
          <div className="flex items-left flex-col ms-2 justify-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {task.description ? task.description : "Sem descrição"}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 font-bold py-2 px-2 rounded-md h-8 w-8 flex items-center justify-center"
            onClick={() => handleDeleteTask(i)}
          >
            <FaTrash size={13} />
          </button>
          <button
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 font-bold py-2 px-2 rounded-md h-8 w-8 flex items-center justify-center"
            onClick={() => handleEditTask(i)}
          >
            <FaEdit size={13} />
          </button>
        </div>
      </li>
    </motion.div>
  );
};

export default TaskListItem;
