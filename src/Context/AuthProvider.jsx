
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const DEFAULT_ADMIN = {
    id: 1,
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin"
};

// Read data from LocalStorage
const getLocalData = (key, fallback) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
};

export const AuthProvider = ({ children }) => {

    const [admin] = useState(() => {
        const savedAdmin = getLocalData("admin", null);

        if (savedAdmin) return savedAdmin;

        localStorage.setItem("admin", JSON.stringify(DEFAULT_ADMIN));
        return DEFAULT_ADMIN;
    });

    const [employees, setEmployees] = useState(() =>
        getLocalData("employees", [])
    );

    const [currentUser, setCurrentUser] = useState(() =>
        getLocalData("loggedInUser", null)
    );
     
    const logout = () => {
        setCurrentUser(null);
    };

    // Save employees whenever their state changes
    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    // Save current user whenever login state changes
    useEffect(() => {
        localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
    }, [currentUser]);


    const signup = (name, email, password) => {

    const existingEmployee = employees.find(
        (employee) => employee.email === email
    );

    if (existingEmployee) {
        return {
            success: false,
            message: "Email already registered"
        };
    }

    const newEmployee = {
        id: Date.now(),
        name,
        email,
        password,
        role: "employee"
    };

    setEmployees((prevEmployees) => [
        ...prevEmployees,
        newEmployee
    ]);

    return {
        success: true,
        message: "Registration successful"
    };
   };

   const login = (email, password) => {

    // Check Admin credentials
    if (admin.email === email && admin.password === password) {
        setCurrentUser(admin);

        return {
            success: true,
            role: "admin",
            message: "Admin login successful"
        };
    }

    // Check Employee credentials
    const employee = employees.find(
        (emp) => emp.email === email && emp.password === password
    );

    if (employee) {
        setCurrentUser(employee);

        return {
            success: true,
            role: "employee",
            message: "Employee login successful"
        };
    }

    return {
        success: false,
        message: "Invalid email or password"
    };
    };

    const [tasks, setTasks] = useState(() =>
    getLocalData("tasks", [])
    );

    useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <AuthContext.Provider value={{
            admin,
            employees,
            setEmployees,
            currentUser,
            setCurrentUser,
            signup,
            login,
            tasks,
            setTasks,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
