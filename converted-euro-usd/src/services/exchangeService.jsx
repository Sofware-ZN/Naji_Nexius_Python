export const createExchangeTaux = ({
  isEurToUsd,
  tauxChange,
  tauxUser,
  eurValue,
  usdValue,
}) => {
  const tauxActive = tauxUser ? parseFloat(tauxUser) : tauxChange;
  const isUsdToEur = !isEurToUsd;

  return {
    amount: isEurToUsd ? eurValue : usdValue,
    fromCurrency: isUsdToEur ? "$" : "€",
    toCurrency: isUsdToEur ? "€" : "$",
    convertedAmount: isEurToUsd ? eurValue * tauxActive : usdValue / tauxActive,
    tauxActive,
    time: new Date().toLocaleTimeString(),
    tauxChange,
    tauxUser,
  };
};
