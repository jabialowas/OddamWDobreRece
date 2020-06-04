import React, {useEffect, useState} from 'react';
import {withFirebase} from "../Firebase";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "firebase";

function OrganizationItem(props) {
console.log(props);
    const [loading, setLoading] = useState(false)
    const [organization, setOrganization] = useState(null)
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(props.location.state.details.name)
    const [description, setDescription] = useState(props.location.state.details.description)
    const [needs, setNeeds] = useState(props.location.state.details.needs)
    const [city, setCity] = useState(props.location.state.details.city)

    const handleClick = () => {
        if (props.match.params.title === 'Fundacje') {
            props.firebase.foundationsItem(props.location.state.details.keyId).update(
                {
                    name: name,
                    description: description,
                    needs: needs,
                    city: city
                })
        } else if (props.match.params.title === 'Organizacje') {
            props.firebase.organizationsItem(props.location.state.details.keyId).update({

                    name: name,
                    description: description,
                    needs: needs,
                    city: city
                })
        } else if (props.match.params.title === 'Lokalne') {
            props.firebase.localItem(props.location.state.details.keyId).update({

                name: name,
                description: description,
                needs: needs,
                city: city
            })
        }
    }
    const handleClickDelete = () => {
        console.log(props);
        if (props.match.params.title === 'Fundacje') {
            props.firebase.foundationsItem(props.location.state.details.keyId).remove()
        } else if (props.match.params.title === 'Organizacje') {
            props.firebase.organizationsItem(props.location.state.details.keyId).remove()
        } else if (props.match.params.title === 'Lokalne') {
            props.firebase.localItem(props.location.state.details.keyId).remove()
        }
    }

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

    useEffect(() => {
    console.log(props);
        setLoading(true);
        props.firebase
            .siteInfo()
            .on('value', snapshot => {
                let data;
                if (props.match.params.title === 'Fundacje') {
                    data = snapshot.val().foundations[props.location.state.details.keyId]
                } else if (props.match.params.title === 'Organizacje') {
                    data = snapshot.val().organizations[props.location.state.details.keyId]
                } else if (props.match.params.title === 'Lokalne') {
                    data = snapshot.val().local[props.location.state.details.keyId]
                }
                setOrganization(data)
                setLoading(false)

            })
        return () => props.firebase.siteInfo(props.match.params.id).off();
    }, []);

    if (organization) {
        console.log(organization);
        if (edit) {
            return (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nazwa</TableCell>
                                <TableCell>Opis</TableCell>
                                <TableCell>Potrzeby</TableCell>
                                <TableCell>Miasto</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><TextField  label="Nazwa" value={name} onChange={handleNameChange}/></TableCell>
                                <TableCell><TextField  label="Opis" value={description} onChange={handleDescriptionChange}/></TableCell>
                                <TableCell><TextField  label="Potrzeby" value={needs} onChange={handleNeedsChange}/></TableCell>
                                <TableCell><TextField  label="Miasto" value={city} onChange={handleCityChange}/></TableCell>
                                <TableCell><Button color='secondary' onClick={() => {
                                    setEdit(false)
                                    handleClick()
                                }}>Zapisz</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        } else if (!edit){
            return(

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nazwa</TableCell>
                                <TableCell>Opis</TableCell>
                                <TableCell>Potrzeby</TableCell>
                                <TableCell>Miasto</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{organization.name}</TableCell>
                                <TableCell>{organization.description}</TableCell>
                                <TableCell>{organization.needs}</TableCell>
                                <TableCell>{organization.city}</TableCell>
                                <TableCell><Button color='secondary' onClick={() => setEdit(true)}>Edytuj</Button></TableCell>
                                <TableCell><Button color='secondary' onClick={handleClickDelete}>Usuń</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }
    return null;
}

export default withFirebase(OrganizationItem);