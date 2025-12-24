import React, { useState } from 'react';
import CompletionIcon from './completeIcon';
export default function Modal ({ onClose }) {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <div className='modal w-screen bg-light_black bg-opacity-40 text-light_black z-50 '>
      <div />
      <div className='modal-content flex justify-center flex-col gap-y-4'>
        <h2 className='font-bold text-lg text-center'>Thank you for subscribing!</h2>
        <CompletionIcon />
        <button onClick={handleClose} className='mx-auto text-center border p-2 my-2  '>Close</button>

      </div>

    </div>
  );
}
