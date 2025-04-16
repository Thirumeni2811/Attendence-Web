import React from 'react';

const CheckBox = ({ formData, setFormData }) => {
    const handleClick = () => {
        setFormData((prevData) => ({
            ...prevData,
            role: prevData.role === 'subAdmin' ? 'user' : 'subAdmin',
        }));
    };

    return (
        <div className='flex gap-4 items-center'>
            <input
                id="role"
                name="role"
                type="checkbox"
                onChange={handleClick}
                checked={formData.role === 'subAdmin'}
                className='w-5 h-5 accent-green-600'
            />
            <div className='font-bold dark:text-[#808080]'>
                Sub-Admin
                <div className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                    can manage and get all details
                </div>
            </div>

        </div>
    );
};

export default CheckBox;
