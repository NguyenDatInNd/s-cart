import { ICart, IOrder, IProduct } from "@/interfaces";
import { create } from "zustand";

interface IStore {
  order: ICart;
  setOrder: (order: ICart) => void;
  deleteOrder: (product: IOrder) => void;
  increaseQuantity: (record: IOrder) => void;
  decreaseQuantity: (record: IOrder) => void;
  setQuantity: (record: IOrder, quantity: number) => void;
}

export const useStoreCart = create<IStore>((set) => ({
  order: { products: [] },

  setOrder: (order) => set({ order }),

  deleteOrder: (order: IOrder) =>
    set((state) => ({
      order: {
        products: state.order.products.filter((item) => item !== order),
      },
    })),

  increaseQuantity: (record) =>
    set((state) => ({
      order: {
        products: state.order.products.map((item) =>
          item === record ? { ...item, quantity: item.quantity + 1 } : item
        ),
      },
    })),

  decreaseQuantity: (record) =>
    set((state) => ({
      order: {
        products: state.order.products.map((item) =>
          item === record
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      },
    })),

  setQuantity: (record, quantity) =>
    set((state) => ({
      order: {
        products: state.order.products.map((item) =>
          item === record ? { ...item, quantity } : item
        ),
      },
    })),
}));
