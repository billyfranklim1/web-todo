"use client";
import { FaEdit, FaTrash, FaPlusCircle, FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "What are you going to do today?": "What are you going to do today?",
        "Add your task here ...": "Add your task here ...",
        "Add your task description here ...":
          "Add your task description here ...",
        "Press Enter to save task": "Press Enter to save task",
        Add: "Add",
        "Todo List": "Todo List",
        Created: "Created",
        Completed: "Completed",
        "No tasks to show": "No tasks to show",
        "Create task and organize your day":
          "Create task and organize your day",
        "Task added successfully": "Task added successfully",
        "Task updated successfully": "Task updated successfully",
      },
    },
    es: {
      translation: {
        "What are you going to do today?": "¿Qué vas a hacer hoy?",
        "Add your task here ...": "Agrega tu tarea aquí ...",
        "Add your task description here ...":
          "Agrega la descripción de tu tarea aquí ...",
        "Press Enter to save task": "Presiona Enter para guardar la tarea",
        "Todo List": "Lista de tareas",
        Add: "Añadir",
        Created: "Creadas",
        Completed: "Completadas",
        "No tasks to show": "No hay tareas para mostrar",
        "Create task and organize your day": "Crea tareas y organiza tu día",
        "Task added successfully": "Tarea agregada con éxito",
        "Task updated successfully": "Tarea actualizada con éxito",
      },
    },
    fr: {
      translation: {
        "What are you going to do today?": "Que vas-tu faire aujourd'hui?",
        "Add your task here ...": "Ajoutez votre tâche ici ...",
        "Add your task description here ...":
          "Ajoutez la description de votre tâche ici ...",
        "Press Enter to save task":
          "Appuyez sur Entrée pour enregistrer la tâche",
        "Todo List": "Liste de choses à faire",
        Add: "Ajouter",
        Created: "Créées",
        Completed: "Terminées",
        "No tasks to show": "Aucune tâche à afficher",
        "Create task and organize your day":
          "Créez des tâches et organisez votre journée",
        "Task added successfully": "Tâche ajoutée avec succès",
        "Task updated successfully": "Tâche mise à jour avec succès",
      },
    },
    pt: {
      translation: {
        "What are you going to do today?": "O que você vai fazer hoje?",
        "Add your task here ...": "Adicione sua tarefa aqui ...",
        "Add your task description here ...":
          "Adicione a descrição da sua tarefa aqui ...",
        "Press Enter to save task": "Pressione Enter para salvar a tarefa",
        "Todo List": "Lista de tarefas",
        Add: "Adicionar",
        Created: "Criadas",
        Completed: "Completadas",
        "No tasks to show": "Você ainda não tem tarefas cadastradas",
        "Create task and organize your day": "Crie tarefas e organize seu dia",
        "Task added successfully": "Tarefa adicionada com sucesso",
        "Task updated successfully": "Tarefa atualizada com sucesso",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default function Home() {
  const { t } = useTranslation();
  interface Task {
    id: number | null;
    title: string;
    description?: string;
    completed: boolean;
    index: number;
  }

  const [todo, setTodo] = useState<Task>({
    id: null,
    title: "",
    description: "",
    completed: false,
    index: 0,
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [language, setLanguage] = useState("en");
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);

  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; 
      }

      return b.index - a.index;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSkeleton(false);
    }, 5000);
  }, []);

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
      index: tasks.length + 1,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!todo.title.trim()) return;

    const taskExists = tasks.find((task) => task.id === todo.id);
    if (taskExists) {
      const newTasks = tasks.map((task) => (task.id === todo.id ? todo : task));
      setTasks(sortTasks(newTasks));
      setTodo({
        id: null,
        title: "",
        description: "",
        completed: false,
        index: 0,
      });

      toast.success(t("Task updated successfully"), {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    setTasks(
      sortTasks([
        ...tasks,
        {
          ...todo,
          id: todo.id ? todo.id : tasks.length + 1,
          index: tasks.length + 1,
        },
      ])
    );
    setTodo({
      id: null,
      title: "",
      description: "",
      completed: false,
      index: 0,
    });
    toast.success(t("Task added successfully"), {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleCompleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(sortTasks(newTasks));
  };

  const handleDeleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(sortTasks(newTasks));
  };

  const handleEditTask = (index: number) => {
    const selectedTask = tasks[index];
    console.log("selectedTask", selectedTask);
    setTodo(selectedTask);
  };

  return (
    <div className=" bg-white dark:bg-gray-800 w-screen">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("Todo List")}
        </h1>
        <div className="flex gap-2 items-center">
          <select
            value={language}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 font-bold py-1 px-2 rounded-md"
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

          <motion.div
            initial={darkMode ? "dark" : "light"}
            animate={darkMode ? "dark" : "light"}
            className="rounded-full bg-gray-300 w-14 h-8 flex items-center justify-start p-1 dark:bg-gray-700"
            onClick={toggleDarkMode}
          >
            <motion.div
              initial={darkMode ? "dark" : "light"}
              animate={darkMode ? "dark" : "light"}
              variants={{
                dark: { x: 28 },
                light: { x: 2 },
              }}
              className={`w-4 h-4 rounded-full flex items-center justify-center`}
            >
              {darkMode ? <FaSun color="yellow" /> : <FaMoon color="gray" />}
            </motion.div>
          </motion.div>

       
        </div>
      </header>

      <main className="flex flex-col items-center py-2 h-screen">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 mb-4 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text mt-10">
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
            <textarea
              className="border-2 border-gray-200 dark:border-gray-600 rounded-md py-2 px-4 w-full h-20 dark:bg-gray-700 dark:text-white"
              placeholder={t("Add your task description here ...")}
              value={todo.description}
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
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
        <div className="flex justify-between  mb-4 w-8/12">
          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
            {t("Created")} ({tasks.filter((task) => !task.completed).length})
          </h2>
          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md p-2">
            {t("Completed")} ({tasks.filter((task) => task.completed).length}{" "}
            {t("of")} {tasks.length})
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center w-8/12">
          {tasks.length > 0 &&
            tasks.map((task, i) => (
              <motion.div
                key={task.id}
                // initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                // exit={{ opacity: 0, x: 10 }}
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

          {showSkeleton &&
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-md p-2 mb-2"
                  key={i}
                >
                  <div className="flex items-center align-center">
                    <Skeleton width={20} height={20} circle={true} />
                    <div className="flex items-left flex-col ms-2 justify-center">
                      <Skeleton width={100} height={20} />
                      <Skeleton width={200} height={20} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Skeleton width={20} height={20} circle={true} />
                    <Skeleton width={20} height={20} circle={true} />
                  </div>
                </div>
              ))}
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}
