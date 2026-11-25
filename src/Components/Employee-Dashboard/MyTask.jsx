import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';


const MyTask = () => {

    const { currentUser, tasks, setTasks } = useContext(AuthContext);
    const [filter, setFilter] = useState("All");
  
    const myTasks = tasks.filter(
      (task) => task.assignedTo === currentUser.email
    );
  
    const newTaskCount = myTasks.filter(
      (task) => task.newTask
    ).length;
  
    const activeTaskCount = myTasks.filter(
      (task) => task.active
    ).length;
  
    const completedTaskCount = myTasks.filter(
      (task) => task.complete
    ).length;
  
    const failedTaskCount = myTasks.filter(
      (task) => task.failed
    ).length;

    const filteredTasks = myTasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "New") return task.newTask;
    if (filter === "Active") return task.active;
    if (filter === "Completed") return task.complete;
    if (filter === "Failed") return task.failed;
    });


    const updateTaskStatus = (taskId, newStatus) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === taskId
                ? {
                    ...task,
                    newTask: newStatus === "New",
                    active: newStatus === "Active",
                    complete: newStatus === "Completed",
                    failed: newStatus === "Failed"
                }
                : task
        )
      );
    };

  return (
    <div className="h-screen bg-gray-100 p-8 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">
          My Tasks
        </h1>
        <p className="text-gray-500 mt-2">
          Manage and track all your assigned tasks.
        </p>
      </div>

      {/* Task Summary */}
      <div className="grid grid-cols-4 gap-5 mb-6 shrink-0">
        {[
          { title: "New Tasks", count: newTaskCount },
          { title: "Active Tasks", count: activeTaskCount },
          { title: "Completed", count: completedTaskCount },
          { title: "Failed", count: failedTaskCount }
        ].map((item,idx) => (
          <div key={idx} className="bg-white p-5 rounded-lg shadow-sm">
            <p className="text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-bold mt-2">{item.count}</h2>
          </div>
        ))}
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex-1 min-h-0 flex flex-col">

        {/* Filters */}
        <div className="flex gap-6 border-b mb-5 shrink-0">
          {["All", "New", "Active", "Completed", "Failed"].map((item) => (
         <button
        key={item}
        onClick={() => setFilter(item)}
        className={`pb-3 ${
            filter === item
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
                 }`}
               >
             {item}
        </button>
        ))}
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1 min-h-0">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="pb-4">Task</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Assigned Date</th>
                <th className="pb-4">Due Date</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
    {filteredTasks.map((task) => {

        let status = "";
        let statusColor = "";

        if (task.newTask) {
            status = "New";
            statusColor = "text-blue-600";
        }
        else if (task.active) {
            status = "Active";
            statusColor = "text-orange-500";
        }
        else if (task.complete) {
            status = "Completed";
            statusColor = "text-green-600";
        }
        else if (task.failed) {
            status = "Failed";
            statusColor = "text-red-600";
        }

          return (
            <tr key={task.id} className="border-b text-sm">
                <td className="py-5 font-medium">{task.taskTitle}</td>
                <td className="py-5 text-gray-500">{task.category}</td>
                <td className="py-5 text-gray-500">{task.assignedDate}</td>
                <td className="py-5 text-gray-500">{task.taskDate}</td>
                <td className={`py-5 ${statusColor}`}>{status}</td>

                <td className="py-5">
                  {task.newTask && (
                    <button
                     onClick={() => updateTaskStatus(task.id, "Active")}
                     className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Accept Task
                    </button>
                  )}

                  {task.active && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateTaskStatus(task.id, "Completed")}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                     Complete
                    </button>

                    <button
                     onClick={() => updateTaskStatus(task.id, "Failed")}
                     className="bg-red-500 text-white px-3 py-1 rounded"
                     >
                     Failed
                    </button>
                  </div>
                 )}

                 {(task.complete || task.failed) && (
                   <span className="text-gray-400">No action</span>
                )}
               </td>
            </tr>
          );
        })}
           </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default MyTask;
