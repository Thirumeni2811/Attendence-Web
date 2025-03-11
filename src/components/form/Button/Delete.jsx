import React from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const Delete = ({ onClick }) => {
  return (
    <>
        <button onClick={onClick} className='cursor-pointer'>
            <DeleteOutlinedIcon />
        </button>
    </>
  )
}

export default Delete