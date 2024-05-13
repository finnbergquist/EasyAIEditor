import { UploadCloud } from "lucide-react";
import { uploadFile } from "../../../api/api";
import React from "react";
import { Loader } from 'lucide-react';
import { submitForm } from "../../../api/api";
import { useNavigate } from 'react-router-dom';

const ImageUploader = ({form, setForm, user}) => {
    const [loading, setLoading] = React.useState(false);
    const fileInputRef = React.useRef(null);
    const navigate = useNavigate();

    const handleDrop = async (e) => {
        setLoading(true);
        e.preventDefault();
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        try {
            const response = await uploadFile(file);
            if (response.status === "success") { 
                setLoading(false); 
                form.selectedImage = response.url;
                await submitForm(form, user.user_id)
                    .then(data => {
                    setForm(data.data);
                    setLoading(false)
                    navigate(`/form/${data.form_id}`);
                    })
                    .catch(error => {
                    console.error('Error:', error);
                    // Handle the error as needed
                });
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <header className="grid grid-cols-2 items-center">
            <button className="text-left text-xl hover:bg-gray-200 rounded cursor-pointer">
                Start with Image
            </button>
            <button className="text-left text-xl hover:bg-gray-200 rounded cursor-pointer">
                Start with Prompt
            </button>
            </header>
            <div className="mb-4">
                <hr />
            </div>
            <section
                className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-md"
                onDrop={handleDrop}
                onDragOver={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="w-full flex justify-start">
                    {loading && <Loader className="animate-spin h-5 w-5 ml-3" />}
                </div>
                <UploadCloud className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-xl mb-6 text-gray-700">
                    Drop your image here
                </p>
                <p className="text-center mb-8 text-gray-500">
                    or
                </p>
                <label
                    className="bg-blue-200 hover:bg-blue-300 text-black py-2 px-4 rounded-none cursor-pointer"
                    onClick={handleClick}
                >
                    Upload Image
                </label>
                <input
                    id="imageUpload"
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleDrop}
                />
            </section>
        </div>
    );
};

export default ImageUploader;