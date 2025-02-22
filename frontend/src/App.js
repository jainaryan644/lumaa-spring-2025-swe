import React, { useState, useEffect } from "react";
import { login, register, getTasks, createTask, deleteTask } from "./api";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false); // ✅ Toggle between Login/Register

    useEffect(() => {
        if (token) {
            getTasks(token).then(setTasks);
        }
    }, [token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await login(username, password);
        if (res.access_token) {
            setToken(res.access_token);
            localStorage.setItem("token", res.access_token);
        } else {
            alert("Login failed. Check credentials.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            alert("Registration successful. You can now log in.");
            setIsRegistering(false); // ✅ Switch to login mode after registering
        } catch (error) {
            alert("Registration failed. Try a different username.");
        }
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
                    <h2>Tasks</h2>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        setToken("");
                    }}>
                        Logout
                    </button>
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id}>
                                {task.title} - {task.description}
                                <button onClick={() => deleteTask(token, task.id).then(() => setTasks(tasks.filter(t => t.id !== task.id)))}>Delete</button>
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
                    <button onClick={() => createTask(token, newTask).then(task => setTasks([...tasks, task]))}>Add Task</button>
                </div>
            )}
        </div>
    );
}

export default App;
