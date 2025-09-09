import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/journal');
    }
  }, [navigate])
  
  return (
    <div className="flex flex-col text-center bg-white shadow-xl rounded-lg w-full justify-center items-center min-h-[800px]">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Journal!</h1>
      <p className="text-lg text-gray-600 mb-6">
        You are not logged in. Please register or log in to get started.
      </p>
      <div className="flex justify-center space-x-4 items-center">
        <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Register
        </Link>
        <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;