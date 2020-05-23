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
import HomeFourSteps from "./HomeFourSteps";

function Home() {
    return (
        <>
            <HomeHero/>
            <HomeThreeColums/>
            <Element name='fourSteps'>
                <HomeFourSteps/>
            </Element>
            <Element name='whoWeHelp'>
                <WhoWeHelp/>
            </Element>
        </>
    );
}

export default Home;