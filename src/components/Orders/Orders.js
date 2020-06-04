import React, {useEffect, useState} from 'react';
import {withFirebase} from "../Firebase";
import * as ROUTES from '../../constants/routes';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";
import Input from "@material-ui/core/Input";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Container from "@material-ui/core/Container";

const Orders = (props) => {
    const [filteredOrders, setFilteredOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [search, setSearch] = useState('')


    useEffect(() => {
        setFilteredOrders(orders.filter(el => el.email.includes(search) || el.status.includes(search) || el.orderId.includes(search)))
    }, [search])

    useEffect(() => {
        setLoading(true);
        props.firebase.orders().on('value', snapshot => {
            const ordersObject = snapshot.val();
            const ordersList = Object.keys(ordersObject).map(key => ({
                ...ordersObject[key]
            }));
            setFilteredOrders(ordersList.filter(el => el.email.includes(search)))
            setOrders(ordersList)
            setLoading(false)

        });

        return () => {
            props.firebase.orders().off();
        }

    }, [loading])



    const useStyles = makeStyles({
        table: {
            minWidth: 650,
            maxWidth: 1600,

        },
        tableHead: {
            background: 'rgba(127,232,255,0.54)'
        }
    });
    const classes = useStyles();

    console.log(props.match.params);
    console.log(filteredOrders);
    if (orders.length > 0 ) {

        return (
            <>
                <Input onChange={e => setSearch(e.target.value)}/>
                <Container size='lg'>
                <TableContainer className={classes.table}>
                <Table size='small' >
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Lokalizacja</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Id</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Szczegóły</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredOrders.map((order) => {
                            return (
                                <TableRow key={`${order.orderInfo.userId} ${order.orderInfo.userInfo.date} ${order.orderInfo.userInfo.time}`} >
                                    <TableCell>{order.orderInfo.userInfo.date}</TableCell>
                                    <TableCell>{order.orderInfo.localization} -- {order.orderInfo.localizationSpecific}</TableCell>
                                    <TableCell>{order.email}</TableCell>
                                    <TableCell>{order.orderId}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>
                                        <Link
                                            to={{
                                                pathname: `${ROUTES.ORDERS}/${order.orderId}`,
                                                state: {order: order},
                                            }}
                                        > Szczegóły </Link>
                                    </TableCell>
                                </TableRow>
                            )

                        })}
                    </TableBody>
                </Table>
                </TableContainer>
                </Container>
            </>
        );
    }
    return null;
}

export default withFirebase(Orders);