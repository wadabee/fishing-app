import { atom } from "recoil";

const open = atom({
  key: "open",
  default: false,
});

const drawerState = {
  open,
};

export default drawerState;
