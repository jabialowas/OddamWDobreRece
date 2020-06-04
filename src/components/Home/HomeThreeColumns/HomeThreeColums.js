import React, {useEffect, useState} from 'react';
import Column from "./Column";
import './HomeThreeColums.scss'

import {withFirebase} from "../../Firebase";
import 'firebase/database'

function HomeThreeColums(props) {

    const [loading, setLoading] = useState(false)
    const [orderData, setOrderData] = useState(false)
    const [gatherings, setGatherings] = useState(0);
    const [totalBags, setTotalBags] = useState(0);
    const [totalOrganizations, setTotalOrganizations] = useState(0);


    const sumGatherings = (obj) => {
        let sum = 0;
        for (const el in obj) {
            if (obj[el].status === 'closed') {
                sum += 1;
            }
        }
        return sum;
    }
    const sumBags = (obj) => {
        let sum = 0;
        for (const el in obj) {
            if (obj.hasOwnProperty(el)) {
                if (obj[el].status === 'closed') {
                    sum += parseFloat((obj[el].orderInfo.bags))
                }
            }
        }
        return sum;
    }
    const sumOrganizations = (obj) => {
        let sum = [];
        for (const el in obj) {
            if (obj.hasOwnProperty(el)) {
                if (obj[el].status === 'closed' && obj[el].orderInfo.localization.length>0) {
                    sum.push(obj[el].orderInfo.localization)
                } else if (obj[el].status === 'closed' && obj[el].orderInfo.localizationSpecific.length>0)
                    sum.push(obj[el].orderInfo.localizationSpecific)
            }
        }
        return new Set(sum);
    }

    useEffect(() => {
        setLoading(true);
        props.firebase.orders().on('value', snapshot => {
            setOrderData(snapshot.val());
            setGatherings(sumGatherings(snapshot.val()))
            setTotalBags(sumBags(snapshot.val()));
            setTotalOrganizations(sumOrganizations(snapshot.val()).size);
            setLoading(false);

        });
        return () => props.firebase.orders().off();
    }, [])

    return (
        <div className='home-threecolums-cnt'>
            <Column key='bags'
                    title={totalBags}
                    subtitle='ODDANYCH WORKÓW'
                    text='Lorem ipsum dolor sit amet, consectetur adipisc Pellentesque vel enim a elit viverra elementuma. Aliquam erat volutpat.'/>
            <Column key='organizations'
                    title={totalOrganizations}
                    subtitle='WSPARTYCH ORGANIZACJI'
                    text='Lorem ipsum dolor sit amet, consectetur adipisc Pellentesque vel enim a elit viverra elementuma. Aliquam erat volutpat.'/>
            <Column key='gatherings'
                    title={gatherings}
                    subtitle='ZORGANIZOWANY ZBIÓREK'
                    text='Lorem ipsum dolor sit amet, consectetur adipisc Pellentesque vel enim a elit viverra elementuma. Aliquam erat volutpat.'/>
        </div>
    );
}

export default withFirebase(HomeThreeColums);