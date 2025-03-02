"use client";

import { createContext } from "react";

const GlobalContext = createContext({
  openWishlist: false,
  setOpenWishlist: (t: boolean) => {},
  showMenu: false,
  setShowMenu: (t: boolean) => {},
});

export default GlobalContext;
