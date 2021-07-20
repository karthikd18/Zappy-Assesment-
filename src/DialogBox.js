import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import AppartmentsDetails from './AppartmentDetails'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    root: {
        padding:50,
        minHeight: 500,
        minWidth: 300,
    },
    closeIcon:{
        float:'left',
        alignItems:'flex-end'
        
    }

});

export default function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();  
    };


    return (
        <Dialog fullWidth="false" onClose={handleClose} open={open}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose}/>
            <div className={classes.root}>
                <AppartmentsDetails details={props.item} />
            </div>
        </Dialog>

    );
}
