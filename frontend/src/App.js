import React, { useState, useEffect } from "react";
import { login, register, getTasks, createTask, deleteTask } from "./api";
import "./App.css"; // Ensure styles are applied

function App() {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        if (token) {
            getTasks(token).then(setTasks);
        }
    }, [token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(username, password);
            if (res.access_token) {
                setToken(res.access_token);
                localStorage.setItem("token", res.access_token);
            } else {
                alert("Invalid login. Please try again.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login failed. Check your credentials.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            alert("Registration successful. You can now log in.");
            setIsRegistering(false);
        } catch (error) {
            alert("Registration failed. Try a different username.");
        }
    };

    const handleCreateTask = async () => {
        if (!newTask.title.trim()) {
            alert("Task title cannot be empty");
            return;
        }
        try {
            await createTask(token, newTask);
            const updatedTasks = await getTasks(token);
            setTasks(updatedTasks);
            setNewTask({ title: "", description: "" });
        } catch (error) {
            console.error("❌ Error creating task:", error);
            alert("Failed to create task.");
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(token, taskId);
            const updatedTasks = await getTasks(token);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("❌ Error deleting task:", error);
            alert("Failed to delete task.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
    };

    return (
        <div>
            {!token ? (
                <div>
                    <h2>{isRegistering ? "Register" : "Login"}</h2>
                    <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
                    </form>
                    <button onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? "Already have an account? Login" : "No account? Register"}
                    </button>
                </div>
            ) : (
                <div>
                    {/* ✅ New Header for Logout Button */}
                    <div className="header">
                        <h2>Tasks</h2>
                        <button className="logout" onClick={handleLogout}>Logout</button>
                    </div>

                    <ul>
                        {tasks.map(task => (
                            <li key={task.id}>
                                {task.title} - {task.description}
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>

                    <h3>Add New Task</h3>
                    <input
                        type="text"
                        placeholder="New Task Title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Task Description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <button onClick={handleCreateTask}>Add Task</button>
                </div>
            )}
        </div>
    );
}

export default App;
