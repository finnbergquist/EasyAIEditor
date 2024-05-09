import React from 'react';
import { Box } from "@radix-ui/themes"

const ImageSelector = ({form, setForm}) => {
    const selectedImage = form.selectedImage;
    const images = form.images;

    const handleImageClick = (imageUrl) => {
        if (selectedImage === imageUrl) {
            setForm({
                ...form,
                selectedImage: 0
            });
            return;
        }
        setForm({
            ...form,
            selectedImage: imageUrl
        });
    };

    return (
        <div className='h-screen flex p-4'>
            <div className='grid grid-rows-3 gap-4 w-1/5 border h-full'>
                {images.map((image, index) => (
                    <div key={index} className="p-4 flex justify-center items-center">
                        {image !== false && (
                            image === "loading" ? (
                                <Box className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
                            ) : (
                                <img
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    onClick={() => handleImageClick(image)}
                                    className={`object-contain max-h-full ${selectedImage === image ? "ring-4 ring-blue-500" : ""}`}
                                />
                            )
                        )}
                    </div>
                ))}
            </div>
            <div className='w-4/5 border p-4 h-full flex items-center justify-center'>
                {selectedImage !== 0 ? (
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <p className="text-lg font-semibold text-gray-500">Select a design</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageSelector;