import { useState } from "react";

enum QuantityChangeAction {
  Increase = "increase",
  Decrease = "decrease",
}

const useQuantityInOrder = () => {
  const [quantityInOrder, setQuantityInOrder] = useState(1);

  const handleQuantityInOrder = (action: QuantityChangeAction) => {
    if (action === QuantityChangeAction.Increase) {
      setQuantityInOrder((prevQuantity) => prevQuantity + 1);
    } else {
      if (quantityInOrder > 1) {
        setQuantityInOrder((prevQuantity) => prevQuantity - 1);
      }
    }
  };

  return { quantityInOrder, handleQuantityInOrder };
};

export default useQuantityInOrder;
