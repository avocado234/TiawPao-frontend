// store/useSignupStore.ts
import { create } from "zustand";

interface SignupState {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname:string;
  date_of_birth:string;
  tel: string;
  gender:string;
  otpVerified: boolean;
  setSignupData: (data: Partial<SignupState>) => void;
  resetSignupData: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  username: "",
  password: "",
  email: "",
  firstname: "",
  lastname: "",
  tel: "",
  date_of_birth:"",
  gender:"",
  otpVerified: false, 
  setSignupData: (data) => set((state) => ({ ...state, ...data })),
  resetSignupData: () =>
    set({
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      tel: "",
      date_of_birth:"",
      gender:"",
      otpVerified: false,
    }),
}));



