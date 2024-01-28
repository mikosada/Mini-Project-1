import { create } from 'zustand';

type ComboboxStore = {
  id: string | undefined;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useComboboxForm = create<ComboboxStore>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id: undefined }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
