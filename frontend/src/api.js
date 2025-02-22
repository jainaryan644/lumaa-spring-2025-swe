const API_BASE_URL = "http://localhost:3000";

export const login = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
    }

    return response.json();
};

export const register = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error(`Registration failed with status ${response.status}`);
    }

    return response.json();
};


export const getTasks = async (token) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Fetching tasks failed with status ${response.status}`);
    }

    return response.json();
};
export const createTask = async (token, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
    });
    return response.json();
};

export const updateTask = async (token, id, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
    });
    return response.json();
};

export const deleteTask = async (token, id) => {
    await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
    });
};
