import React from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const Edit = ({ onClick }) => {
  return (
    <>
        <button onClick={onClick} className='cursor-pointer'>
            <EditRoundedIcon />
        </button>
    </>
  )
}

export default Edit