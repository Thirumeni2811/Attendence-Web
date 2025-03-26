import React, { useEffect, useState } from "react";

const ImageSelector = ({ onImageSelect, fileName }) => {
    const [localFileName, setLocalFileName] = useState(fileName || "No file chosen");
    
    useEffect(() => {
        setLocalFileName(fileName);
    }, [fileName]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // setLocalFileName(file.name); 
            // onImageSelect(file); 
            const sampleUrl = "https://picsum.photos/200"; 
            setLocalFileName(sampleUrl); 
            onImageSelect(sampleUrl); 
        } else {
            setLocalFileName("No file chosen");
        }
    };

    return (
        <div className="flex flex-col items-center truncate">
            <label htmlFor="imageUpload" className="cursor-pointer text-primary bg-bgColor h-[3.438rem] rounded-xl w-full flex items-center">
                <span className="font-bold text-white text-center bg-darkColor w-1/3 rounded-l-xl h-full flex items-center justify-center break-words whitespace-normal">
                    Choose Image
                </span>
                <span className="text-center flex-1 p-2 font-bold border-border hover:border-primary border-[0.094rem] h-full flex items-center justify-center rounded-xl rounded-l-none border-l-0 break-all whitespace-normal">
                    {localFileName}
                </span>
            </label>

            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
        </div>
    );
};

export default ImageSelector;
