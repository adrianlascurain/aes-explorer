import './PlayGround.css';
import icon from '../assets/encrypted.svg';
import { useState } from 'react';
import AesCipher from "../cipher/AesCipher";
import SubBytesOp from '../components/SubBytesOp';
import ShiftRowsOp from './ShiftRowsOp';
import AddRoundKeyOp from './AddRoundKeyOp';

function PlayGround(){
    const [previousSelected, setPreviousSelected] = useState<HTMLElement>();
    const [playgroundRender, setPlaygroundRender] = useState<string>();

    const handleClickOnElement = (e: React.MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        setPreviousSelected(target);
        previousSelected?.classList.remove("selected-button");
        target.classList.add("selected-button");
        const aesFunction = target.getAttribute("aes-function")
        aesFunction && setPlaygroundRender(aesFunction)
    };

    let renderComponent = null;

    if (playgroundRender === "subbytes") {
        renderComponent = (
            <SubBytesOp
                state={[[255, 4, 190, 12], [1, 5, 111, 13], [2, 6, 10, 204], [3, 79, 11, 15]]}
                stateTitle='Estado'
                resultTitle='Resultado'
                sBox={AesCipher.INV_SBOX}
                representation='hex'
                lowNibbleTitle='Low Nibble: '
                highNibbleTitle='High Nibble: '
                stateContainerTitle='State Value: '
            />
        );
    }else if (playgroundRender === "shiftrows"){
        renderComponent = (<ShiftRowsOp state={[[255, 4, 190, 12], [1, 5, 111, 13], [2, 6, 10, 204], [3, 79, 11, 15]]} shiftType='normal' representation='dec'/>)
    }else if (playgroundRender === "addroundkey"){
        renderComponent = (<AddRoundKeyOp state={[[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]]} roundKey={[[255, 10, 1, 0], [200, 2, 193, 18], [210, 203, 165, 35], [75, 29, 87, 5]]} representation='hexPadded' stateTitle='Estado' roundKeyTitle='Clave de Ronda' resultTitle='Resultado' />)
    }

    return(
        <div className='playground-wrapper'>
            <div className='functions-container'>
                <div aes-function="subbytes" className='button-container' onClick={handleClickOnElement}>
                    <figure className='icon-figure'>
                        <img src={icon} alt="" />
                    </figure>
                    <h3 className='button-title'>PlaceHolder</h3>
                    <span className='function-description'>Description</span>
                </div>

                <div aes-function="shiftrows" className='button-container' onClick={handleClickOnElement}>
                    <figure className='icon-figure'>
                        <img src={icon} alt="" />
                    </figure>
                    <h3 className='button-title'>PlaceHolder</h3>
                    <span className='function-description'>Description</span>
                </div>

                <div aes-function="subbytes" className='button-container' onClick={handleClickOnElement}>
                    <figure className='icon-figure'>
                        <img src={icon} alt="" />
                    </figure>
                    <h3 className='button-title'>PlaceHolder</h3>
                    <span className='function-description'>Description</span>
                </div>

                <div aes-function="addroundkey" className='button-container' onClick={handleClickOnElement}>
                    <figure className='icon-figure'>
                        <img src={icon} alt="" />
                    </figure>
                    <h3 className='button-title'>PlaceHolder</h3>
                    <span className='function-description'>Description</span>
                </div>

                <div aes-function="subbytes" className='button-container' onClick={handleClickOnElement}>
                    <figure className='icon-figure'>
                        <img src={icon} alt="" />
                    </figure>
                    <h3 className='button-title'>PlaceHolder</h3>
                    <span className='function-description'>Description</span>
                </div>

                <div aes-function="subbytes" className='button-container' onClick={handleClickOnElement}>
                    <figure className='icon-figure'>
                        <img src={icon} alt="" />
                    </figure>
                    <h3 className='button-title'>PlaceHolder</h3>
                    <span className='function-description'>Description</span>
                </div>
            </div>
            <div className='playground-container'>
                {
                    renderComponent
                }
            </div>
        </div>
    );
}

export default PlayGround;