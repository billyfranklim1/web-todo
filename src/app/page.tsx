"use client";
import { FaEdit, FaTrash, FaPlus, FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "What are you going to do today?": "What are you going to do today?",
        "Add your task here ...": "Add your task here ...",
        "Press Enter to save task": "Press Enter to save task",
      },
    },
    es: {
      translation: {
        "What are you going to do today?": "¿Qué vas a hacer hoy?",
        "Add your task here ...": "Agrega tu tarea aquí ...",
        "Press Enter to save task": "Presiona Enter para guardar la tarea",
      },
    },
    fr: {
      translation: {
        "What are you going to do today?": "Que vas-tu faire aujourd'hui?",
        "Add your task here ...": "Ajoutez votre tâche ici ...",
        "Press Enter to save task":
          "Appuyez sur Entrée pour enregistrer la tâche",
      },
    },
    pt: {
      translation: {
        "What are you going to do today?": "O que você vai fazer hoje?",
        "Add your task here ...": "Adicione sua tarefa aqui ...",
        "Press Enter to save task": "Pressione Enter para salvar a tarefa",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

export default function Home() {
  const { t } = useTranslation();
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

  const [language, setLanguage] = useState("en");

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log("darkMode", darkMode);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

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
    <div className=" bg-white dark:bg-gray-800 h-screen w-screen">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("Todo List")}
        </h1>
        <div className="flex gap-2 items-center">
          <select
            value={language}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded-md"
            onChange={(e) => handleChangeLanguage(e.target.value)}
          >
            <option value="en">
              <ReactCountryFlag countryCode="US" />
            </option>
            <option value="pt">
              <ReactCountryFlag countryCode="BR" />
            </option>
            <option value="es">
              <ReactCountryFlag countryCode="ES" />
            </option>
            <option value="fr">
              <ReactCountryFlag countryCode="FR" />
            </option>
          </select>

          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
          >
            {darkMode ? (
              <FaSun className="text-xl" />
            ) : (
              <FaMoon className="text-xl" />
            )}
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center py-2 mt-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 mb-4 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
          {t("What are you going to do today?")}
        </h1>
        <form className="w-8/12 mb-2" onSubmit={handleSubmit}>
          <div className="w-full flex gap-2 items-center">
            <input
              type="text"
              className="border-2 border-gray-200 dark:border-gray-600 rounded-md py-2 px-4 w-full h-12 dark:bg-gray-700 dark:text-white"
              placeholder={t("Add your task here ...")}
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
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
            {t("Press Enter to save task")}
          </p>
        </form>

        <div className="flex justify-between  mb-4 w-8/12">
          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
            {t("Created")} ({tasks.filter((task) => !task.completed).length})
          </h2>
          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
            {t("Completed")} ({tasks.filter((task) => task.completed).length})
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center w-8/12">
          {tasks.length > 0 &&
            tasks.map((task, i) => (
              <li
                key={i}
                className="bg-gray-100 w-full rounded-md flex justify-between items-center p-2 m-2"
              >
                <div className="flex items-center align-center">
                  <input
                    id={`default-checkbox${i}`}
                    type="checkbox"
                    value=""
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={task.completed}
                    onChange={() => handleCompleteTask(i)}
                  />
                  <div className="flex items-left flex-col ms-2 justify-center">
                    <label
                      htmlFor={`default-checkbox${i}`}
                      className={`text-sx font-medium ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.title}
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      lorem ipsum
                    </span>
                  </div>
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

          {tasks.length === 0 && (
            <div className="w-full flex justify-center items-center flex-col">
              <Image
                src="/images/empty.jpg"
                alt="Empty tasks"
                width={300}
                height={300}
              />
              <p className="text-gray-500 dark:text-gray-400 text-md mt-2">
                {t("No tasks to show")}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
