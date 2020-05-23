import React from 'react';
import "./HomeFourSteps.scss"
import {ReactComponent as Decoration} from "../../../assets/Decoration.svg";
import StepColumn from "./StepColumn";


function HomeFourSteps(props) {
    return (
        <div className='steps-cnt'>
            <h2>Wystarczą 4 proste kroki</h2>
            <Decoration/>
            <div className='steps-icon-cnt'>
            <StepColumn icon='Icon-1.svg' title='Wybierz rzeczy' text='ubrania, zabawki, sprzęt i inne'/>
            <StepColumn icon='Icon-2.svg' title='Spakuj je' text='skorzystaj z worków na śmieci'/>
            <StepColumn icon='Icon-3.svg' title='Zdecyduj komu chcesz pomóc' text='wybierz zaufane miejsce'/>
            <StepColumn icon='Icon-4.svg' title='Zamów kuriera' text='kurier przyjedzie w dogodnym terminie'/>
            </div>
        </div>
    );
}

export default HomeFourSteps;