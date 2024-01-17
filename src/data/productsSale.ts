import { IProduct } from "@/interfaces";

export const productsSale: IProduct[] = [
  {
    name: "Thanh long ruột đỏ",
    code: "thanh-long-ruot-do",
    src: "/shop/dragon_fruit.png",
    price: [80, 40],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: 10,
    attributes: [
      {
        name: "Màu sắc",
        options: [
          {
            name: "Đỏ",
            price: 5000,
          },
          {
            name: "Xanh",
            price: 10000,
          },
        ],
      },
      {
        name: "Kích cỡ",
        options: [
          {
            name: "Nhỏ",
            price: 3000,
          },
          {
            name: "To",
            price: 8000,
          },
        ],
      },
    ],
  },
  {
    name: "Măng cụt",
    code: "Mang-cut",
    src: "/shop/mangosteen.png",
    price: [100, 50],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: 44,
    attributes: [
      {
        name: "Màu sắc",
        options: [
          {
            name: "Hồng",
            price: 2000,
          },
        ],
      },
    ],
  },
];
