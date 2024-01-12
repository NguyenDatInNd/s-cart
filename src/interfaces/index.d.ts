export interface IProduct {
  name: string;
  code: string;
  src: string;
  price: number[];
  amount: number[];
  descrpiton: string;
  attributes?: IAttribute[];
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
  price: number[];
  selectedOptions: Record<string, number | undefined>;
}

export interface ICart {
  products: IOrder[];
}
