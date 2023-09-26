import { atom } from "recoil";

export const postsState = atom({
  key: "postsState",
  default: {
    posts: {},
  },
});
export const loadingState = atom({
  key: "loadingState",
  default: {
    loading: false,
  },
});
export const errorState = atom({
  key: "errorState",
  default: {
    error: "",
  },
});
export const profileState = atom({
  key: "profileState",
  default: {},
});
export const photosState = atom({
  key: "photosState",
  default: {},
});
export const friendsPageInfosState = atom({
  key: "friendsInfos",
  default: {},
});
