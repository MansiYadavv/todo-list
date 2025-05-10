
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './todoactivity.module.css';

// Define API base URL once
const API_URL = "http://localhost:5000/api/tasks";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(API_URL, { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`${API_URL}/${task._id}`, {
      isCompleted: !task.isCompleted,
    });
    fetchTasks();
  };

 return (
    <div className={styles.app}>
      <h2>📝 To-Do List</h2>

      <div className={styles["add-task"]}>
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <button onClick={addTask} className={styles.button}>Add</button>
      </div>

      <ul className={styles["task-list"]}>
        {tasks.map((task) => (
          <li key={task._id} className={task.isCompleted ? styles.done : ""}>
            <div className={styles.taskItem}>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleComplete(task)}
                className={styles.checkbox}
              />
              <span>{task.title}</span>
            </div>
            <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Todo;
