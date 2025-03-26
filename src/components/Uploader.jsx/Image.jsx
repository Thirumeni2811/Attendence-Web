import React, { useEffect, useState, useRef } from "react";

const Image = ({ onImageSelect, fileName }) => {
    const [localFileName, setLocalFileName] = useState(fileName || "No file chosen");
    const [imageUrl, setImageUrl] = useState(fileName || "https://picsum.photos/200"); 
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (fileName) {
            setImageUrl(fileName);
            setLocalFileName(fileName);
        }
    }, [fileName]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const sampleUrl = URL.createObjectURL(file); // Generate preview URL
            setLocalFileName(file.name);
            setImageUrl(sampleUrl);
            onImageSelect(sampleUrl);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger file selection when image is clicked
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <img 
                src={imageUrl} 
                alt="Profile Preview" 
                className="w-32 h-32 rounded-full shadow-2xl object-cover cursor-pointer"
                onClick={handleImageClick} // Clicking image triggers file input
            />

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef} // Reference to hidden input
            />
        </div>
    );
};

export default Image;
