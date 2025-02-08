import { create } from "zustand";

interface ForgetState {
    email : string;
    setForgetData: (data: Partial<ForgetState>) => void;
    resetForgetData: () => void;
  }
  
  export const useForgetStore = create<ForgetState>((set) => ({
    email: "",
    setForgetData: (data) => set((state) => ({ ...state, ...data })),
    resetForgetData: () =>
      set({
        email:"",
      }),
  }));
  