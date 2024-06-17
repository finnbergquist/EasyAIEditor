import { UploadCloud, Loader } from "lucide-react";
import { uploadFile, submitForm, getUser } from "../../../api/api";
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import resizeImage from "./imageHelpers";

const ImageUploader = ({ form, setForm, user, setUser }) => {
    const [loading, setLoading] = useState(false);
    const [startWith, setStartWith] = useState("image");
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState("");
    const [imageError, setImageError] = useState(false);
    const [textError, setTextError] = useState(false);

    const handleDrop = async (e) => {
        setImageError(false);
        e.preventDefault();
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        if (!file || file.type !== 'image/png') {
            setImageError(true);
            return;
        }

        setLoading(true);
        try {
            const resizedFile = await resizeImage(file);
            const response = await uploadFile(resizedFile);
            if (response.status === "success") {
                setLoading(false);
                form.selectedImage = response.url;
                form.images = [response.url];
                await submitForm(form, user.user_id)
                    .then(data => {
                        setForm(data.data);
                        setLoading(false);
                        navigate(`/form/${data.form_id}`);
                    })
                    .catch(error => {
                        if (error.message === 'Unauthorized') {
                            navigate('/login');
                          }
                        console.error('Error:', error);
                    });
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handlePromptSubmit = async () => {
        setTextError(false);
        if (form.prompt === "") {
            setTextError(true);
            return;
        }
        if (user.data.freeAPIRequests <= 0) {
            alert("You have reached the limit of free API calls. Please enter your own API key to continue using the service");
            return;
        }
        setLoading(true);
        form.selectedImage = "";
        form.images = [];
        await submitForm(form, user.user_id)
            .then(data => {
                setForm(data.data);
                setLoading(false);
                getUser(user.user_id)
                    .then(data => {
                        setUser(data);
                    })
                    .catch(error => {
                        if (error.message === 'Unauthorized') {
                            navigate('/login');
                        }
                        console.error('Error:', error);
                    }
                );
                navigate(`/form/${data.form_id}`);
            })
            .catch(error => {
                if (error.message === 'Unauthorized') {
                    navigate('/login');
                }
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <div className="flex items-center py-2">
                <button
                    className={`flex-grow p-2 text-center text-xl hover:bg-gray-200 rounded cursor-pointer ${startWith === "image" ? "bg-gray-200" : ""}`}
                    onClick={() => setStartWith("image")}
                >
                    Start with Image
                </button>
                <div className="border-l border-gray-300 h-6 mx-2"></div>
                <button
                    className={`flex-grow p-2 text-center text-xl hover:bg-gray-200 rounded cursor-pointer ${startWith === "prompt" ? "bg-gray-200" : ""}`}
                    onClick={() => setStartWith("prompt")}
                >
                    Start with Prompt
                </button>
            </div>
            <div className="mb-2">
                    <hr/>
            </div>
            {startWith === "image" ? (
                <div>
                <section
                    className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-md"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <div className="w-full flex justify-start">
                        {loading && <Loader className="animate-spin h-5 w-5 ml-3" />}
                        {imageError && (
                            <div className="border border-red-500 bg-red-100 rounded p-1 text-red-500">
                                Please upload a PNG image
                            </div>
                        )}
                    </div>
                    <UploadCloud className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-xl mb-6 text-gray-700">
                        Drop your image here
                    </p>
                    <p className="text-center mb-8 text-gray-500">
                        or
                    </p>
                    <label
                        className="bg-blue-200 hover:bg-blue-300 text-black py-2 px-4 rounded cursor-pointer"
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
            ) : (
                <div>
                <section className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-md">
                    <div className="w-full flex justify-start">
                        {loading && <Loader className="animate-spin h-5 w-5 ml-3" />}
                    </div>
                    <textarea
                        className={`w-full p-4 mb-6 text-gray-700 bg-white rounded border ${textError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                        rows="5"
                        placeholder="A T-rex eating dinner at Wendy's"
                        value={form.prompt}
                        onChange={(e) => {
                            setTextError(false);
                            setForm({...form, prompt: e.target.value})
                        }}
                    />
                    <button
                        className="bg-blue-200 hover:bg-blue-300 text-black py-2 px-4 rounded cursor-pointer"
                        onClick={handlePromptSubmit}
                        disabled={loading}
                    >
                        Submit Prompt
                    </button>
                </section>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
