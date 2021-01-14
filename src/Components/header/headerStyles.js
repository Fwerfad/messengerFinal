import {makeStyles} from "@material-ui/core/styles";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {Link} from "react-router-dom"

export const useStyles = makeStyles({
        button: {
            display: "inline-block",
            height: "108px",
            width: "100px",
            border: "none",
            background: "transparent",
            font: "20px",
            "&:focus": {
                outline: "none",
                boxShadow: "0 0 4px 0 rgba(0,0,0,0.2)"
            },
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)"
            }
        },

    }
);

export const ExpansionPanel = withStyles({
    root: {
        background: "transparent",
        border: "none",
        boxShadow: 'none',
        '&:before': {
            display: 'grid',
            backgroundColor: "transparent"
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
    root: {
        marginBottom: -1,
        minHeight: 56,
        display: "grid",
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

export const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        height:'100px',
        justifyContent: "center",
        padding: "0 0 8px 0",
    },
}))(MuiExpansionPanelDetails);

export const HeaderLink = ({buttonClass, fun, text, img, link}) => {
    return (
    <button onClick={fun} className={buttonClass}>
        <Link style={{color: "rgba(0, 0, 0, 0.54", textDecoration: "none"}} to={link}>
            <Grid container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center">
                <Grid item xs>{img}</Grid>
                <Grid item xs>{text}</Grid>
            </Grid>
        </Link>
    </button>
    )
}

export default {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, useStyles, HeaderLink}
