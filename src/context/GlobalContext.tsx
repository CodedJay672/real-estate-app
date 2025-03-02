"use client";

import { createContext, Dispatch, SetStateAction } from "react";

const GlobalContext = createContext({
  openWishlist: false,
  setOpenWishlist: (t: boolean) => {},
});

export default GlobalContext;
