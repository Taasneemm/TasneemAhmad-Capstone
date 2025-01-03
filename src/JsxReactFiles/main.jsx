import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../JsxReactFiles/App.jsx'
import '../CssFiles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
