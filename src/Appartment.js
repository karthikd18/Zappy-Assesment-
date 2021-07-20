import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Appartmentsstyle.css";


import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AppartmentsDetails from './AppartmentDetails';
import MultipleSelect from './Mutliselect';
import DialogBox from './DialogBox';
import db from './db.json'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 8,
    },
    formControlLabel: {
        margin: theme.spacing(1),
    },
}));

function Appartment() {
    const classes = useStyles();
    const [apartments, setApartments] = useState([])

    const [checked, setChecked] = useState();
    const [landingViewFlag, setLandingViewFlag] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [item, setItem] = useState(null);
    const [filters, setFilters] = useState([])

    useEffect(() => {
        axios.get('https://my-json-server.typicode.com/zappyrent/frontend-assessment/properties').then(res => {

            setApartments(res.data)
        }
        )
    }, [])


    const handleClickOpen = (apartment) => {
        setOpen(true);
        setItem(apartment)
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const handleSelectChange = apartment => {
        if (filters.indexOf(apartment.type) > -1) {
            filters.splice(filters.indexOf(apartment.type), 1);
        } else {
            setFilters(arr => [...arr, apartment.type])
        }

        if (landingViewFlag) {
            setLandingViewFlag(false);
        }

        const filteredSelection = apartments.map(item => {
            if (item.type === apartment.type) {
                return {
                    ...item,
                    enabled: !item.enabled
                }
            }

            return item;
        })

        setApartments(filteredSelection);
    }

    const isApartmentCardVisible = item => {
        if (landingViewFlag) {
            if (checked) {
                return item.available
            }
            return landingViewFlag
        }
        else if (filters.length === 0) {
            return true;
        }

        else if (checked) {
            return item.enabled && item.available
        } else {
            return item.enabled
        }
    }

    return (
        <div className={classes.root}>
            <div className="main">
                <h1>ZappyRent</h1>
                <div className="subMain">
                <MultipleSelect
                    className="selectBox"
                    data={apartments}
                    handleSelectChange={handleSelectChange}
                />
                <FormControlLabel
                    className={classes.formControlLabel}
                    value="start"
                    control={<Checkbox checked={checked}
                        onChange={(event) => {
                            setChecked(event.target.checked)
                        }}
                        color="primary" />}
                    label="Available: "
                    labelPlacement="start"
                />
                </div>
            </div>

            <div className="Header">
                {apartments.map(item => {
                    if (isApartmentCardVisible(item)) {
                        return (
                            <div key={item.id} className="flex" onClick={() => handleClickOpen(item)}>
                                <ul>
                                    <li>
                                        <AppartmentsDetails details={item} />
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                })}
            </div>
            <DialogBox open={open} item={item} onClose={handleClose} />
        </div>
    );
}

export default Appartment;
