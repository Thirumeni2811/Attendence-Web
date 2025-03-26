import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

const ModalView1 = ({ open, onClose, children }) => {
  return ReactDOM.createPortal(
    <Modal className="w-full" open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box className="w-4/5 xs:w-full sm:w-1/2 md:2/5 lg:w-1/3 xl:w-[30%] max-h-[80vh] overflow-y-auto scrollbar absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white outline-none shadow-lg p-1 md:p-2 lg:p-4 rounded-lg">
          {children}
        </Box>
      </Fade>
    </Modal>,
    document.body
  );
};

export default ModalView1;
