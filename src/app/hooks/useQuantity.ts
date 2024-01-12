import { useState } from "react";

const useQuantityInOrder = () => {
  const [quantityInOrder, setQuantityInOrder] = useState(1);

  const handleQuantityInOrder = (action: "increase" | "decrease") => {
    if (action === "increase") {
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
