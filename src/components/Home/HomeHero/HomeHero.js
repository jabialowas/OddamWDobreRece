import React from 'react';
import {ReactComponent as Decoration} from "../../../assets/Decoration.svg";
import './HomeHero.scss'
import * as ROUTES from '../../../constants/routes'
import {Link} from "react-router-dom";
import {AuthUserContext} from "../../Session";
const HomeHero = () =>  {

    return (
        <AuthUserContext.Consumer>
            {authUser =>
                <div className='page-hero'>
                    <div className='page-hero-cnt'>
                        <h1>Zacznij pomagać!<br/> Oddaj niechciane rzeczy w zaufane ręce</h1>
                        <Decoration/>
                        <div className='page-hero-btns'>
                            {authUser ? <Link to={ROUTES.APP_FORM}>ODDAJ<br/>RZECZY</Link>: <Link to={ROUTES.SIGN_IN}>ODDAJ<br/>RZECZY</Link>}
                            {authUser ? <Link to={ROUTES.APP_FORM}>ZORGANIZUJ<br/>ZBIÓRKĘ</Link>: <Link to={ROUTES.SIGN_IN}>ZORGANIZUJ<br/>ZBIÓRKĘ</Link>}
                        </div>
                    </div>
                </div>
            }
        </AuthUserContext.Consumer>
    );
}

export default HomeHero;