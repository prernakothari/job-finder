import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { purple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: theme.spacing(14),
        backgroundColor: "#F5F6F8"
    },
    homeNav: {
        color: "#FFFFFF",
        "text-decoration": "none"
    },
    toolbar: {
        height: theme.spacing(14),
        backgroundColor: "#5865E0",
        "border-bottom-left-radius": "55px"
    },
    title: {
        flexGrow: 1,
    },
}));

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);


export default function TopBar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        <Link to={"/"} className={classes.homeNav} >Dev Jobs</Link>
                    </Typography>
                    <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>
                                <WbSunnyIcon />
                            </Grid>
                            <Grid item>
                                <Switch size="small" checked={state.checkedA} onChange={handleChange} name="checkedA" />
                            </Grid>
                            <Grid item>
                                <Brightness3Icon />
                            </Grid>
                        </Grid>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
