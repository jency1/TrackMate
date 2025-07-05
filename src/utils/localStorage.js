const USERS_KEY = "tasks_user_credentials";

export const registerUsername = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  users[username] = password;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const isUsernameTaken = (username) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  return username in users;
};

export const isPasswordValid = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  return users[username] === password;
};

export const loadTasksFromLocalStorage = (username) => {
  try {
    const data = localStorage.getItem(`tasks_${username}`);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to load tasks", err);
    return [];
  }
};

export const saveTasksToLocalStorage = (username, tasks) => {
  try {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
  } catch (err) {
    console.error("Failed to save tasks", err);
  }
};
