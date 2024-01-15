import { useState } from "react";
import { IOrder, IProduct } from "@/interfaces";
import useNotification from "@/app/hooks/useNotification";
import { useStoreCart } from "@/store/storeCart";
import useQuantityInOrder from "@/app/hooks/useQuantity";
import useSelectedOptions from "@/app/hooks/useSelectedOptions";
import useTotalPrice from "@/app/hooks/useTotalPrice";

const useAddToCart = (props: any) => {
  const { order, setOrder } = useStoreCart();
  const { selectedOptions, handleOptionChange, getDefaultValue } =
    useSelectedOptions({});
  const [totalSalePrice, totalBasePrice] = useTotalPrice(
    props.price[0],
    props.price[1],
    selectedOptions
  );
  const { quantityInOrder, handleQuantityInOrder } = useQuantityInOrder();
  const showNotification = useNotification();

  const addToCart = () => {
    const existingProductIndex = order.products.findIndex(
      (orderItem) => orderItem.product.code === props.code
    );

    if (existingProductIndex !== -1) {
      const updatedOrder = [...order.products];
      updatedOrder[existingProductIndex].quantity += quantityInOrder;
      setOrder({ products: updatedOrder });
    } else {
      const newOrder: IOrder = {
        product: {
          ...props,
          selectedOptions: selectedOptions,
        },
        quantity: quantityInOrder,
        price: [totalSalePrice, totalBasePrice],
        selectedOptions: selectedOptions,
      };

      setOrder({ products: [...order.products, newOrder] });
    }

    showNotification(
      "success",
      "Add to cart successfully",
      `Added ${quantityInOrder} ${props.name} to cart`
    );
  };

  return addToCart;
};

export default useAddToCart;
