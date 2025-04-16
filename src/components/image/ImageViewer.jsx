import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

const ImageViewer = ({ imgUrl, name }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className='flex justify-center'>
      <div className='w-12 h-12 rounded-full cursor-pointer relative'>
        {(!imgUrl || !isLoaded) && (
          <div className='absolute inset-0 bg-white dark:bg-black shadow-2xl rounded-full flex items-center justify-center z-10'>
            <PersonIcon fontSize="large" />
          </div>
        )}

        {imgUrl && (
          <img
            src={imgUrl}
            alt={name}
            className='w-12 h-12 rounded-full object-cover'
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
