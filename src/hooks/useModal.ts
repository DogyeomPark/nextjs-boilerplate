import { create } from 'zustand';

interface States {
  isOpen: boolean;
}

interface Actions {
  onOpen: () => void;
  onClose: () => void;
}

const initialStates: States = {
  isOpen: false,
};

const useLoginModal = create<States & Actions>((set) => ({
  ...initialStates,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

const useRegisterModal = create<States & Actions>((set) => ({
  ...initialStates,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

const useRentModal = create<States & Actions>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

const useSearchModal = create<States & Actions>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export { useLoginModal, useRegisterModal, useRentModal, useSearchModal };
