import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {withFirebase} from "../Firebase";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import ListItem from "@material-ui/core/ListItem";

function Dashboard(props) {
    const [loading, setLoading] = useState(false)
    const [orderData, setOrderData] = useState(null)
    const [openOrders, setOpenOrders] = useState(0)

    const sumOpen = (obj) => {
        let sum = 0;
        for (const el in obj) {
            if (obj[el].status === 'open') {
                sum += 1;
            }
        }
        return sum;
    }

    useEffect(() => {
        setLoading(true);
        props.firebase.orders().on('value', snapshot => {
            setOrderData(snapshot.val());
            setOpenOrders(sumOpen(snapshot.val()))

        });
    }, [])

    console.log(props);
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper >
                        Zamówienia ze statusem open: {openOrders}
                    </Paper>
                    <Paper>
                        <Link to={ROUTES.ORDERS} >Zamowienia </Link>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default withFirebase(Dashboard);