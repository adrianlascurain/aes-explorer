import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AddRoundKeyOp from './components/AddRoundKeyOp.tsx';
import SubBytesOp from './components/SubBytesOp.tsx';
import AesCipher from "./cipher/AesCipher";
import ShiftRowsOp from './components/ShiftRowsOp.tsx';
import CardCarousel from './components/CardCarousel.tsx';
import { CardCarouselLanguage } from './language/CardCarouselLanguage';
import PlayGround from './components/PlayGround.tsx';
import MixColumnsOp from './components/MixColumnsOp.tsx';
import NavBar from './components/NavBar.tsx';
import LandingPage from './components/LandingPage.tsx';
import type { Matrix4x4 } from './types/matrix.ts';
import EnclosedTermsOperation from './components/EnclosedTermsOperation.tsx';
import xorIcon from "./assets/multiplication.svg"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <AddRoundKeyOp state={[[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]]} roundKey={[[255, 10, 1, 0], [200, 2, 193, 18], [210, 203, 165, 35], [75, 29, 87, 5]]} representation='hexPadded' stateTitle='State' roundKeyTitle='Round Key' resultTitle='Result' /> */}
    {/* <SubBytesOp state={[[255, 4, 190, 12], [1, 5, 111, 13], [2, 6, 10, 204], [3, 79, 11, 15]]} stateTitle='State' resultTitle='Result' sBox={AesCipher.INV_SBOX} representation='hex' lowNibbleTitle='Low Nibble: ' highNibbleTitle='High Nibble: ' stateContainerTitle='State Value: '/> */}
    
    {/* <ShiftRowsOp state={[[255, 4, 190, 12], [1, 5, 111, 13], [2, 6, 10, 204], [3, 79, 11, 15]]} shiftType='normal' representation='dec'/> */}
    {/* <CardCarousel items={CardCarouselLanguage.getCarouselItems('ES')}/> */}
    {/* <PlayGround></PlayGround> */}
    {/* <MixColumnsOp state={[[255, 4, 190, 12], [1, 5, 111, 13], [2, 6, 10, 204], [3, 79, 11, 15]]} fixedPolynomios={AesCipher.MIX_COLUMNS_INVERSE_MATRIX as Matrix4x4}/> */}
    <MixColumnsOp 
    inverseMixColumns
     state={[
  [0x5f, 0xba, 0x50, 0x66],
  [0x9c, 0xc6, 0x40, 0x67],
  [0x6a, 0x34, 0x9f, 0x76],
  [0xbf, 0xaa, 0xa7, 0x53]
]}
/>
    {/* <LandingPage></LandingPage> */}
  </StrictMode>,
)
