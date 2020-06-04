import React, {useEffect, useState} from 'react';
import {Switch, Route, withRouter, Link, BrowserRouter as Router,} from 'react-router-dom';
import {compose} from 'recompose';

import {withAuthorization} from '../Session';
import {UserList, UserItem} from '../Users';
import {Orders, OrderDetail} from "../Orders";
import {Organizations, OrganizationItem} from "../Organizations"

import * as ROUTES from '../../constants/routes';
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Dashboard from "../Dashboard";


const AdminPage = (props) => {
    const [open, setOpen] = useState(false)
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(prev => !prev)
    };


    return (
        <Container>
            <Button color='secondary' onClick={toggleDrawer('left', true)}>Menu {!open ? <ArrowForwardIosIcon/> :
                <ArrowBackIosIcon/>}</Button>
            <Drawer anchor='left' open={open} onClose={toggleDrawer('left', false)}>
                <List>
                    <>
                        <ListItem button key='Zamowienia'>
                            <Link to={ROUTES.ORDERS} >Zamowienia </Link>
                        </ListItem>
                        <Divider/>
                        <ListItem button key='Uzytkownicy'>
                            <Link to={ROUTES.USERS} >Uzytkownicy </Link>
                        </ListItem>
                        <Divider/>
                        <ListItem button key='Organizacje'>
                            <Link to={ROUTES.ORGANIZATIONS} >Organizacje </Link>
                        </ListItem>
                        <Divider/>
                    </>
                </List>
            </Drawer>
            <Container>
            <Switch>
                <Route exact path={ROUTES.ADMIN} component={Dashboard}/>
                <Route exact path={ROUTES.USER_DETAIL} component={UserItem}/>
                <Route exact path={ROUTES.USERS} component={UserList}/>
                <Route exact path={ROUTES.ORDERS} component={Orders}/>
                <Route exact path={ROUTES.ORDER_DETAIL} component={OrderDetail}/>
                <Route exact path={ROUTES.ORGANIZATION_DETAIL} component={OrganizationItem}/>
                <Route exact path={ROUTES.ORGANIZATIONS} component={Organizations}/>
            </Switch>
            </Container>
            </Container>
    )

}

const condition = authUser => authUser && authUser.roles && authUser.roles['ADMIN'] === 'ADMIN'


export default compose(
    withRouter,
    withAuthorization(condition),
)(AdminPage);