import { create } from "zustand";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { ICategory, IProduct } from "@/interfaces";

interface IStoreShop {
  products: IProduct[];
  category: ICategory[];

  fetchCategory: () => void;
  fetchProducts: () => void;
}

const useStoreShop = create<IStoreShop>((set) => ({
  products: [],
  category: [],

  fetchCategory: async () => {
    const unsubscribe = onSnapshot(collection(db, "category"), (doc) => {
      const data = doc.docs.map((doc) => doc.data() as ICategory);
      set({ category: data });
    });

    return () => unsubscribe();
  },

  fetchProducts: async () => {
    const unsubscribe = onSnapshot(
      query(collection(db, "products"), orderBy("timestamp", "desc")),
      (doc) => {
        const data = doc.docs.map((doc) => doc.data() as IProduct);
        set({ products: data });
      }
    );

    return () => unsubscribe();
  },
}));

export default useStoreShop;
