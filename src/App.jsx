import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaBookOpen,
  FaBook,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaUserAlt,
} from "react-icons/fa";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import Login from "./components/Login";

import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "./utils/localStorage";

import sampleTasks from "./utils/sampleTasks";
import "./styles/App.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sampleLoaded, setSampleLoaded] = useState(false);

  // Load current user and their tasks
  useEffect(() => {
    const savedUser = localStorage.getItem("tasks_current_user");
    if (savedUser) {
      setUsername(savedUser);
      const loaded = loadTasksFromLocalStorage(savedUser);
      setTasks(loaded);
    }
  }, []);

  // Save tasks to localStorage on change
  useEffect(() => {
    if (username) {
      saveTasksToLocalStorage(username, tasks);
    }
  }, [tasks, username]);

  const handleLogout = () => {
    localStorage.removeItem("tasks_current_user");
    setUsername("");
    setTasks([]);
  };

  const addOrUpdateTask = (data) => {
    if (editingTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === editingTask.id ? { ...t, ...data } : t
      );
      setTasks(updatedTasks);
    } else {
      const newTask = {
        id: Date.now(),
        ...data,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    setEditingTask(null);
    setShowForm(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleLoadSamples = () => {
    const newTasks = sampleTasks.filter(
      (sample) => !tasks.some((t) => t.id === sample.id)
    );
    setTasks((prev) => [...newTasks, ...prev]);
    setSampleLoaded(true);
  };

  const handleHideSamples = () => {
    setTasks((prev) =>
      prev.filter((t) => !sampleTasks.some((s) => s.id === t.id))
    );
    setSampleLoaded(false);
  };

  const filteredTasks = tasks
    .filter(
      (task) => filter === "all" || task.completed === (filter === "completed")
    )
    .filter((task) => {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.priority?.toLowerCase().includes(query) ||
        task.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    });

  // Redirect to login if no user logged in
  if (!username) {
    return (
      <Login
        onLogin={(name) => {
          localStorage.setItem("tasks_current_user", name);
          setUsername(name);
          const loaded = loadTasksFromLocalStorage(name);
          setTasks(loaded);
        }}
      />
    );
  }

  return (
    <div className={`app-container${darkMode ? " dark" : ""}`}>
      {/* HEADER */}
      <header className="header">
        <div className="login-header">
          <FaUserAlt className="login-icon" />
          <div>
            <h2 className="app-title">TrackMate</h2>
            <p className="welcome-text">
              Welcome, <strong>{username}</strong> 👋
            </p>
          </div>
        </div>

        <div className="toolbar">
          <button onClick={() => setShowForm(true)}>
            <FaPlus /> Add Task
          </button>
          <button
            className="sample"
            onClick={sampleLoaded ? handleHideSamples : handleLoadSamples}
          >
            {sampleLoaded ? <FaBook /> : <FaBookOpen />}{" "}
            {sampleLoaded ? "Hide Samples" : "Load Samples"}
          </button>
          <button className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
          <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}{" "}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      {/* SEARCH + FILTER */}
      <div className="controls">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          className="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TaskFilter
          currentFilter={filter}
          setFilter={setFilter}
          tasks={tasks}
        />
      </div>

      {/* TASK FORM MODAL */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(false)}>
              &times;
            </button>
            <TaskForm
              onSubmit={addOrUpdateTask}
              editingTask={editingTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
            />
          </div>
        </div>
      )}

      {/* TASK LIST */}
      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
