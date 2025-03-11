import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

const ModalView = ({ open, onClose, children }) => {
  return ReactDOM.createPortal(
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-darkColorSec outline-none shadow-lg p-6 xs:p-2 rounded-lg">
          {children}
        </Box>
      </Fade>
    </Modal>,
    document.body 
  );
};

export default ModalView;
