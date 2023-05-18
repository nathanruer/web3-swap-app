import { create } from 'zustand';

interface SelectTokensOutModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSelectTokensOutModal = create<SelectTokensOutModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSelectTokensOutModal;
