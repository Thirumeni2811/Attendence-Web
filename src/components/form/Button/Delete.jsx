import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Delete = ({ onClick }) => {
  return (
    <>
        <button onClick={onClick} className='cursor-pointer'>
            <DeleteRoundedIcon />
        </button>
    </>
  )
}

export default Delete