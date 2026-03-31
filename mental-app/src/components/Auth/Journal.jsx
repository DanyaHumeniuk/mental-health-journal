import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import JournalEntry from '../JournalEntry'
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://mental-journal-api.onrender.com";

const Journal = () => {
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [entries, setEntries] = useState([]);
    const [editingEntry, setEditingEntry] = useState(null);
    
    const [isSaving, setIsSaving] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const { title, content } = formData;
    const navigate = useNavigate();

    const fetchEntries = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) { navigate('/login'); return; }

            const config = { headers: { 'x-auth-token': token } };
            const res = await axios.get(`${API_BASE_URL}/api/journal`, config);
            setEntries(res.data);
        } catch (err) {
            console.error('Error fetching entries:', err.response?.data);
        }
    };

    useEffect(() => { fetchEntries(); }, []);

    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onEdit = (entry) => {
        setEditingEntry(entry);
        setFormData({ title: entry.title, content: entry.content });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onCancelEdit = () => {
        setEditingEntry(null);
        setFormData({ title: '', content: '' });
    };

    const onDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this entry?")) return;
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            await axios.delete(`${API_BASE_URL}/api/journal/${id}`, config);
            toast.success('Entry deleted.'); 
            fetchEntries(); 
        } catch (err) {
            toast.error('Failed to delete.');
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        setIsSaving(true); 
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'Content-Type': 'application/json', 'x-auth-token': token } };
            const entryData = { title, content };

            if (editingEntry) {
                await axios.put(`${API_BASE_URL}/api/journal/${editingEntry._id}`, entryData, config);
                toast.success('Entry updated!');
            } else {
                await axios.post(`${API_BASE_URL}/api/journal`, entryData, config);
                toast.success('Journal entry saved!');
            }

            setFormData({ title: '', content: ''});
            setEditingEntry(null);
            fetchEntries();
        } catch (err) {
            toast.error('Failed to save.');
        } finally {
            setIsSaving(false); 
        }
    };

    const analyzeEntry = async (id) => {
        const loadingToast = toast.loading('Gemini is analyzing your entry...');
        setIsAnalyzing(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            await axios.post(`${API_BASE_URL}/api/journal/analyze/${id}`, {}, config);
            toast.success('Insight generated! ✨', { id: loadingToast });
            fetchEntries(); 
        } catch (err) {
            toast.error('AI Analysis failed.', { id: loadingToast });
        } finally {
            setIsAnalyzing(false);
        }
    };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mr-32">Your Journal Dashboard</h1>
            <button onClick={onLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
                Logout
            </button>
        </div>

        {/* Journal Entry Form */}
        <form onSubmit={onSubmit} className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{editingEntry ? 'Edit Entry' : 'Create New Entry'}</h2>
            <div className="mb-4">
                <input 
                    name="title" value={title} onChange={onChange} required disabled={isSaving}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    placeholder="Title"
                />
            </div>
            <div className="mb-4">
                <textarea
                    name="content" value={content} onChange={onChange} required disabled={isSaving}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    rows="8" placeholder="Write your journal entry here..."
                ></textarea>
            </div>
            <div className="flex space-x-4">
                <button
                    type="submit"
                    disabled={isSaving}
                    className={`font-bold py-2 px-4 rounded-lg w-full transition duration-300 flex items-center justify-center ${
                        editingEntry ? 'bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'
                    } text-white disabled:bg-gray-400`}
                >
                    {isSaving ? (
                        <><svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Saving...</>
                    ) : (editingEntry ? 'Save Changes' : 'Save Entry')}
                </button>
            </div>
        </form>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Entries</h2>
        <div>
            {entries.length > 0 ? (
                entries.map(entry => (
                    <JournalEntry
                        key={entry._id}
                        entry={entry}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onAnalyze={analyzeEntry}
                        isAnalyzing={isAnalyzing} 
                    />
                ))
            ) : (
                <p className="text-center text-gray-500">No entries found. Start by writing your first one!</p>
            )}
        </div>
    </div>
  )
}

export default Journal