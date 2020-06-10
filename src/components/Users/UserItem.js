import React, {Component, useEffect, useState} from 'react';

import {withFirebase} from '../Firebase';
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";


function UserItem(props) {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null);
    console.log(props);
    const [selectedRole, setSelectedRole] = useState(null)

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value)
        props.firebase.user(user.uid).update(  {roles:{ ADMIN: e.target.value}})
    }



    useEffect(() => {
        if (props.location.state) {
            setUser(props.location.state.user)
            setSelectedRole(props.location.state.user.roles.ADMIN)
            return;
        }
        setLoading(true)
        props.firebase.user(props.match.params.id).on('value', snapshot => {
            setUser(snapshot.val())
            setSelectedRole(snapshot.val().user.roles.ADMIN)
            setLoading(false)
        });
    }, [])

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
    if (user && !loading) {
        return (
            <Container size='lg'>
                <TableContainer>
                    <Table size='small' className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow key={user.uid}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.uid}</TableCell>
                                <TableCell>
                                    <InputLabel id="status-select-label">Role</InputLabel>
                                    <Select
                                        labelId="status-select-label"
                                        id="status-select"
                                        value={selectedRole}
                                        onChange={handleRoleChange}
                                    >
                                        <MenuItem value='ADMIN'>ADMIN</MenuItem>
                                        <MenuItem value='USER'>USER</MenuItem>

                                    </Select>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
    return null;
}

export default withFirebase(UserItem);