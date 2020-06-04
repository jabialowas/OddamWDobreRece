import React, {useState} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withFirebase} from "../Firebase";
import firebase from "firebase";
import makeStyles from "@material-ui/core/styles/makeStyles";

const TableOrganization = props => {
    console.log(props);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [needs, setNeeds] = useState('')
    const [city, setCity] = useState('')

    const  handleNameChange = (e) => {
        setName(e.target.value)
    }
    const  handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const  handleNeedsChange = (e) => {
        setNeeds(e.target.value)
    }
    const  handleCityChange = (e) => {
        setCity(e.target.value)
    }
    const handleSave = (e) => {
        if (props.title === 'Fundacje') {
            const newKey = firebase.database().ref().child('siteInfo/foundations/').push().key;
            const data = {
                name:name,
                description:description,
                needs:needs,
                city:city,
                keyId: newKey
            }

            const updates ={}
            updates['siteInfo/foundations/' + newKey] = data;
            firebase.database().ref().update(updates)


            setName('')
            setDescription('')
            setCity('')
            setNeeds('')
        } else if (props.title === 'Lokalne') {
            const newKey = firebase.database().ref().child('siteInfo/local/').push().key;
            const data = {
                name:name,
                description:description,
                needs:needs,
                city:city,
                keyId: newKey
            }

            const updates ={}
            updates['siteInfo/local/' + newKey] = data;
            firebase.database().ref().update(updates)
            setName('')
            setDescription('')
            setCity('')
            setNeeds('')
        } else if (props.title === 'Organizacje') {
            const newKey = firebase.database().ref().child('siteInfo/organizations/').push().key;
            const data = {
                name:name,
                description:description,
                needs:needs,
                city:city,
                keyId: newKey
            }

            const updates ={}
            updates['siteInfo/organizations/' + newKey] = data;
            firebase.database().ref().update(updates)
            setName('')
            setDescription('')
            setCity('')
            setNeeds('')
        }
    }

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

    if(props.type){
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>{props.title}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Nazwa</TableCell>
                            <TableCell>Opis</TableCell>
                            <TableCell>Potrzeby</TableCell>
                            <TableCell>Miasto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(props.type).map(key => ({
                            ...props.type[key]
                        })).map(el => (
                            <>
                                <TableRow key={el.id}>
                                    <TableCell>{el.name}</TableCell>
                                    <TableCell>{el.description}</TableCell>
                                    <TableCell>{el.needs}</TableCell>
                                    <TableCell>{el.city}</TableCell>
                                    <TableCell><Link to={{
                                        pathname: `${ROUTES.ORGANIZATIONS}${props.title}/${el.keyId}`,
                                        state: {details: el},
                                    }}
                                    > Szczegóły </Link></TableCell>
                                </TableRow>
                                <TableRow>

                                </TableRow>
                            </>
                        ))}
                        <TableRow>
                            <TableCell><TextField label="Nazwa" value={name} onChange={handleNameChange}/></TableCell>
                            <TableCell><TextField label="Opis" value={description} onChange={handleDescriptionChange}/></TableCell>
                            <TableCell><TextField label="Potrzeby" value={needs} onChange={handleNeedsChange}/></TableCell>
                            <TableCell><TextField label="Miasto" value={city} onChange={handleCityChange}/></TableCell>
                            <TableCell><Button color='secondary' onClick={handleSave}>Zapisz</Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
        </>
    )} return null;

}
export default withFirebase(TableOrganization)