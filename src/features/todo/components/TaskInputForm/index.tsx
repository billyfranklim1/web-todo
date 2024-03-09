import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { TaskInputFormProps } from "../../types";
import { useTranslation } from "react-i18next";

const TaskInputForm: React.FC<TaskInputFormProps> = ({
    task,
    setTask,
    onSubmit,
}) => {
    const { t } = useTranslation();

    return (
        <form className="w-8/12 mb-10" onSubmit={onSubmit}>
            <div className="w-full flex gap-2 items-center flex-col">
                <input
                    type="text"
                    className="flex border-2 border-gray-200 dark:border-gray-600 rounded-md py-2 px-4 w-full h-12 dark:bg-gray-700 dark:text-white"
                    placeholder={t("Add your task here ...")}
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
                <textarea
                    className="border-2 border-gray-200 dark:border-gray-600 rounded-md py-2 px-4 w-full h-20 dark:bg-gray-700 dark:text-white"
                    placeholder={t("Add your task description here ...")}
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                />
                <div className="w-full rounded-md flex items-start">
                    <p className="text-gray-500 dark:text-gray-400 text-xs w-full">
                        {t("Press Enter to save task")}
                    </p>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md flex items-center py-2 px-4 gap-2"
                        type="submit"
                    >
                        {t("Add")}
                        <FaPlusCircle />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default TaskInputForm;
