import { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const { username, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match');
            // Later: Show alert to user
        } else {
            console.log('Registering user:', formData);
            // Later: Send data to backend
        }
    };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
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