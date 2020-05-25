import React from 'react';
import {ReactComponent as Decoration} from "../../../assets/Decoration.svg";
import './HomeAboutUs.scss'
import {useFormik} from "formik";
import * as ROUTES from "../../../constants/routes";

function HomeAboutUs(props) {
    return (
        <div className='about-cnt'>
            <div className='about-content-cnt'>
                <div className='about-text-cnt'>
                <h2 className='about-title'>O nas</h2>
                <Decoration/>
                <p className='about-text'>Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip.</p>
                <img className='about-signature' src={require('../../../assets/Signature.svg')} alt=""/>
                </div>
            </div>
            <div className="about-img-cnt">
            </div>
        </div>
    );
}

export default HomeAboutUs;