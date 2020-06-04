import React, {useEffect, useState} from 'react';
import {withFirebase} from "../Firebase";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

function OrderDetail(props) {
    console.log(props);

    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState(null)
    const [selectedStatus, setSelectedStatus] = useState(null)

    console.log(order);
    console.log(selectedStatus);

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

    useEffect(() => {

        setLoading(true);
        props.firebase
            .order(props.match.params.id)
            .on('value', snapshot => {
                setOrder(snapshot.val())
                setLoading(false)
                setSelectedStatus(snapshot.val().status)
            })
    }, [])

    const handleChange = (e) => {
        props.firebase.order(props.match.params.id).update( {status: e.target.value})

    }
    if(order){
    return (
        <Container maxWidth="lg">
            <Typography > Zamówienie {order.orderId}</Typography>
        <TableContainer component={Paper} className={classes.table}>
            <Table size="small" >
            <TableHead className={classes.tableHead}>
                <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Localization</TableCell>
                    <TableCell>LocalizationSpec</TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{order.email}</TableCell>
                        <TableCell><FormControl>
                            <InputLabel id="status-select-label">Status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                id="status-select"
                                value={order.status}
                                onChange={handleChange}
                            >
                                <MenuItem value='open'>Open</MenuItem>
                                <MenuItem value='pending'>Pending</MenuItem>
                                <MenuItem value='closed'>Closed</MenuItem>
                                <MenuItem value='rejected'>Rejected</MenuItem>
                            </Select>
                        </FormControl></TableCell>
                        <TableCell>{order.orderInfo.localization}</TableCell>
                        <TableCell>{order.orderInfo.localizationSpecific !== ''? order.orderInfo.localizationSpecific : 'Brak podanego'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <br/>
        <TableContainer component={Paper} className={classes.table}>
            <Table>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell align='center'>Dane</TableCell>
                        <TableCell>Liczba worków</TableCell>
                        <TableCell>Zawartość</TableCell>
                        <TableCell>Dla kogo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>{order.orderInfo.bags}</TableCell>
                        <TableCell>{order.orderInfo.type}</TableCell>
                        <TableCell>{order.orderInfo.helpGroups.join(", ")}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <br/>
            <TableContainer component={Paper} className={classes.table}>
            <Table>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell align='center'>Dane do odbioru</TableCell>
                        <TableCell>Adres</TableCell>
                        <TableCell>Numer telefonu</TableCell>
                        <TableCell>Data i godzina</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>{order.orderInfo.userInfo.address}, {order.orderInfo.userInfo.postCode} {order.orderInfo.userInfo.city}</TableCell>
                        <TableCell>{order.orderInfo.userInfo.phoneNumber}</TableCell>
                        <TableCell>{order.orderInfo.userInfo.date}, {order.orderInfo.userInfo.time} </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </Container>
    );
    } return null;
}

export default withFirebase(OrderDetail);