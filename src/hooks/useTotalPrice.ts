const useTotalPrice = (
  basePrice: number,
  salePrice: number,
  selectedOptions: Record<string, number | undefined>
) => {
  const selectedOptionPrices = Object.values(selectedOptions).filter(
    Boolean
  ) as number[];

  const totalBasePrice = Object.values(selectedOptions).reduce(
    (acc: number, option: any) => {
      if (option && option.price) {
        return acc + Number(option.price);
      }
      return acc;
    },
    basePrice
  );

  const totalSalePrice = Object.values(selectedOptions).reduce(
    (acc: number, option: any) => {
      if (option && option.price) {
        return acc + Number(option.price);
      }
      return acc;
    },
    salePrice
  );

  return [totalSalePrice, totalBasePrice] as const;
};

export default useTotalPrice;
