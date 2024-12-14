import { useState } from 'react'
import './App.css'



// Child Component: StockList
function StockList({ stocks }) {
  return (
    <div className="stockList">
      <h2>Stock List</h2>
      {stocks.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <ol>
          {stocks.map((stock, index) => (
            <StockItem key={index} stock={stock} />
          ))}
        </ol>
      )}
    </div>
  );
}

// Child Component: StockItem
function StockItem({ stock }) {
  return (
    <li>
      {stock.symbol} - {stock.quantity} shares @ ${stock.price.toFixed(2)} each
    </li>
  );
}

function FormCard() {
  // State to store stock details
  const [stockSymbol, setStockSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [stocks, setStocks] = useState([]);

  // State to track input validation
  const [errors, setErrors] = useState({
    stockSymbol: false,
    quantity: false,
    purchasePrice: false,
  });

  // Handle form submission
  const handleAddStock = (e) => {
    e.preventDefault();

    // Check for empty fields and set errors
    const newErrors = {
      stockSymbol: !stockSymbol.trim(),
      quantity: !quantity.trim(),
      purchasePrice: !purchasePrice.trim(),
    };
    setErrors(newErrors);

    // If any field is empty, stop further execution
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Add the stock to the list
    setStocks([
      ...stocks,
      {
        symbol: stockSymbol.trim(),
        quantity: Number(quantity.trim()),
        price: Number(purchasePrice.trim()),
      },
    ]);

    // Reset the form fields and errors
    setStockSymbol('');
    setQuantity('');
    setPurchasePrice('');
    setErrors({ stockSymbol: false, quantity: false, purchasePrice: false });
  };

  return (
    <div className="formCard">
      <h1>Finance Dashboard</h1>
      <form onSubmit={handleAddStock} className="form">
        <div className="inputGroup">
          {/* Stock Symbol Input */}
          <div className="inputField">
            <input
              type="text"
              placeholder="Stock Symbol (e.g., AAPL)"
              value={stockSymbol}
              onChange={(e) => setStockSymbol(e.target.value)}
              className={errors.stockSymbol ? 'inputError' : ''}
            />
            {errors.stockSymbol && (
              <p className="errorMessage">Please fill in the Stock Symbol.</p>
            )}
          </div>

          {/* Quantity Input */}
          <div className="inputField">
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={errors.quantity ? 'inputError' : ''}
            />
            {errors.quantity && (
              <p className="errorMessage">Please fill in the Quantity.</p>
            )}
          </div>

          {/* Purchase Price Input */}
          <div className="inputField">
            <input
              type="number"
              step="0.01"
              placeholder="Purchase Price"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className={errors.purchasePrice ? 'inputError' : ''}
            />
            {errors.purchasePrice && (
              <p className="errorMessage">
                Please fill in the Purchase Price.
              </p>
            )}
          </div>

          <button type="submit">Add Stock</button>
        </div>
      </form>

      {/* Pass props to StockList */}
      <StockList stocks={stocks} />
    </div>
  );
}




// Main App Component
function App() {
  return <FormCard />;
}

export default App;


