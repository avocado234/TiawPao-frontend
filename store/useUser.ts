import { create } from "zustand";

interface userState {
  username: string;
  email: string;
  firstname: string;
  lastname:string;
  dateofbirth:string;
  tel: string;
  gender:string;
  setuserData: (data: Partial<userState>) => void;
  resetuserData: () => void;
}

export const useuserStore = create<userState>((set) => ({
  username: "",
  email: "",
  firstname: "",
  lastname: "",
  tel: "",
  dateofbirth:"",
  gender:"",
  setuserData: (data) => set((state) => ({ ...state, ...data })),
  resetuserData: () =>
    set({
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      tel: "",
      dateofbirth:"",
      gender:"",
    }),
}));



