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
import { colors } from "./constants";


export default function TopBar({ themeType, handleThemeChange }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            height: theme.spacing(14),
            backgroundColor: themeType === "light" ? colors.bgLight : colors.bgDark,
            "box-shadow": "none",
        },
        homeNav: {
            color: "#FFFFFF",
            "text-decoration": "none"
        },
        toolbar: {
            height: theme.spacing(14),
            backgroundColor: colors.purple,
            "border-bottom-left-radius": "55px",
            [theme.breakpoints.down('xs')]: {
                "border-bottom-left-radius": "0px"
            }
        },
        title: {
            flexGrow: 1,
        },
    }));

    const ThemeSwitch = withStyles({
        switchBase: {
            color: "gray",
            '&$checked': {
                color: "white",
            },
            '&$checked + $track': {
                backgroundColor: colors.darkPurple,
            },
        },
        checked: {},
        track: {},
    })(Switch);

    const classes = useStyles();
    const [state, setState] = React.useState({ checkedA: false });

    const handleChange = (event) => {
        if (event.target.checked)
            handleThemeChange("dark")
        else
            handleThemeChange("light")

        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        <Link to={"/"} className={classes.homeNav} >devjobs</Link>
                    </Typography>
                    <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>
                                <WbSunnyIcon fontSize="small" />
                            </Grid>
                            <Grid item>
                                <ThemeSwitch size="small" checked={state.checkedA} onChange={handleChange} name="checkedA" />
                            </Grid>
                            <Grid item>
                                <Brightness3Icon fontSize="small" />
                            </Grid>
                        </Grid>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
