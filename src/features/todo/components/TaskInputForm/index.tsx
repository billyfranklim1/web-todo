"use client";

import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaTimesCircle, FaEdit } from "react-icons/fa";
import { TaskInputFormProps } from "../../types";
import { useTranslation } from "react-i18next";
import { Task } from "../../types";

export default function TaskInputForm({
  onSubmit,
  selectedTask,
  isEditing,
  closeEdit,
}: TaskInputFormProps) {
  const { t } = useTranslation();

  const [task, setTask] = useState<Task>({
    id: null,
    title: "",
    description: "",
    completed: false,
    index: 0,
  });

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (isEditing && selectedTask) {
      setTask(selectedTask);
      setIsValid(true);
    }
  }, [selectedTask, isEditing]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateFields()) return;
    onSubmit(task);
    setTask({
      id: null,
      title: "",
      description: "",
      completed: false,
      index: 0,
    });
  };

  const handleCancel = () => {
    closeEdit();
    setTask({
      id: null,
      title: "",
      description: "",
      completed: false,
      index: 0,
    });
  }

  const validateFields = () => {
    if (!task.title.trim()) {
      setIsValid(false);
      return false;
    }
    setIsValid(true);
    return true;
  };

  return (
    <form className="w-8/12 mb-10" onSubmit={handleSubmit}>
      <div className="w-full flex gap-2 items-center flex-col">
        <input
          type="text"
          className={`${isValid ? '' : 'border-red-500 dark:border-red-500'} ${isEditing ? "border-2 border-yellow-500 dark:border-yellow-500 rounded-md py-2 px-4 h-13 dark:bg-gray-700 dark:text-white w-full" : "border-2 border-gray-200 dark:border-gray-600 rounded-md py-2 px-4 h-13 dark:bg-gray-700 dark:text-white w-full"}`}
          placeholder={t("add_your_task_here")}
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <p className="text-red-500 text-xs w-full mb-2">
          {!isValid && t("text_field_required")}
        </p>
        <textarea
          className={isEditing ? "border-2 border-yellow-500 dark:border-yellow-500 rounded-md py-2 px-4 h-13 dark:bg-gray-700 dark:text-white w-full" : "border-2 border-gray-200 dark:border-gray-600 rounded-md py-2 px-4 h-13 dark:bg-gray-700 dark:text-white w-full"}
          placeholder={t("add_your_task_description_here")}
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <div className="w-full rounded-md flex items-start gap-2">
          <p className="text-gray-500 dark:text-gray-400 text-xs w-full">
            {t("press_enter_to_save_task")}
          </p>

          {isEditing ? (
            <>
              <button
                className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold rounded-md flex items-center py-1 px-2 gap-2"
                type="button"
                onClick={handleCancel}
              >
                <FaTimesCircle />
                {t("Cancel")}
              </button>

              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white text-sm font-bold rounded-md flex items-center py-1 px-2 gap-2"
                type="submit"
              >
                {t("Update")}
                <FaEdit />
              </button>
            </>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold rounded-md flex items-center py-1 px-2 gap-2"
              type="submit"
            >
              {isEditing ? t("Update") : t("add")}
              <FaPlusCircle />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
