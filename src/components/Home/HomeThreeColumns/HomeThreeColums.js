import React from 'react';
import Column from "./Column";
import './HomeThreeColums.scss'

function HomeThreeColums(props) {
    return (
        <div className='home-threecolums-cnt'>
            <Column title='10'
                    subtitle='ODDANYCH WORKÓW'
                    text='Lorem ipsum dolor sit amet, consectetur adipisc Pellentesque vel enim a elit viverra elementuma. Aliquam erat volutpat.'/>
            <Column title='5'
                    subtitle='WSPARTYCH ORGANIZACJI'
                    text='Lorem ipsum dolor sit amet, consectetur adipisc Pellentesque vel enim a elit viverra elementuma. Aliquam erat volutpat.'/>
            <Column title='7'
                    subtitle='ZORGANIZOWANY ZBIÓREK'
                    text='Lorem ipsum dolor sit amet, consectetur adipisc Pellentesque vel enim a elit viverra elementuma. Aliquam erat volutpat.'/>
        </div>
    );
}

export default HomeThreeColums;