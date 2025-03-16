import React from 'react'

const Error = ({ error }) => {
    if (!error) return null;
    return (
        <>
            <span className="text-red-500 text-sm mb-2 block">
                {error}
            </span>
        </>
    )
}

export default Error