const useTotalPrice = (
  basePrice: number,
  salePrice: number,
  selectedOptions: Record<string, number | undefined>
) => {
  const selectedOptionPrices = Object.values(selectedOptions).filter(
    Boolean
  ) as number[];

  const totalBasePrice =
    basePrice + selectedOptionPrices.reduce((total, price) => total + price, 0);
  const totalSalePrice =
    salePrice + selectedOptionPrices.reduce((total, price) => total + price, 0);

  return [totalSalePrice, totalBasePrice] as const;
};

export default useTotalPrice;
