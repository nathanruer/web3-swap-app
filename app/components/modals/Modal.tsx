'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  body, 
  disabled,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex 
      overflow-x-hidden overflow-y-auto fixed inset-0 
      z-50 outline-none focus:outline-none bg-black/30">
        <div className="relative w-full md:w-4/6 lg:w-3/6
        my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div className={`translate duration-300 h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="translate h-full lg:h-auto md:h-auto
            border-0 rounded-lg shadow-lg relative flex flex-col 
            w-full outline-none focus:outline-none
            bg-zinc-800">
              <div className="flex items-center p-6 rounded-t
              justify-center relative">
                <button className="p-1 border-0 hover:opacity-70
                transition absolute left-9"
                onClick={handleClose}>
                  <IoMdClose size={18} color="white" />
                </button>
                <div className="text-lg font-semibold text-white">
                  {title}
                </div>
              </div>

              <div className="flex flex-col gap-2 p-6">
                {body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;