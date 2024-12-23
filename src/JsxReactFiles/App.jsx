import FormCard from "../JsxReactFiles/FormCard.jsx";
import { StockProvider } from "../Contexts/StockContext.jsx";

function App() {
  return (
    <StockProvider>
      <FormCard />
    </StockProvider>
  );
}

export default App;



