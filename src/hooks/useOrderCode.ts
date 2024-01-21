import { useEffect, useState } from "react";

function useOrderCode(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const [orderCode, setOrderCode] = useState<string>("");

  useEffect(() => {
    function generateOrderCode() {
      let newCode = "#";

      for (let i = 0; i < length; i++) {
        if (i % 4 === 0 && i !== 0) {
          newCode += "-";
        } else {
          const randomIndex = Math.floor(Math.random() * characters.length);
          newCode += characters.charAt(randomIndex);
        }
      }

      setOrderCode(newCode);
    }

    generateOrderCode();
  }, [length]);

  return orderCode;
}

export default useOrderCode;
