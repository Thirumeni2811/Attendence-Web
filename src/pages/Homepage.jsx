import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <>
      <section className='h-svh flex justify-center items-center gap-20'>
        <Link to="/login" className='px-12 py-3 bg-primary cursor-pointer rounded-xl'>
          Login
        </Link>
        <Link to="/register" className='px-12 py-3 bg-primary cursor-pointer rounded-xl'>
          Register
        </Link>
      </section>
    </>
  )
}

export default Homepage