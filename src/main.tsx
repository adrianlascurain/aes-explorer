import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AddRoundKeyOp from './components/AddRoundKeyOp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AddRoundKeyOp state={[[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]]} roundKey={[[255, 10, 1, 0], [200, 2, 193, 18], [210, 203, 165, 35], [75, 29, 87, 5]]} stateTitle='Estado' roundKeyTitle='Clave de Ronda' resultTitle='Resultado' />

  </StrictMode>,
)
