import { IFormValues } from "@/interfaces";
import { create } from "zustand";

interface IStoreForm {
  form: IFormValues;
  setFormValues: (formValues: IFormValues) => void;
}

export const useStoreFormInfor = create<IStoreForm>((set) => ({
  form: {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    note: "",
    total: 0,
    shippingMethod: "",
    paymentMethod: "",
    appliedCoupon: 0,
  },

  setFormValues: (formValues) => {
    set({ form: { ...formValues } });
  },
}));
