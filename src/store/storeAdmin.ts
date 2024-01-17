import { create } from "zustand";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { IFormValues } from "@/interfaces";

interface IStoreAdmin {
  form: IFormValues[];

  fetchForm: () => void;
}

const useStoreAdmin = create<IStoreAdmin>((set) => ({
  form: [],

  fetchForm: async () => {
    const unsubscribe = onSnapshot(
      query(collection(db, "order"), orderBy("timestamp", "desc")),
      (doc) => {
        const data = doc.docs.map((doc) => doc.data() as IFormValues);
        set({ form: data });
      }
    );

    return () => unsubscribe();
  },
}));

export default useStoreAdmin;
