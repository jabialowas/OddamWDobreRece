import React from 'react';
import {ReactComponent as Decoration} from "../../../assets/Decoration.svg";
import "./GiveThingsHero.scss"
import Step from "./Step";

function GiveThingsHero() {
    return (
        <div className='givethings-hero'>
            <div className='givethings-hero-cnt'>
                <h1 className='givethings-title'>Oddaj rzeczy, których już nie chcesz <br/>POTRZEBUJĄCYM</h1>
                <Decoration/>
                <h2 className='givethings-subtitle'>Wystarczą 4 proste kroki:</h2>
                <div className='givethings-steps-cnt'>
                    <Step  title='1' text='Wybierz rzeczy' />
                    <Step  title='2' text='Spakuj je w worki' />
                    <Step  title='3' text='Wybierz fundacje' />
                    <Step  title='4' text='Zamów kuriera' />
                </div>

            </div>
        </div>
    );
}

export default GiveThingsHero;