import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    bestModal: {
        display: 'block',
        width: 500,
        margin: 10,
        position: 'absolute',
        left: 250,
        top: 150
    },
    nickname: {
        width: 500
    },
    firstMessage: {
        width: 500,
        height: 200
    },
    chat: {
        zIndex: 10
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        overflow: 'auto',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
    },
    message: {
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    scrollContainer: {
        paddingRight: 20,
        marginRight: -20,
        overflowY: "scroll",
        overflowX: "hidden",
        width: "100%",
        height: "100%",
    },
    hiddenScroll: {
        overflow: "hidden",
        height: "100%",
        width: "100%"
    }
}));

export default useStyles
