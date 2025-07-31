import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold text-center mt-8">Welcome to Mental Health Journal App!</h1>
      
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <Register />
          <Login />
        </div>
      </div>
    </div>
  )
}

export default App