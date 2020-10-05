import React, {useEffect, useState} from 'react';
import {withFirebase} from "../Firebase";
import Container from "@material-ui/core/Container";
import TableOrganization from "./TableOrganization";



function Organizations(props) {

    const [loading, setLoading] = useState(false)
    const [organizations, setOrganizations] = useState(false)


    useEffect(() => {
        setLoading(true);
        props.firebase.siteInfo().on('value', snapshot => {
            const ordersObject = snapshot.val();
            setOrganizations(ordersObject)
            setLoading(false)

        });

        return () => {
            props.firebase.siteInfo().off();
        }

    }, [])
    console.log(organizations)

    if (organizations) {
        return (
            <Container>
                <TableOrganization type={organizations.foundations} title='Fundacje' key='Fundacje'/>
                <TableOrganization type={organizations.local} title='Lokalne' key='Lokalne'/>
                <TableOrganization type={organizations.organizations} title='Organizacje' key='Organizacje'/>
            </Container>
        );
    } else if (organizations === null)
    {

    }
    return null;

}

export default withFirebase(Organizations);