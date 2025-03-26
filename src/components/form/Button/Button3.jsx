import React from 'react';

const Button3 = ({ name, loading }) => {
    return (
        <button
            type="submit"
            className="bg-primary text-white dark:text-darkColor px-8 py-2 rounded-xl font-bold cursor-pointer flex items-center justify-center"
        >
            {loading ? (
                <span className="animate-spin border-2 border-solid border-white dark:border-darkColor border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
                name
            )}
        </button>
    );
};

export default Button3;
