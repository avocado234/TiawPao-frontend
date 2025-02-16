import { create } from "zustand";

interface User {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  dateofbirth: string;
  tel: string;
  gender: string;
  img:string
}

interface UserStoreState {
  user: User;
  setUserData: (data: Partial<User>) => void;
  resetUserData: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: {
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    dateofbirth: "",
    tel: "",
    gender: "",
    img:""
  },
  setUserData: (data) =>
    set((state) => ({ user: { ...state.user, ...data } })),
  resetUserData: () =>
    set({
      user: {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        dateofbirth: "",
        tel: "",
        gender: "",
        img:""
      },
    }),
}));
