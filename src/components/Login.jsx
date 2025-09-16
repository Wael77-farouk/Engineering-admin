import React from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');

  const onSubmitHandler = async (e) =>{
    try {
      e.preventDefault();

      const response = await axios.post(backendUrl + "/api/user/admin", {email,password})
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, please try again later');
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8">Login to access the Admin Panel</p>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              onChange={(e)=>setEmail(e.target.value)} value={email}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              onChange={(e)=>setPassword(e.target.value)} value={password}
              type="password"
              placeholder="********"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-2 rounded-md font-medium shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login