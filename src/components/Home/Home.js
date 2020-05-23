import React from 'react';
import HomeHero from "./HomeHero";
import HomeThreeColums from "./HomeThreeColumns";
import WhoWeHelp from "./WhoWeHelp";
import {
    Link,
    DirectLink,
    Element,
    Events,
    animateScroll,
    scrollSpy,
    scroller
} from "react-scroll";

function Home() {
    return (
        <>
            <HomeHero/>
            <HomeThreeColums/>
            <Element name='whoWeHelp'>
            <WhoWeHelp/>
            </Element>
            </>
    );
}

export default Home;