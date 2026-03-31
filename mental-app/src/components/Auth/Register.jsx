import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const { username, email, password, password2 } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        
        if (password !== password2) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsLoading(true);

        try {
            const newUser = {
                username,
                email,
                password
            };

            const res = await axios.post('https://mental-journal-api.onrender.com/api/auth/register', newUser);

            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                toast.success('Account created! Welcome to your journal.');
                navigate('/journal');
            }

        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Registration failed. Please try again.';
            toast.error(errorMsg);
            console.error('Registration Error:', err.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl min-h-52 sm:min-h-64 md:min-h-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Register Account</h2>
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                    disabled={isLoading}
                />
            </div>
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
            <div className="mb-4">
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
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
                    Confirm Password
                </label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password2"
                    type="password"
                    placeholder="********"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    required
                    minLength="6"
                    disabled={isLoading}
                />
            </div>
            <div className="flex flex-col items-center">
                <button
                    className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ${
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
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
                            Creating Account...
                        </div>
                    ) : 'Register'}
                </button>
                
                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:text-blue-700 font-bold underline transition duration-200">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </form>

    </div>
  )
}

export default Register