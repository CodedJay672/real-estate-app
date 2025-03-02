"use client";

import React, { ReactNode, useState } from "react";
import GlobalContext from "./GlobalContext";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [openWishlist, setOpenWishlist] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <GlobalContext
      value={{ openWishlist, setOpenWishlist, showMenu, setShowMenu }}
    >
      {children}
    </GlobalContext>
  );
};

export default ContextProvider;
