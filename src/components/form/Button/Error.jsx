import React from 'react'

const Error = ({ error }) => {
    if (!error) return null;
    return (
        <>
            <span className="text-red-500 text-sm block">
                {error}
            </span>
        </>
    )
}

export default Error