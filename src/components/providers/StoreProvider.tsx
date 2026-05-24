"use client";


import { type ReactNode, createContext, useState, useContext } from 'react'
import { useStore } from 'zustand'
import { type ProductStore, createProductStore } from '@/lib/stores/products-store';


export type ProductStoreApi = ReturnType<typeof createProductStore>

export const ProductStoreContext = createContext<ProductStoreApi | undefined>(
  undefined,
)

export const ProductStoreProvider = ({
  children,
}: { children: ReactNode }) => {
  const [store] = useState(() => createProductStore())
  return (
    <ProductStoreContext.Provider value={store}>
      {children}
    </ProductStoreContext.Provider>
  )
}

export const useProductProvider = <T,>(
  selector: (store: ProductStore) => T,
): T => {
  const productStoreContext = useContext(ProductStoreContext)

  if (!productStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(productStoreContext, selector)
}