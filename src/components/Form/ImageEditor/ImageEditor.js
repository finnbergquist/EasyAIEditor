import React, { useState, useRef } from 'react';
import { Lasso, Crop } from 'lucide-react';
import Mask from './Mask';

const ImageEditor = ({ form }) => {
    const [editingText, setEditingText] = useState('');
    const [selectedOption, setSelectedOption] = useState({ value: 'box', Icon: Crop, title: 'Box' });
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleTextChange = (e) => {
        setEditingText(e.target.value);
    };

    const handleEditClick = () => {
        console.log('Editing text:', editingText);
    }

    const options = [
        { value: 'lasso', Icon: Lasso, title: 'Lasso' },
        { value: 'box', Icon: Crop, title: 'Box' },
    ];


    return (
        <div className="flex flex-col h-full rounded-lg">
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
                {/* Image Container */}
                <div className="h-4/5 w-full max-w-screen-lg overflow-hidden flex flex-row">
                    <div className='flex-none mr-4 h-full p-4 bg-gray-100 rounded-lg border border-gray-300 flex flex-col items-start'>
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!isDropdownOpen)}
                                className="w-16 h-16 border border-gray-300 rounded-md text-gray-700 flex items-center justify-center"
                            >
                                <selectedOption.Icon size={18} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-full mt-2 w-16 rounded-md shadow-lg bg-white z-20">
                                    {options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedOption(option);
                                                setDropdownOpen(false);
                                            }}
                                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
                                        >
                                            <option.Icon size={18} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <Mask 
                        form = {form}
                    />
                    {/* <div className="flex-grow h-full p-2 bg-gray-100 rounded-lg border border-gray-300 relative">
                        {form.selectedImage ? (
                            
                            <Mask
                                form = {form} 
                            />
                            // <img
                            //     src={form.selectedImage}
                            //     alt="Selected Image"
                            //     className="h-full w-full object-contain"
                            // />

                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                No image selected
                            </div>
                        )}
                    </div> */}
                </div>

                {/* Text Editor and Button */}
                <div className="mt-4 flex w-full max-w-screen-lg items-center">
                    <textarea
                        value={editingText}
                        onChange={handleTextChange}
                        placeholder="Add your text here..."
                        className="resize-none flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                    <button
                        className="ml-4 px-4 py-5 border border-gray-300 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageEditor;
