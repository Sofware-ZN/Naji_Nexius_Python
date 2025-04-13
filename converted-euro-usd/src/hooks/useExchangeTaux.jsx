import { useState, useEffect } from "react";

export const useExchangeTaux = () => {
  const [tauxChange, setTauxChange] = useState(1.1);
  const [tauxUser, setTauxUser] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTauxChange((prev) => {
        const random = (Math.random() * 0.1 - 0.05).toFixed(2);
        return Math.max(
          0.01,
          (parseFloat(prev) + parseFloat(random)).toFixed(2)
        );
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return { tauxChange, tauxUser, setTauxUser };
};
