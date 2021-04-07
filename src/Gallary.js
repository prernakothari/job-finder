import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import JobTile from "./JobTile";
import testData from "./testData";
import Container from "@material-ui/core/Container";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#F5F6F8"
    },
    grow: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    searchBar: {
        backgroundColor: "#FFFFFF",
        marginBottom: theme.spacing(7),
        position: 'relative',
        top: -theme.spacing(3.5),
    },
    toolbar: {
        padding: 0,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "gray"
    },
    inputRoot: {
        color: 'black',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    checkbox: {

    },
    checkboxForm: {
        padding: theme.spacing(0, 0, 0, 2),
        color: "black",
        "font-weight": "bold"
    }
}));

export default function Gallery() {
    let [path, setPath] = useState("")
    let [fullTimeFilter, setFullTimeFilter] = useState(false)
    let [description, setDescription] = useState("")
    let [locationQuery, setLocationQuery] = useState("")
    let [data, setData] = useState(testData())
    let location = useLocation();
    let history = useHistory();

    const handleSubmit = () => {
        let desc = description.split(" ").join("+")
        let locQ = locationQuery.split(" ").join("+")
        let query = "positions.json?"
        if (description)
            query += "description=" + desc
        if (locationQuery)
            query += "&location=" + locQ
        if (fullTimeFilter)
            query += "&full_time=true"
        history.push(query)
        setPath(query)
    }
    useEffect(() => {
        if (path !== location.search)
            setPath(location.search)
        let url = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json" + location.search
        fetch(url)
            .then(
                response => {
                    return response.json()
                })
            .then(
                data => {
                    setData(data);
                    console.log(data)
                }
            )
            .catch(e => console.log(e))
    }, [path])

    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <Container fixed>
                    <AppBar position="static" className={classes.searchBar}>
                        <Toolbar className={classes.toolbar}>
                            <Grid container>
                                <Grid item xs={4} sm={3} lg={4}>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Filter by title, companies, expertise..."
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                            fullWidth={true}
                                            onChange={(e) => { setDescription(e.target.value) }}
                                        />
                                    </div>
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs={1} sm={3} lg={4}>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <RoomIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Filter by Location..."
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                            onChange={(e) => { setLocationQuery(e.target.value) }}
                                        />
                                    </div>
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item >
                                    <div className={classes.grow} />
                                    <FormControlLabel
                                        className={classes.checkboxForm}
                                        control={
                                            <Checkbox
                                                className={classes.checkbox}
                                                checked={fullTimeFilter}
                                                onChange={(e) => { setFullTimeFilter(e.target.checked) }}
                                                color="primary"
                                                inputProps={{ 'aria-label': 'secondary checkbox', "font-weight": "bold" }}
                                                name="checkedA" />
                                        }
                                        label="Full Time Only"
                                    />
                                    <Button onClick={handleSubmit} >Search</Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={3}>
                        {data.map(item =>
                            <Grid item xs={12} sm={6} lg={4}>
                                <JobTile {...item} />
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </div>
        </div>
    );
}
