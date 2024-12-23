import StockItem from "../JsxReactFiles/StockItem.jsx";
import { useStockContext } from "../Contexts/StockContext.jsx";
import "../CssFiles/StockList.css";

function StockList() {
  const { stocks } = useStockContext(); // Use StockContext

  return (
    <div>
      {stocks.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <ol className="stockListContainer">
          {stocks.map((stock, index) => (
            <StockItem key={index} stock={stock} />
          ))}
        </ol>
      )}
    </div>
  );
}

export default StockList;


