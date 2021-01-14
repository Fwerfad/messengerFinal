import React, {useReducer} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ChatIcon from "@material-ui/icons/Chat";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, useStyles, HeaderLink} from './headerStyles';
import Typography from '@material-ui/core/Typography';

import { useLocation } from 'react-router-dom'

export const Header = (props) => {
    const [isOpen, toggleMenu] = useReducer((state) => !state, false);

    const classes = useStyles();
    console.log("classes");
    console.log(classes);
    let location = useLocation().pathname.replace(/[^a-z+]+/gi, '');
    return (
        <ExpansionPanel expanded={isOpen}>
            <ExpansionPanelSummary onClick={toggleMenu}>
                <Typography>
                    {location}
                    {isOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <HeaderLink fun={toggleMenu} text={'Chat'} buttonClass={classes.button} img={<ChatIcon/>} link={'/Chat'}/>
                <HeaderLink fun={toggleMenu} text={'Profile'} buttonClass={classes.button} img={<AccountCircleIcon/>}  link={'/Profiles'}/>
                <HeaderLink fun={toggleMenu} text={'Contacts'} buttonClass={classes.button} img={<PeopleAltIcon/>} link={'/Contacts'}/>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};
