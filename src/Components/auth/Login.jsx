import React, { useContext } from 'react'
import { useState } from "react";
import { Link , useNavigate,Navigate} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login, currentUser } = useContext(AuthContext);

    if (currentUser) {
      if (currentUser.role === "admin") {
        return <Navigate to="/create-task" replace />;
      }

      return <Navigate to="/employee-dashboard" replace />;
    }

    const handleSubmit = (e) =>{ 
    e.preventDefault();
    const result = login(email,password);

    if(result.success){
         setEmail("");
         setPassword("");
      if(result.role === "admin"){
        navigate("/create-task");
      }else if(result.role === "employee"){
        navigate("/employee-dashboard");
      }else{
        alert(result.message);
      }

    }
      
  };
  return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Employee Management System
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Log in to your account
        </p>

        <form onSubmit={handleSubmit}  autoComplete="off" className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="off" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="off" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
          </Link>
        </p>
      </div>
    </div>    
  )
}

export default Login