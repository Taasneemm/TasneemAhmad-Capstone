import "../CssFiles/StockItem.css";

function StockItem({ stock }) {
  return (
    <li className="stockItem">
      <p><strong>Symbol:</strong> {stock.symbol}</p>
      <p><strong>Quantity:</strong> {stock.quantity}</p>
      <p><strong>Purchase Price:</strong> ${stock.purchasePrice.toFixed(2)}</p>
      <p><strong>Current Price:</strong> ${stock.currentPrice.toFixed(2)}</p>
      <p className={
        stock.profitLoss > 0
          ? "profit"
          : stock.profitLoss < 0
          ? "loss"
          : "neutral"
      }>
        <strong>Profit/Loss:</strong>{" "}
        {stock.profitLoss === 0
          ? "No Gain or Loss"
          : `${stock.profitLoss > 0 ? "+" : ""}$${stock.profitLoss.toFixed(2)}`}
      </p>
    </li>
  );
}

export default StockItem;




