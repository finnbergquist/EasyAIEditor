import React, { useState } from 'react';
import Header from '../../Header/Header';

const ImageEditor = ({ form }) => {
  const [editingText, setEditingText] = useState('');

  const handleTextChange = (e) => {
    setEditingText(e.target.value);
  };

  return (
    <div className="flex flex-col h-full">
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
        {/* Image Container */}
        <div className="h-4/5 w-full max-w-screen-lg border border-gray-300 rounded-lg overflow-hidden">
          <img
            src={form.selectedImage}
            alt="Editable Image"
            className="object-contain p-4 w-full h-full"
          />
        </div>

        {/* Text Editor and Button */}
        <div className="mt-4 flex flex-col items-center">
          <textarea
            value={editingText}
            onChange={handleTextChange}
            placeholder="Add your text here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <button className="mt-3 px-4 py-2 border border-blue-500 rounded-md bg-blue-500 text-white hover:bg-blue-600">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
