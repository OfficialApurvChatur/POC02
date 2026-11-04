import { createRoot } from 'react-dom/client'
import ReactConnection from './aConnection/ReactConnection'
import "@/aConnection/aShadcnConnection/index.css";


createRoot(document.getElementById('root')!).render(
  <ReactConnection />
)
