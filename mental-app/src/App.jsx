import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Auth/Home';
import Journal from './components/Auth/Journal';
import PrivateRoute from './components/Auth/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />


      <div className="min-h-screen bg-gray-100 flex flex-col">
        
        {/* 3. Navbar stays outside Routes to show everywhere */}
        <Navbar />

        {/* 4. This inner div handles the centering for your forms */}
        <div className="flex-grow flex items-center justify-center py-10 px-4">
          <div className="w-full max-w-5xl mx-auto">
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
      </div>
    </Router>
  );
}

export default App;