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
      z-50 outline-none focus:outline-none bg-black/50">
        <div className="relative w-full md:w-4/6 lg:w-3/6
        my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div className={`translate duration-300 h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="translate h-full lg:h-auto md:h-auto 
            rounded-3xl relative flex flex-col 
            w-full outline-none focus:outline-none
            bg-[#1A1B1F]">
              <div className="flex items-center p-3 rounded-t
              justify-center relative">
                <div className="text-lg font-semibold text-white">
                  {title}
                </div>
                <button className="border-0 hover:scale-110
                transition absolute right-9"
                onClick={handleClose}>
                  <IoMdClose 
                    size={30} 
                    color="white"
                    className="bg-zinc-800 rounded-full shadow-2xl p-1.5 font-bold"
                  />
                </button>
              </div>

              <div className="flex flex-col gap-2 p-3">
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