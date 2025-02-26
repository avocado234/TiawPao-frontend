import { create } from "zustand";

interface SignupState {
  userid: string;
  image: string;
  username: string;
  email: string;
  tel: string;
  firstname: string;
  lastname: string;
  date_of_birth: string;
  gender: string;
  userplan_id: string[];
  setSignupData: (data: Partial<SignupState>) => void;
  resetSignupData: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  userid: "",
  image: "",
  username: "",
  email: "",
  tel: "",
  firstname: "",
  lastname: "",
  date_of_birth: "",
  gender: "",
  userplan_id: [],
  setSignupData: (data) => set((state) => ({ ...state, ...data })),
  resetSignupData: () =>
    set({
      userid: "",
      image: "",
      username: "",
      email: "",
      tel: "",
      firstname: "",
      lastname: "",
      date_of_birth: "",
      gender: "",
      userplan_id: [],
    }),
}));
