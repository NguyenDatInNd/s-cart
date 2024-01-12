import { IProduct } from "@/interfaces";

export const specialProducts: IProduct[] = [
  {
    name: "bánh tráng trộn",
    code: "banh-trang-tron",
    src: "/shop/banh-trang-tron.png",
    price: [80, 40],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [200, 100],
    attributes: [
      {
        name: "khối lượng",
        options: [
          {
            name: "1kg",
            price: 50,
          },
          {
            name: "0.5kg",
            price: 25,
          },
        ],
      },
    ],
  },
  {
    name: "cà phê",
    code: "ca-phe",
    src: "/shop/ca-phe.png",
    price: [75, 30],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [200, 100],
    attributes: [
      {
        name: "khối lượng",
        options: [
          {
            name: "1kg",
            price: 50,
          },
          {
            name: "0.5kg",
            price: 25,
          },
        ],
      },
      {
        name: "Độ xay",
        options: [
          {
            name: "Hạt",
            price: 0,
          },
          {
            name: "Bột",
            price: 10,
          },
        ],
      },
    ],
  },
  {
    name: "canh chua",
    code: "canh-chua",
    src: "/shop/canh-chua.png",
    price: [20, 7],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [213, 44],
    attributes: [
      {
        name: "size",
        options: [
          {
            name: "lớn",
            price: 10,
          },
          {
            name: "nhỏ",
            price: 5,
          },
        ],
      },
    ],
  },
  {
    name: "Măng cụt",
    code: "mang-cut",
    src: "/shop/mangosteen.png",
    price: [100, 50],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [213, 44],
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
  {
    name: "thanh long ruột đỏ",
    code: "thanh-long-ruot-do",
    src: "/shop/dragon_fruit.png",
    price: [80, 40],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [200, 100],
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
];
