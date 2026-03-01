import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Auth/Home';
import Journal from './components/Auth/Journal';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
        <div className="w-full max-w-5xl mx-auto px-4 flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Login />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/about" element={<Home />} />

            <Route path="/" element={<PrivateRoute />}>
              <Route path="/journal" element={<Journal />} />
            </Route>
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;