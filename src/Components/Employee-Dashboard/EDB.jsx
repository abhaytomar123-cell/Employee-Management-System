import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { Link ,useNavigate} from 'react-router-dom'

const EDB = () => {

  const { currentUser ,tasks,logout} = useContext(AuthContext);
  const navigate = useNavigate();

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

  return (
        <div className="h-screen bg-gray-100 flex overflow-hidden">

      {/* Sidebar */}
      <div className="w-60 bg-white p-5">
        <h1 className="text-2xl font-bold mb-10">
          EMS
        </h1>

        <nav className="space-y-4">
          <p className="bg-blue-100 text-blue-600 p-3 rounded hover:bg-blue-200 cursor-pointer">
            Dashboard
          </p>
          <p className="p-3 text-green-600  cursor-pointer bg-green-100 hover:bg-green-200"><Link to="/my-task">My Tasks</Link></p>
          <p className="p-3 text-yellow-600 cursor-pointer bg-yellow-100 hover:bg-yellow-200"><Link to="/profile">Profile</Link></p>
          <button onClick={()=>{logout();navigate("/")}} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 bg-red-100 hover:bg-red-200 cursor-pointer">
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex flex-col overflow-hidden">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Welcome Back,{currentUser?.name}!
          </h2>
          <p className="text-gray-500 mt-2">
            Here is your task overview.
          </p>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-4 gap-5 mb-8 shrink-0">

          {[{ title: "New Tasks", count: newTaskCount },
            { title: "Active Tasks", count: activeTaskCount },
            { title: "Completed", count: completedTaskCount },
            { title: "Failed", count: failedTaskCount }].map((item,idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-3xl font-bold mt-3">{item.count}</h2>
            </div>
          ))}

        </div>

        {/* Recent Tasks */}
        
{/* Recent Tasks */}
<div className="bg-white p-6 rounded-xl shadow-sm flex-1 min-h-0 flex flex-col">

  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-semibold">
      Recent Tasks
    </h2>

  </div>

  <div className="overflow-y-auto flex-1 min-h-0">
    <table className="w-full text-left">

      <thead>
        <tr className="text-gray-500 text-sm border-b">
          <th className="pb-4">Task</th>
          <th className="pb-4">Category</th>
          <th className="pb-4">Due Date</th>
        </tr>
      </thead>

      <tbody>
        {myTasks.slice(0, 4).map((task) => (
        <tr key={task.id} className="border-t">
            <td className="p-4">{task.taskTitle}</td>
            <td className="p-4">{task.category}</td>
            <td className="p-4">{task.taskDate}</td>
        </tr>
       ))}
      </tbody>

    </table>
  </div>

  </div>

      </div>
    </div>

  )
}

export default EDB