import { IProduct } from "@/interfaces";

export const recommendProducts: IProduct[] = [
  {
    name: "Thịt trâu gác bếp",
    code: "thit-trau-gac-bep",
    src: "/shop/thit-trau-gac-bep.png",
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
      {
        name: "Kích cỡ",
        options: [
          {
            name: "Nhỏ",
            price: 30,
          },
          {
            name: "To",
            price: 80,
          },
        ],
      },
    ],
  },
  {
    name: "Hồ tiêu",
    code: "ho-tieu",
    src: "/shop/ho-tieu.png",
    price: [110, 90],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [23, 4],
  },
  {
    name: "Cháo lòng tiết canh",
    code: "chao-long-tiet-canh",
    src: "/shop/chao-long-tiet-canh.png",
    price: [20, 10],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [213, 44],
  },
  {
    name: "bánh mì chả cá",
    code: "banh-mi-cha-ca",
    src: "/shop/banh-mi-cha-ca.png",
    price: [35, 15],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [30, 15],
    attributes: [
      {
        name: "Loại cá",
        options: [
          {
            name: "cá voi",
            price: 50,
          },
          {
            name: "cá mập",
            price: 40,
          },
        ],
      },
      {
        name: "Kích cỡ",
        options: [
          {
            name: "Nhỏ",
            price: 10,
          },
          {
            name: "To",
            price: 15,
          },
        ],
      },
    ],
  },
];
