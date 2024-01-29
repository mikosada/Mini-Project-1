import { create } from 'zustand';

type CardModalStore = {
  id: string | undefined;
  isOpen: boolean;
  isSuccess: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  onSuccess: (id: string) => void;
};

export const useCardModal = create<CardModalStore>((set) => ({
  id: undefined,
  isOpen: false,
  isSuccess: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
  onSuccess: () => set({ isSuccess: true, id: undefined }),
}));
