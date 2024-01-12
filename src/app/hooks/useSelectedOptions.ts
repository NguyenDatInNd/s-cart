import { useState } from "react";

const useSelectedOptions = (
  initialOptions: Record<string, number | undefined>
) => {
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  const handleOptionChange = (attributeName: string, optionPrice: number) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [attributeName]: optionPrice,
    }));
  };

  const getDefaultValue = (options: { name: string; price: number }[]) => {
    const defaultOption = options.find((option) => option.price === 0);
    return defaultOption ? defaultOption.price : undefined;
  };

  return { selectedOptions, handleOptionChange, getDefaultValue };
};

export default useSelectedOptions;
