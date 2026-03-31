import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();

        setIsLoading(true);

        const user = {
            email,
            password
        };

        try {
            const res = await axios.post('https://mental-journal-api.onrender.com/api/auth/login', user);

            // Store the JWT token in local storage
            localStorage.setItem('token', res.data.token);
            toast.success('Welcome back!');
            navigate('/journal');

        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Login failed. Please check your credentials.';
            toast.error(errorMsg);
            console.error('Login Error:', err.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl min-h-52 sm:min-h-64 md:min-h-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
                </label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    disabled={isLoading}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="********"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    minLength="6"
                    disabled={isLoading}
                />
            </div>
            <div className="flex flex-col items-center">
                <button
                    className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ${
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
                    }`}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                        </div>
                    ) : 'Login'}
                </button>
                
                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                        New to the journal?{' '}
                        <Link to="/register" className="text-green-600 hover:text-green-800 font-bold underline transition duration-200">
                            Create an Account
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login