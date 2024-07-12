import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lasso, Crop, Loader } from 'lucide-react';
import { updateForm, getUser } from '../../../api/api';
import Mask from './Mask';

const ImageEditor = ({ setForm, form, id, user, setUser}) => {
    const [selectedOption, setSelectedOption] = useState({ value: 'box', Icon: Crop, title: 'Box' });
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState(null);
    const [loading, setLoading] = useState(false);
    const [textError, setTextError] = useState(false);
    const navigate = useNavigate();

    const handleTextChange = (e) => {
        setForm(
            {
                ...form,
                prompt: e.target.value,
            }
        );
        setTextError(false);
    };

    const scaleValue = (selectedArea) => {
        const { left, top, width, height } = selectedArea;
        const ratio = 1024/600;
        return {
            left: Math.floor(left * ratio),
            top: Math.floor(top * ratio),
            width: Math.floor(width * ratio),
            height: Math.floor(height * ratio),
        };
    };

    const handleEditClick = () => {
        if (form.prompt === "") {
            setTextError(true);
            return;
        }
        if (user.data.freeAPIRequests <= 0 && !user.data.openAPIKey) {
            alert("You have reached the limit of free API calls. Please enter your own API key to continue using the service");
            return;
        }

        if (!selectedArea) {
            setSelectedArea({
                left: 0,
                top: 0,
                width: 600,
                height: 600
            });
        }
        if (selectedArea) {
            setLoading(true);
            const updatedForm = {
                ...form,
                mask: 
                    {
                        type: selectedOption.value,
                        area: scaleValue(selectedArea),
                    },
            };
            const response = updateForm(updatedForm, id)
                .then(data => {
                    setLoading(false);
                    if (data.error) {
                        alert("Incorrect API key. Please try again.");
                        return;
                    }
                    setForm(data.data);
                    getUser(user.user_id)
                        .then(data => {
                            setUser(data);
                        }
                    );
                    setSelectedArea(null);
                })
                .catch(error => {
                    if (error.message === 'Unauthorized') {
                        navigate('/login');
                    }
                    setLoading(false);
                    console.error('Error:', error);
                });
        }
    }

    const options = [
        { value: 'box', Icon: Crop, title: 'Box' },
    ];


    return (

        <div className="flex flex-col h-full rounded-lg" style={{ maxHeight:'750px' }}>
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
                {/* Image Container */}
                <div className="h-4/5 overflow-hidden flex flex-row">
                    <div className='flex-none mr-4 h-full p-4 bg-gray-100 rounded-lg border border-gray-300 flex flex-col items-start' style={{maxHeight:'600px'}}>
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!isDropdownOpen)}
                                className="w-16 h-16 border border-gray-300 rounded-md text-gray-700 flex items-center justify-center"
                            >
                                <selectedOption.Icon size={18} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-full mt-2 w-16 rounded-md shadow-lg bg-white z-20 ">
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
                        <div className="mt-4">
                            <h3 className="mb-2 border-b border-gray-300">Versions</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {form.images.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Version ${index + 1}`}
                                        className={`w-16 h-auto border rounded ${url === form.selectedImage ? 'border-blue-500' : 'border-gray-300'}`}
                                        onClick={() => {
                                            setForm({ ...form, selectedImage: url });
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Mask 
                        form = {form}
                        selectedArea = {selectedArea}
                        setSelectedArea = {setSelectedArea}
                    />
                </div>
                {/* Text Editor and Button */}
                <div className="flex w-full p-4 max-w-screen-lg items-center" style={{ maxWidth: '740px'}}>
                    <textarea
                        value={form.prompt}
                        onChange={handleTextChange}
                        placeholder="Add your text here..."
                        className={`resize-none flex-grow px-3 py-2 border rounded-md bg-gray-100 ${textError ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <button
                        className="ml-4 px-4 py-5 border border-gray-300 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                        onClick={handleEditClick}
                        disabled={loading}
                    >
                        {loading ? <Loader className="animate-spin h-5 w-5 ml-3" /> : 'Edit'}
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default ImageEditor;
