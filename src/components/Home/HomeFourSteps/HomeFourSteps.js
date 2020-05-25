import React from 'react';
import "./HomeFourSteps.scss"
import {ReactComponent as Decoration} from "../../../assets/Decoration.svg";
import StepColumn from "./StepColumn";
import {Link} from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import {AuthUserContext} from "../../Session";


function HomeFourSteps(props) {
    return (
        <AuthUserContext.Consumer>
            {authUser =>
        <div className='steps-cnt'>
            <h2 className='steps-title'>Wystarczą 4 proste kroki</h2>
            <Decoration/>
            <div className='steps-icon-cnt'>
            <StepColumn icon='Icon-1.svg' title='Wybierz rzeczy' text='ubrania, zabawki, sprzęt i inne'/>
            <StepColumn icon='Icon-2.svg' title='Spakuj je' text='skorzystaj z worków na śmieci'/>
            <StepColumn icon='Icon-3.svg' title='Zdecyduj komu chcesz pomóc' text='wybierz zaufane miejsce'/>
            <StepColumn icon='Icon-4.svg' title='Zamów kuriera' text='kurier przyjedzie w dogodnym terminie'/>
            </div>
            <div className='page-steps-btn'>
                {authUser ? <Link to={ROUTES.APP_FORM}>ODDAJ<br/>RZECZY</Link>: <Link to={ROUTES.SIGN_IN}>ODDAJ<br/>RZECZY</Link>}
            </div>
        </div>}
        </AuthUserContext.Consumer>
    );
}

export default HomeFourSteps;