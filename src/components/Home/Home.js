import React from 'react';
import HomeHero from "./HomeHero";
import HomeThreeColums from "./HomeThreeColumns";
import WhoWeHelp from "./HomeWhoWeHelp";
import {
    Link,
    DirectLink,
    Element,
    Events,
    animateScroll,
    scrollSpy,
    scroller
} from "react-scroll";
import HomeFourSteps from "./HomeFourSteps";
import HomeAboutUs from "./HomeAboutUs/HomeAboutUs";
import HomeContact from "./HomeContact";

function Home() {
    return (
        <>
            <HomeHero/>
            <HomeThreeColums/>
            <Element name='fourSteps'>
                <HomeFourSteps/>
            </Element>
            <Element name='aboutUs'>
                <HomeAboutUs/>
            </Element>
            <Element name='whoWeHelp'>
                <WhoWeHelp/>
            </Element>
            <Element name='contact'>
                <HomeContact/>
            </Element>
        </>
    );
}

export default Home;