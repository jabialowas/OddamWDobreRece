import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Input from "@material-ui/core/Input";
import TableContainer from "@material-ui/core/TableContainer";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";



function UserList(props) {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])


    useEffect(() => {
        setLoading(true);
        props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            setUsers(usersList)
            setFilteredUsers(usersList)
            setLoading(false)

        });
        return () => {
            props.firebase.users().off();
        }
    }, [])

    useEffect(() => {
        setFilteredUsers(users.filter(user => user.email.includes(search) || user.uid.includes(search)))
    },[search])


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

    if(users.length > 0){
    return (
        <>
        <Input onChange={e =>setSearch(e.target.value)}/>
        <Container size='lg'>
        <TableContainer >
        <Table size='small' className={classes.table}>
            <TableHead className={classes.tableHead}>
                <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Szczegóły</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {filteredUsers.map((user) => {
                        return (
                    <TableRow key={user.uid}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.uid}</TableCell>
                        <TableCell>
                            <Link
                            to={{
                                pathname: `${ROUTES.USERS}/${user.uid}`,
                                state: {user},
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
    } return null;
}


export default withFirebase(UserList);