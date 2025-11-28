import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AddRoundKeyOp from './components/AddRoundKeyOp.tsx'
import SubBytesOp from './components/SubBytesOp.tsx'
import AesCipher from "./cipher/AesCipher.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AddRoundKeyOp state={[[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]]} roundKey={[[255, 10, 1, 0], [200, 2, 193, 18], [210, 203, 165, 35], [75, 29, 87, 5]]} representation='hexPadded' stateTitle='Estado' roundKeyTitle='Clave de Ronda' resultTitle='Resultado' />
    <SubBytesOp state={[[255, 4, 190, 12], [1, 5, 111, 13], [2, 6, 10, 204], [3, 79, 11, 15]]} stateTitle='Estado' resultTitle='Resultado' sBox={AesCipher.invSBox} representation='hex' lowNibbleTitle='Low Nibble: ' highNibbleTitle='High Nibble: ' stateContainerTitle='State Value: '/>
  </StrictMode>,
)
