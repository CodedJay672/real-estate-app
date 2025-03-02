"use client";

import React, { ReactNode, useState } from "react";
import GlobalContext from "./GlobalContext";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [openWishlist, setOpenWishlist] = useState(false);

  return (
    <GlobalContext.Provider
      value={{ openWishlist, setOpenWishlist }}
    ></GlobalContext.Provider>
  );
};

export default ContextProvider;
