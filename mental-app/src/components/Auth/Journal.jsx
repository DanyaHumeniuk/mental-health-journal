import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Journal = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [entries, setEntries] = useState([]);
    const [editingEntry, setEditingEntry] = useState(null);
    const { title, content } = formData;
    const navigate = useNavigate();

    const fetchEntries = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found.');
                navigate('/login');
                return;
            }

            const config = {
                headers: {
                    'x-auth-token': token
                }
            }

            const res = await axios.get('/api/journal', config);
            setEntries(res.data);
            console.log('Entries fetched successfully:', res.data);
        } catch (err) {
            console.error('Error fetching entries:', err.response.data);
        }
    };

    useEffect(() => {
            fetchEntries();
    }, []);

    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onEdit = (entry) => {
        setEditingEntry(entry);
        setFormData({
            title: entry.title,
            content: entry.content
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onCancelEdit = () => {
        setEditingEntry(null);
        setFormData({ title: '', content: '' });
    };

    const onDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const config = {
                headers: {
                    'x-auth-token': token
                }
            };

            await axios.delete(`/api/journal/${id}`, config);

            console.log('Journal entry deleted successfully!');

            fetchEntries();
        } catch (err) {
            console.error('Failed to delete journal entry:', err.response.data);
        }
    };

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
            };

            const entryData = { title, content };

            if (editingEntry) {
                await axios.put(`/api/journal/${editingEntry._id}`, entryData, config);
                console.log('Journal entry updated successfully!');
            } else {
                await axios.post('/api/journal', entryData, config);
                console.log('Journal entry saved successfully!');
            }

            setFormData({ title: '', content: ''});
            setEditingEntry(null);

            fetchEntries();

        } catch (err) {
            console.error('Failed to save journal entry:', err.response.data);
        }
    }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Your Journal Dashboard</h1>
            <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            >
                Logout
            </button>
        </div>

        <p className="text-lg text-gray-600 mb-8">
            This is where you'll be able to create, view, and manage your journal entries.
        </p>

        {/* Journal Entry Form */}
        <form onSubmit={onSubmit} className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {editingEntry ? 'Edit Entry' : 'Create New Entry'}
            </h2>
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
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className={`font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 w-full transition duration-300 ${
                        editingEntry ? 'bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-500' : 'bg-green-500 hover:bg-green-700 text-white focus:ring-green-500'
                    }`}
                >
                    {editingEntry ? 'Save Changes' : 'Save Entry'}
                </button>
                {editingEntry && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-gray-400 w-full md:w-1/3"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>

        {/* Journal Entries List - Displaying the fetched data */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Entries</h2>
        <div>
            {entries.length > 0 ? (
                entries.map(entry => (
                    <div key={entry._id} className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
                        <p className="text-gray-700">{entry.content}</p>
                        
                        <div className="flex justify-between items-center mt-4">
                            <small className="text-gray-500 mt-2 block">
                                Saved on: {new Date(entry.date).toLocaleString()}
                            </small>
                            <div className="space-x-2">
                                <button
                                    onClick={() => onEdit(entry)}
                                    className="bg-blue-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(entry._id)}
                                    className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No entries found. Start by writing your first one!</p>
            )}
        </div>
    </div>
  )
}

export default Journal