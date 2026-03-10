import { createRoot } from 'react-dom/client'
import './index.css'
import RouterCustom from './router.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RouterCustom />
  </BrowserRouter>
)
