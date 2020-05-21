import React from 'react';
import {ReactComponent as Decoration} from "../../../assets/Decoration.svg";
import './HomeHero.scss'
import * as ROUTES from '../../../constants/routes'
import {Link} from "react-router-dom";
const HomeHero = ({authUser}) =>  {
    console.log(authUser);
    return (
        <div className='page-hero'>
            <div className='page-hero-cnt'>
            <h1>Zacznij pomagać!<br/> Oddaj niechciane rzeczy w zaufane ręce</h1>
           <Decoration/>
           <div className='page-hero-btns'>
               {authUser === 'null' ? <Link to={ROUTES.SIGN_IN}>ODDAJ<br/>RZECZY</Link>
                   : <Link to={ROUTES.APP_FORM}>ODDAJ<br/>RZECZY</Link>}

           <a> ZORGANIZUJ<br/> ZBIÓRKĘ</a>
           </div>
            </div>
        </div>
    );
}

export default HomeHero;