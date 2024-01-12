import { IProduct } from "@/interfaces";

export const products: IProduct[] = [
  {
    name: "Thanh long ruột đỏ",
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
            price: 5,
          },
          {
            name: "Xanh",
            price: 10,
          },
        ],
      },
      {
        name: "Kích cỡ",
        options: [
          {
            name: "Nhỏ",
            price: 3,
          },
          {
            name: "To",
            price: 8,
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
    name: "Mận",
    code: "man",
    src: "/shop/manHau.png",
    price: [120, 60],

    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [23, 4],
    attributes: [
      {
        name: "size",
        options: [
          {
            name: "Nhỏ",
            price: 2000,
          },
          {
            name: "To",
            price: 5000,
          },
        ],
      },
    ],
  },
  {
    name: "Cam Vinh Loai 1",
    code: "cam-vinh-loai-1",
    src: "/shop/orange.png",
    price: [150, 75],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [123, 44],
  },
  {
    name: "Muoi Tay Ninh",
    code: "muoi-tay-ninh",
    src: "/shop/muoiTayNinh.png",
    price: [10, 8],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [123, 44],
  },
  {
    name: "Nhan Long Hung Yen",
    code: "nhan-long-hung-yen",
    src: "/shop/nhanHY.png",
    price: [100, 50],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [123, 44],
    attributes: [
      {
        name: "Size",
        options: [
          {
            name: "Nhỏ",
            price: 2000,
          },
          {
            name: "To",
            price: 5000,
          },
        ],
      },
    ],
  },
  {
    name: "Sau rieng DakLak",
    code: "sau-rieng-daklak",
    src: "/shop/saurieng.png",
    price: [220, 120],
    descrpiton:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    amount: [123, 44],
  },
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
