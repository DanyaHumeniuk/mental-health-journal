import { useNavigate } from 'react-router-dom'

const Journal = () => {

    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('token');

        navigate('/login');
    }
  return (
    <div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Journal Dashboard</h1>
        <p className="text-lg text-gray-600 mb-8">
            This is where you'll be able to create, view, and manage your journal entries.
        </p>
        <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
        >
            Logout
        </button>
    </div>
  )
}

export default Journal