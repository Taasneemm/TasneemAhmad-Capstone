import { createContext, useContext, useState } from "react";

// Create StockContext
const StockContext = createContext();

// Create a custom hook to use the StockContext
export const useStockContext = () => useContext(StockContext);

// Create a Provider Component
export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);

  return (
    <StockContext.Provider value={{ stocks, setStocks }}>
      {children}
    </StockContext.Provider>
  );
};
