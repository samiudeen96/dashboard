// store/uiStore.js
import { create } from "zustand";

const useUiStore = create((set) => ({
  tab: "Login",
  setTab: (tabName) => set({ tab: tabName }),

  isModalOpen: false,
  modalData: null, // store modal info like desc, buttonName, etc.

  openModal: (data) => set({ modalData: data, isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, modalData: null }),

  isSidebarOpen: false,
  openSidebar: (state) => set({ isSidebarOpen: state }),

}));

export default useUiStore;
