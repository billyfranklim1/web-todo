import { FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { TaskListProps } from "../../types";
import { useTranslation } from "react-i18next";
import LoadingSkeleton from "../LoadingSkeleton";
import { useTodo } from "../../hooks/useTodo";
import { Task } from "../../types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


export default function TaskList({
  handleCompleteTask,
  handleIncompleteTask,
  handleDeleteTask,
  handleEditTask,
}: TaskListProps) {
  const { t } = useTranslation();
  const { tasks, isLoading, totals } = useTodo();

  const updateStatus = (task: Task) => {
    task.completed ? handleIncompleteTask(task) : handleCompleteTask(task);
  };

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

  return (
    <>
      <div className="flex justify-between mb-4 w-10/12 lg:w-8/12">
        <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
          {t("created")} {totals().totalTasks}
        </h2>
        <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
          {t("completed")} {totals().completedTasks} {t("of")}{" "}
          {totals().totalTasks}
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center w-10/12 lg:w-8/12">
        <ol className="w-full">
          {!isLoading &&
            tasks &&
            tasks.length > 0 &&
            tasks.map((task, i) => (
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
                      className="w-5 h-5 rounded-md cursor-pointer"
                      checked={task.completed}
                      onChange={() => updateStatus(task)}
                    />

                    <div className="flex flex-col ms-2 w-full">
                      <label
                        htmlFor={`default-checkbox-${i}`}
                        className={`cursor-pointer text-sx font-medium ${
                          task.completed
                            ? "line-through text-gray-400 dark:text-gray-400"
                            : ""
                        } text-gray-800 dark:text-gray-300 flex items-center`}
                      >
                        {task.title}
                      </label>
                      <p
                        className={`text-xs text-gray-500 dark:text-gray-400 break-all ${
                          task.completed ? "line-through" : ""
                        } `}
                      >
                        {task.description
                          ? task.description
                          : t("no_description")}
                      </p>
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
            ))}
        </ol>

        {tasks && tasks.length === 0 && !isLoading && (
          <div className="w-full flex justify-center items-center flex-col">
            <img
              src="/images/empty.jpg"
              alt="Empty tasks"
              className="w-48 h-48"
            />
            <p className="text-gray-500 dark:text-gray-400 text-md mt-2 font-bold">
              {t("no_tasks_to_show")}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-md">
              {t("create_task_and_organize_your_day")}
            </p>
          </div>
        )}

        {isLoading && <LoadingSkeleton />}
      </div>
    </>
  );
}
