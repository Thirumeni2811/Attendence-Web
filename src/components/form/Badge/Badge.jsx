import React from 'react'

const Badge = ({ item }) => {
    const isCheckout = item?.action?.toLowerCase() === "check-out";

    return (
        <section className='w-full flex justify-center'>
            <div
                className={`p-1 w-24 rounded-2xl text-center ${
                    isCheckout ? 'bg-red-500 text-white' : 'bg-green-900 text-white'
                }`}
            >
                {item?.action || "-"}
            </div>
        </section>
    );
};

export default Badge;
