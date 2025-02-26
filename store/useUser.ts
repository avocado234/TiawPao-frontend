import { create } from "zustand";

interface User {
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
}

interface UserStoreState {
  user: User;
  setUserData: (data: Partial<User>) => void;
  resetUserData: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: {
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
  },
  setUserData: (data) =>
    set((state) => ({ user: { ...state.user, ...data } })),
  resetUserData: () =>
    set({
      user: {
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
      },
    }),
}));
