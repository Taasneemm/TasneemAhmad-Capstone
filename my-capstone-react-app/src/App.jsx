import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

// Parent Component: FormCard
function FormCard() {
  // State to store stock details
  const [stockSymbol, setStockSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [stocks, setStocks] = useState([]);


  // Handle form submission
  const handleAddStock = (e) => {
    e.preventDefault();
    // Creating a new array including exisint objects and adding latest object
    setStocks([
      ...stocks,
      {
        symbol: stockSymbol,
        quantity: Number(quantity),
        price: Number(purchasePrice),
      },
    ]);
    // Reset the form fields
    setStockSymbol('');
    setQuantity('');
    setPurchasePrice('');
  };

  return (
    <div className="formCard">
      <h1>Finance Dashboard</h1>
      <form onSubmit={handleAddStock} className="form">
        <div className="inputGroup">
          <input
            type="text"
            placeholder="Stock Symbol (e.g., AAPL)"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Purchase Price"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
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


