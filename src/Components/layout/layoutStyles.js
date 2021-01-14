import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: 0,
    },
    appBar: {
        display: 'flex',
        justifyContent: "space-between",
        flexWrap: "nowrap",
        zIndex: theme.zIndex.drawer - 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "white"
    },
    toolBar: {
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    menuButton: {
        marginRight: 36,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: 0,
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        marginLeft: 57 - drawerWidth
    },
    contentContainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
        margin: 0
    }
}));

export default useStyles