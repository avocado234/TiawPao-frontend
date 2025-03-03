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
  addUserPlanId: (planId: string) => void;
  removeUserPlanId: (planId: string) => void;
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
  addUserPlanId: (planId: string) =>
    set((state) => ({
      user: { ...state.user, userplan_id: [...state.user.userplan_id, planId] },
    })),
  removeUserPlanId: (planId: string) =>
    set((state) => ({
      user: {
        ...state.user,
        userplan_id: state.user.userplan_id.filter((id) => id !== planId),
      },
    })),
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
