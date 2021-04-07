import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import JobTile from "./JobTile";
import testData from "./testData";
import Container from "@material-ui/core/Container";
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
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
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";

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
        fontWeight: "bold"
    },
    searchButton: {
        marginRight: theme.spacing(1)
    }
}));

export default function Gallery() {
    let [path, setPath] = useState("")
    let [shouldLoadNextPage, setShouldLoadNextPage] = useState(true)
    let [page, setPage] = useState(1)
    let [fullTimeFilter, setFullTimeFilter] = useState(false)
    let [description, setDescription] = useState("")
    let [locationQuery, setLocationQuery] = useState("")
    let [jobPostings, setJobPostings] = useState([])//testData())
    let location = useLocation();
    let history = useHistory();
    console.log(jobPostings.length)

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
        setPage(0)
    }

    const addToData = () => {
        if (path !== location.search)
            setPath(location.search)
        let url = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?page=${page + 1}` + location.search.substr(1, location.search.length)
        setPage(page + 1)
        fetch(url)
            .then(
                response => {
                    return response.json()
                })
            .then(
                data => {
                    setJobPostings([...jobPostings, ...data])
                    console.log(data.length)
                    if (data.length > 0)
                        setShouldLoadNextPage(true)
                    else
                        setShouldLoadNextPage(false)
                }
            )
            .catch(e => console.log(e))
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
                    setJobPostings(data);
                    console.log(data)
                }
            )
            .catch(e => console.log(e))
    }, [path])

    const classes = useStyles();


    let JobCards = (
        <InfiniteScroll
            dataLength={jobPostings.length} //This is important field to render the next data
            next={addToData}
            hasMore={shouldLoadNextPage}
            loader={<p style={{ textAlign: "center", marginTop: "2em" }}>
                <CircularProgress />
            </p>}
            endMessage={
                <Typography style={{ textAlign: "center", marginTop: "2em" }}>
                    <b>You have seen them all!</b>
                </Typography>
            }
        >
            <Grid container spacing={3}>
                {jobPostings.map(item =>
                    <Grid item xs={12} sm={6} lg={4}>
                        <JobTile {...item} />
                    </Grid>
                )}
            </Grid>
        </InfiniteScroll>
    )

    return (
        <div>
            <div className={classes.root}>
                <Container fixed>
                    <Card position="static" className={classes.searchBar}>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item xs={4} sm={4} lg={4}>
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
                            <Grid item xs={1} sm={4} lg={4}>
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
                                <Grid container direction="row" justify="flex-end" alignItems="center">
                                    <Grid item>
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
                                    </Grid>
                                    <Grid item className={classes.searchButton}>
                                        <Button variant="contained" color="primary" onClick={handleSubmit} >Search</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Container>
                {/* {JobCards} */}
                <Typography style={{ textAlign: "center", marginTop: "2em" }}>
                    <b>You have seen them all!</b>
                </Typography>
            </div>
        </div>
    );
}
