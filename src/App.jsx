import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/auth/Login'
import SignUp from './Components/auth/SignUp'
import EDB from './Components/Employee-Dashboard/EDB'
import MyTask from './Components/Employee-Dashboard/MyTask'
import Profile from './Components/Employee-Dashboard/Profile'
import CreateTask from './Components/Admin-Dashboard/CreateTask'


const App = () => {
  return (
     <Routes>
       {<Route path="/" element={<Login/>}/>}
       {<Route path="/signup" element={<SignUp/>}/>}
       {<Route path="/employee-dashboard" element={<EDB/>}/>}
       {<Route path="/my-task" element={<MyTask/>}/>}
       {<Route path="/profile" element={<Profile/>}/>}
       {<Route path="/create-task" element={<CreateTask/>}/>}
     </Routes>

   )
}

export default App
