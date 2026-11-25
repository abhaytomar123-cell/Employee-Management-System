import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const CreateTask = () => {

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [category, setCategory] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    const { employees, tasks, setTasks } = useContext(AuthContext);

    const SubmitHandler = (e) => {
    e.preventDefault();

    if (
    !taskTitle.trim() ||
    !taskDescription.trim() ||
    !taskDate ||
    !category.trim() ||
    !assignedTo
    ) {
    alert("Please fill all the fields");
    return;
    }

    const newTask = {
        id: Date.now(),
        taskTitle,
        taskDescription,
        taskDate,
        category,
        assignedTo,
        newTask: true,
        active: false,
        complete: false,
        failed: false,
        assignedDate: new Date().toISOString().split("T")[0],
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setCategory("");
    setAssignedTo("");

    alert("Task created successfully!");
    };


    return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">Create New Task</h1>

        <form onSubmit={SubmitHandler} className="flex flex-col gap-4">

            {/* Task Title */}
            <input
                type="text"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="border p-3 rounded"
            />

            {/* Task Description */}
            <textarea
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="border p-3 rounded"
            />

            {/* Task Date */}
            <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className="border p-3 rounded"
            />

            {/* Category */}
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-3 rounded"
            />

            {/* Employee Dropdown */}
            <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="border p-3 rounded"
            >
                <option value="">Select Employee</option>

                {employees.map((employee) => (
                    <option key={employee.id} value={employee.email}>
                        {employee.name} - {employee.email}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded cursor-pointer hover:bg-blue-700"
            >
                Create Task
            </button>

        </form>
    </div>
);
};

export default CreateTask;