import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Journal = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const { title, content } = formData;
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found. Please log in.');
                navigate('/login');
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            }

            const newEntry = {
                title,
                content
            }

            await axios.post('/api/journal', newEntry, config);

            console.log('Journal entry saved successfully!');

            setFormData({ title: '', content: ''});
        } catch (err) {
            console.error('Failed to save journal entry:', err.response.data);
        }
    }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
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

        {/* Journal Entry Form */}
        <form onSubmit={onSubmit} className="mb-8">
            <div className="mb-4">
                <input 
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={onChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <div className="mb-4">
                <textarea
                    placeholder="Write your journal entry here..."
                    name="content"
                    value={content}
                    onChange={onChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="8"
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-green-500 w-full"
            >
                Save Entry
            </button>
        </form>

        {/* Journal Entries List */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Entries</h2>
    </div>
  )
}

export default Journal