import { createStore } from "zustand/vanilla";

export type ProductStates = {
  isUploading: boolean;
  isDeleting: boolean;
  productImageId: string;
};

export type ProductActions = {
  setIsUploading: () => void;
  setIsDeleting: () => void;
  setProductImageId: (id: string) => void;
};

export type ProductStore = ProductStates & ProductActions;

export const defaultInitState: ProductStates = {
  isUploading: false,
  isDeleting: false,
  productImageId: "",
};

export const createProductStore = (
  initState: ProductStates = defaultInitState,
) => {
  return createStore<ProductStore>()((set) => ({
    ...initState,
    setIsUploading: () => set((state) => ({ isUploading: !state.isUploading })),
    setIsDeleting: () => set((state) => ({ isDeleting: !state.isDeleting })),
    setProductImageId: (e: string) => set(() => ({ productImageId: e })),
  }));
};
