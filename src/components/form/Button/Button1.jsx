import React from 'react'

const Button1 = ({name}) => {
  return (
    <>
        <button
            type="submit"
            className='bg-primary text-white w-full px-14 py-2.5 text-lg rounded-xl font-bold cursor-pointer'
        >
            {name}
        </button>
    </>
  )
}

export default Button1