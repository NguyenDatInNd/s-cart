import { useState } from "react";
import useNotification from "./useNotification";

enum QuantityChangeAction {
  Increase = "increase",
  Decrease = "decrease",
}

const useQuantityInOrder = (maxQuantityInStock: number) => {
  const [quantityInOrder, setQuantityInOrder] = useState(1);
  const showNotification = useNotification();

  const handleQuantityInOrder = (action: QuantityChangeAction) => {
    if (action === QuantityChangeAction.Increase) {
      if (quantityInOrder < maxQuantityInStock) {
        setQuantityInOrder((prevQuantity) => prevQuantity + 1);
      } else {
        showNotification(
          "warning",
          "Maximum quantity reached",
          "Cannot add more items to the order."
        );
      }
    } else {
      if (quantityInOrder > 1) {
        setQuantityInOrder((prevQuantity) => prevQuantity - 1);
      }
    }
  };

  return { quantityInOrder, handleQuantityInOrder };
};
export default useQuantityInOrder;
