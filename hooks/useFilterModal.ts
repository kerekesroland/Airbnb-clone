import { create } from "zustand";

export interface IFilterModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFilterModal = create<IFilterModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilterModal;
