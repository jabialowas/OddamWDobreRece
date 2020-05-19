import React from 'react';
import {ReactComponent as Decoration} from "../../assets/Decoration.svg";
import './HomeHero.scss'
function HomeHero() {
    return (
        <div className='page-hero'>
            <div className='page-hero-cnt'>
            <h1>Zacznij pomagać!<br/> Oddaj niechciane rzeczy w zaufane ręce</h1>
           <Decoration/>
           <div className='page-hero-btns'>
           <a> ODDAJ<br/> RZECZY</a>
           <a> ZORGANIZUJ<br/> ZBIÓRKĘ</a>
           </div>
            </div>
        </div>
    );
}

export default HomeHero;