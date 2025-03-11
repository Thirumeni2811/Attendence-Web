import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Edit = ({ onClick }) => {
  return (
    <>
        <button onClick={onClick} className='cursor-pointer'>
            <EditOutlinedIcon />
        </button>
    </>
  )
}

export default Edit