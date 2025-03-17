import React from 'react'

const Button1 = ({ name, loading }) => {
  return (
    <button
      type="submit"
      className='bg-primary text-white w-full px-14 py-2.5 text-lg rounded-xl font-bold cursor-pointer flex items-center justify-center'
      // disabled={loading} 
    >
      {loading ? (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
      ) : (
        name
      )}
    </button>
  )
}

export default Button1
