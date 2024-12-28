import { useState, useEffect, useCallback } from "react";
import StockList from "../JsxReactFiles/StockList.jsx";
import { useStockContext } from "../Contexts/StockContext.jsx";
// import "../CssFiles/FormCard.css";
import "../CssFiles/FormCard1.css";

function FormCard() {

  const { stocks, setStocks } = useStockContext(); // Use StockContext
  const [stockSymbol, setStockSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [apiSymbols, setApiSymbols] = useState([]);
  const [errors, setErrors] = useState({
    stockSymbol: "",
    quantity: "",
    purchasePrice: "",
  });

  // Memoized function to fetch initial API symbols
  const fetchStockData = useCallback(() => {
    fetch(
      "https://www.alphavantage.co/query?function=REALTIME_BULK_QUOTES&symbol=MSFT,AAPL,IBM&apikey=demo"
    )
      .then((res) => res.json())
      .then((data) => {
        const quotes = data["data"] || [];
        const extractedData = quotes.map((quote) => ({
          symbol: quote.symbol,
          close: parseFloat(quote.close),
        }));
        setApiSymbols(extractedData);
      })
      .catch((error) => console.error("Error fetching stock data:", error));
  }, []); // Runs only on mount

  // Memoized function to fetch updated prices
  const fetchUpdatedPrices = useCallback(() => {
    if (stocks.length > 0) {
      const symbols = stocks.map((stock) => stock.symbol).join(",");
      fetch(
        `https://www.alphavantage.co/query?function=REALTIME_BULK_QUOTES&symbol=${symbols}&apikey=demo`
      )
        .then((res) => res.json())
        .then((data) => {
          const quotes = data["data"] || [];
          setStocks((prevStocks) =>
            prevStocks.map((stock) => {
              const updatedQuote = quotes.find((q) => q.symbol === stock.symbol);
              return updatedQuote
                ? {
                    ...stock,
                    currentPrice: parseFloat(updatedQuote.close),
                    profitLoss:
                      (parseFloat(updatedQuote.close) - stock.purchasePrice) *
                      stock.quantity,
                  }
                : stock;
            })
          );
        })
        .catch((error) => console.error("Error fetching bulk quotes:", error));
    }
  }, [stocks, setStocks]);

  // Fetch initial symbols on mount
  useEffect(() => {
    fetchStockData();
  }, [fetchStockData]);

  // Fetch updated prices when stocks change
  useEffect(() => {
    fetchUpdatedPrices();
  }, [fetchUpdatedPrices]);

  const handleAddStock = (e) => {
    e.preventDefault();

    let newErrors = { stockSymbol: "", quantity: "", purchasePrice: "" };
    const validSymbol = apiSymbols.find(
      (item) => item.symbol === stockSymbol.toUpperCase()
    );

    if (!stockSymbol.trim()) {
      newErrors.stockSymbol = "Stock Symbol is required.";
    } else if (!validSymbol) {
      newErrors.stockSymbol = "Invalid stock symbol.";
    }
    if (!quantity.trim() || Number(quantity) === 0) {
      newErrors.quantity = "Quantity cannot be empty or 0.";
    }
    if (!purchasePrice.trim() || Number(purchasePrice) === 0) {
      newErrors.purchasePrice = "Purchase Price cannot be empty or 0.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setStocks([
      ...stocks,
      {
        symbol: validSymbol.symbol,
        quantity: Number(quantity),
        purchasePrice: Number(purchasePrice),
        currentPrice: validSymbol.close,
        profitLoss:
          (validSymbol.close - Number(purchasePrice)) * Number(quantity),
      },
    ]);

    setStockSymbol("");
    setQuantity("");
    setPurchasePrice("");
    setErrors({ stockSymbol: "", quantity: "", purchasePrice: "" });
  };

  return (
    <div className="formCard-container">
      <h1>Finance Dashboard</h1>
      <form onSubmit={handleAddStock} className="inputFieldsAndBtnContainer"> {/* inputFieldsAndBtnContainer will be used as flex. Used only to position inputFields and buttons. All input fields and button will be flex items. Efficient responsive layout. Design for input fields and add stock btn will use a different className*/} 
        <div className="inputFieldAndErrorMsgContainer"> {/* inputFieldAndErrorMsgContainer. Each input field and it's corresponding error msg will be in relative positioning.*/} 
          <input
            className={errors.stockSymbol ? "inputError" : "nonError"}
            type="text"
            placeholder="Stock Symbol (e.g., AAPL)"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
          />
          {errors.stockSymbol && <p className="errorMessage">{errors.stockSymbol}</p>}
        </div>

        <div className="inputFieldAndErrorMsgContainer">
          <input
            className={errors.quantity ? "inputError" : "nonError"}
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {errors.quantity && <p className="errorMessage">{errors.quantity}</p>}
        </div>

        <div className="inputFieldAndErrorMsgContainer">
          <input
            className={errors.purchasePrice ? "inputError" : "nonError"}
            type="number"
            step="0.01"
            placeholder="Purchase Price"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
          {errors.purchasePrice && <p className="errorMessage">{errors.purchasePrice}</p>}
        </div>

        <button className="submitBtn" type="submit">Add Stock</button>
      </form>


      <h2>Stock List</h2>
      <div><StockList /></div>
    </div>
  );
}

export default FormCard;

// below is for reference code
// return (
//   <div className="formCard">
//     <h1>Finance Dashboard</h1>
//     <form onSubmit={handleAddStock} className="inputContainer">
//       <div className="inputFieldContainer">
//         <input
//           className={`inputField ${errors.stockSymbol ? "inputError" : ""}`}
//           type="text"
//           placeholder="Stock Symbol (e.g., AAPL)"
//           value={stockSymbol}
//           onChange={(e) => setStockSymbol(e.target.value)}
//         />
//         {errors.stockSymbol && (
//           <p className="errorMessage">{errors.stockSymbol}</p>
//         )}
//       </div>
//       <div className="inputFieldContainer">
//         <input
//           className={`inputField ${errors.quantity ? "inputError" : ""}`}
//           type="number"
//           placeholder="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//         />
//         {errors.quantity && (
//           <p className="errorMessage">{errors.quantity}</p>
//         )}
//       </div>
//       <div className="inputFieldContainer">
//         <input
//           className={`inputField ${errors.purchasePrice ? "inputError" : ""}`}
//           type="number"
//           step="0.01"
//           placeholder="Purchase Price"
//           value={purchasePrice}
//           onChange={(e) => setPurchasePrice(e.target.value)}
//         />
//         {errors.purchasePrice && (
//           <p className="errorMessage">{errors.purchasePrice}</p>
//         )}
//       </div>
//       <button className="submitButton" type="submit">
//         Add Stock
//       </button>
//     </form>
//     <h2>Stock List</h2>
//     <div>
//       <StockList />
//     </div>
//   </div>
// );