import { create } from 'zustand';

type CardModalStore = {
  id: string | undefined;
  isOpen: boolean;
  isSuccess: boolean;
  data: any | undefined;
  onOpen: (id: string) => void;
  onClose: () => void;
  onSuccess: (id: string) => void;
  onData: (id: string, data: any) => void;
};

export const useCardModal = create<CardModalStore>((set) => ({
  id: undefined,
  isOpen: false,
  isSuccess: false,
  data: undefined,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
  onSuccess: (id: string) => set({ isSuccess: true, id: id }),
  onData: (id: string, data: any) => set({ data: data, id: id }),
}));
