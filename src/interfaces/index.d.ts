export interface IProduct {
  name: string;
  code: string;
  src: string;
  category?: string;
  price: number;
  priceSale: number;
  amount: number;
  description: string;
  attributes?: IAttribute[];
  status?: boolean;
  outstanding?: boolean;
  timestamp?: number;
}

interface IAttribute {
  name: string;
  options: Option[];
}

interface IOption {
  name: string;
  price: number;
}

export interface IOrder {
  product: IProduct & { selectedOptions: Record<string, number | undefined> };
  quantity: number;
  price: number;
  priceSale: number;
  selectedOptions: Record<string, number | undefined>;
}

export interface ICart {
  products: IOrder[];
}

export interface IFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  note: string;
  total: number;
  appliedCoupon: number;
  shippingMethod: string;
  paymentMethod: string;
}

export interface ICategory {
  name: string;
  src: string;
  description: string;
  status: boolean;
}
