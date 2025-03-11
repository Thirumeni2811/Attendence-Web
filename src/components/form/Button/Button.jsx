import React from 'react'

const Button = ({name}) => {
  return (
    <>
        <button
            type="submit"
            className='bg-primary text-white dark:text-darkColor px-8 py-2 rounded-xl font-bold cursor-pointer'
        >
            {name}
        </button>
    </>
  )
}

export default Button