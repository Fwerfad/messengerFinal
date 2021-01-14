import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        overflow: "hidden",
        height: "90%",
        width: "90%",
        minWidth: 320,
        maxWidth: 700,
        minHeight: 320,
        maxHeight: 700,
        position: 'relative',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        boxShadow: theme.shadows[5],
        padding: 0,
        "&:focus": {
            outline: "none",
        }
    },
}));

export default useStyles