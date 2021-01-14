import React from 'react';
import useStyles from "./modalStyles";
import Modal from '@material-ui/core/Modal';

export const ModalUI = (props) => {
    const classes = useStyles();

    return (
        <Modal open={props.isOpen} onClose={props.close}>
                <div className={classes.paper}>
                    {props.children}
                </div>
        </Modal>
    );
}

// export default ModalUI