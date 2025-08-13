import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const { username, email, password, password2 } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match');
            // Later: Show alert to user
        } else {
            const newUser = {
                username,
                email,
                password
            };

            try {
                const res = await axios.post('/api/auth/register', newUser);

                console.log('Registration Success:', res.data);
                // We will handle redirect and state management later

                navigate('/login');
            } catch (err) {
                console.error('Registration Error:', err.response.data);
                // We will show an error message to the user here later
            }
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
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    type="submit"
                >
                    Register
                </button>
            </div>
        </form>

    </div>
  )
}

export default Register