import React from 'react';

const JournalEntry = ({ entry, onEdit, onDelete }) => {
    return (
        <div key={entry._id} className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
            <p className="text-gray-700">{entry.content}</p>
            
            <div className="flex justify-between items-center mt-4">
                <small className="text-gray-500 block">
                    Saved on: {new Date(entry.date).toLocaleString()}
                </small>
                <div className="space-x-2">
                    {/* Edit Button */}
                    <button
                        onClick={() => onEdit(entry)}
                        className="bg-blue-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Edit
                    </button>
                    {/* Delete Button */}
                    <button
                        onClick={() => onDelete(entry._id)}
                        className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JournalEntry;