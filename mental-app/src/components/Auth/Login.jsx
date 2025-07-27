import { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        console.log('Logging in user:', formData);
        // Later: Send data to backend
    };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
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
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    type="submit"
                >
                    Login
                </button>
            </div>
        </form>
    </div>
  )
}

export default Login