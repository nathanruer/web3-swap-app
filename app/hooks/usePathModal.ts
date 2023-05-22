import { create } from 'zustand';

interface PathModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePathModal = create<PathModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default usePathModal;
