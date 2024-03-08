"use client";
import { FaEdit, FaTrash, FaPlusCircle, FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "What are you going to do today?": "What are you going to do today?",
        "Add your task here ...": "Add your task here ...",
        "Add your task description here ...": "Add your task description here ...",
        "Press Enter to save task": "Press Enter to save task",
        "Add": "Add",
        "Todo List": "Todo List",
        "Created": "Created",
        "Completed": "Completed",
        "No tasks to show": "No tasks to show",
        "Task added successfully": "Task added successfully",
        "Task updated successfully": "Task updated successfully",
      },
    },
    es: {
      translation: {
        "What are you going to do today?": "¿Qué vas a hacer hoy?",
        "Add your task here ...": "Agrega tu tarea aquí ...",
        "Add your task description here ...": "Agrega la descripción de tu tarea aquí ...",
        "Press Enter to save task": "Presiona Enter para guardar la tarea",
        "Todo List": "Lista de tareas",
        "Add": "Añadir",
        "Created": "Creadas",
        "Completed": "Completadas",
        "No tasks to show": "No hay tareas para mostrar",
        "Task added successfully": "Tarea agregada con éxito",
        "Task updated successfully": "Tarea actualizada con éxito",
      },
    },
    fr: {
      translation: {
        "What are you going to do today?": "Que vas-tu faire aujourd'hui?",
        "Add your task here ...": "Ajoutez votre tâche ici ...",
        "Add your task description here ...": "Ajoutez la description de votre tâche ici ...",
        "Press Enter to save task":
        "Appuyez sur Entrée pour enregistrer la tâche",
        "Todo List": "Liste de choses à faire",
        "Add": "Ajouter",
        "Created": "Créées",
        "Completed": "Terminées",
        "No tasks to show": "Aucune tâche à afficher",
        "Task added successfully": "Tâche ajoutée avec succès",
        "Task updated successfully": "Tâche mise à jour avec succès",
      },
    },
    pt: {
      translation: {
        "What are you going to do today?": "O que você vai fazer hoje?",
        "Add your task here ...": "Adicione sua tarefa aqui ...",
        "Add your task description here ...": "Adicione a descrição da sua tarefa aqui ...",
        "Press Enter to save task": "Pressione Enter para salvar a tarefa",
        "Todo List": "Lista de tarefas",
        "Add": "Adicionar",
        "Created": "Criadas",
        "Completed": "Completadas",
        "No tasks to show": "Nenhuma tarefa para mostrar",
        "Task added successfully": "Tarefa adicionada com sucesso",
        "Task updated successfully": "Tarefa atualizada com sucesso",
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
    id: number | null;
    title: string;
    description?: string;
    completed: boolean;
  }

  const [todo, setTodo] = useState<Task>({
    id: null,
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
        id: null,
        title: "",
        description: "",
        completed: false,
      });

      toast.success(t("Task updated successfully"), {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    setTasks([...tasks, { ...todo, id: todo.id ? todo.id : tasks.length + 1 }]);
    setTodo({ id: null, title: "", description: "", completed: false });
    toast.success(t("Task added successfully"), {
      position: "top-right",
      autoClose: 2000,
    });
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

      <main className="flex flex-col items-center justify-center py-2">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 mb-4 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
          {t("What are you going to do today?")}
        </h1>
        <form className="w-8/12 mb-10" onSubmit={handleSubmit}>
          <div className="w-full flex gap-2 items-center flex-col">
            <input
              type="text"
              className="flex border-2 border-gray-200 dark:border-gray-600 rounded-md py-2 px-4 w-full h-12 dark:bg-gray-700 dark:text-white"
              placeholder={t("Add your task here ...")}
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <textarea className="border-2 border-gray-200 dark:border-gray-600 rounded-md py-2 px-4 w-full h-20 dark:bg-gray-700 dark:text-white" placeholder={t("Add your task description here ...")} value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
            <p className="text-gray-500 dark:text-gray-400 text-xs w-full rounded-md flex items-center justify-star">
              {t("Press Enter to save task")}
            </p>
            <div className="w-full rounded-md flex items-center justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md flex items-center justify-center py-2 px-4 gap-2"
                type="submit"
              >
                {t("Add")}
                <FaPlusCircle /> 
              </button>
            </div>

          </div>
          
        </form>

        <div className="flex justify-between  mb-4 w-8/12">
          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
            {t("Created")} ({tasks.filter((task) => !task.completed).length})
          </h2>
          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
            {t("Completed")} ({tasks.filter((task) => task.completed).length} {t("of")} {tasks.length})
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center w-8/12">
          {tasks.length > 0 &&
            tasks.map((task, i) => (
              <li
                key={i}
                className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-md p-2 mb-2"
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
                      } text-gray-800 dark:text-gray-300`}
                    >
                      {task.title}
                    </label>
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
            ))}

          {/* {tasks.length === 0 && (
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
          )} */}

          {/*   add skeleton loading */}
          {Array(10).fill(0).map((_, i) => (
            <div>
              <Skeleton />
              <Skeleton count={5} />
            </div>
          ))}
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}
