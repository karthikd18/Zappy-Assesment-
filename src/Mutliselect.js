import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultipleSelect({data, handleSelectChange,}) {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Select an option</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={data}
                    input={<Input/>}
                    renderValue={(selected) => {
                        let str = []
                        selected.forEach(item => {
                            if (item.enabled) {
                                str.push(item.type);
                            }
                        })

                        return str.join(', ')
                    }}
                    MenuProps={MenuProps}
                >
                    {data?.map((item) => (
                        <MenuItem key={item.id} value={item.type}>
                            <Checkbox onChange={() => handleSelectChange(item)}
                                      color="primary"
                                      checked={item.enabled}/>
                            <ListItemText primary={item.type}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
