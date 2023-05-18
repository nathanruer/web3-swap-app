import { create } from 'zustand';

interface SelectTokensInModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSelectTokensInModal = create<SelectTokensInModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSelectTokensInModal;
