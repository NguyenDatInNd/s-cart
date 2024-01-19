import { useState } from "react";

const useSelectedOptions = (
  initialOptions: Record<string, number | undefined>
) => {
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  const handleOptionChange = (attributeName: string, option: any) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [attributeName]: option,
    }));
  };

  const getDefaultValue = (options: any) => {
    const defaultOption = options.find(
      (option: any) => Number(option.price) === 0
    );
    return defaultOption ? defaultOption : undefined;
  };

  return { selectedOptions, handleOptionChange, getDefaultValue };
};

export default useSelectedOptions;
