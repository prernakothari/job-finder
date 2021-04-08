import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import JobTile from "./JobTile";
import testData from "./testData";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import { colors } from "./constants";
import SortIcon from '@material-ui/icons/Sort';
import { DarkPurpleButton } from "./Button";
import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function Gallery({ themeType, setSpinner, spinner }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: themeType === "light" ? colors.bgLight : colors.bgDark
        },
        desktopSearchBar: {
            display: "none",
            [theme.breakpoints.up('sm')]: {
                display: "block"
            },
        },
        mobileSearchBar: {
            display: "none",
            [theme.breakpoints.down('xs')]: {
                display: "block"
            },
        },
        searchBar: {
            color: themeType === "light" ? "black" : "white",
            backgroundColor: themeType === "light" ? colors.mainLight : colors.mainDark,
            marginBottom: theme.spacing(5),
            position: 'relative',
            top: -theme.spacing(3.5),
        },
        search: {
            backgroundColor: themeType === "light" ? colors.bgLight : colors.bgDark,
            position: 'relative',
            left: 0,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
                left: - theme.spacing(3)
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
            color: colors.purple
        },
        inputRoot: {
            color: themeType === "light" ? "black" : "white",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '30ch',
            },
            [theme.breakpoints.up('lg')]: {
                width: '30ch',
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(1),
                width: '25ch',
            },
        },
        checkboxForm: {
            padding: theme.spacing(0, 0, 0, 2),
        },
        checkboxLabel: {
            fontSize: "0.9em"
        },
        searchButton: {
            marginRight: theme.spacing(1)
        }
    }));

    const ThemedCheckbox = withStyles({
        root: {
            color: themeType === "light" ? "black" : "white",
            '&$checked': {
                color: colors.purple,
            },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);

    let [path, setPath] = useState("")
    let [shouldLoadNextPage, setShouldLoadNextPage] = useState(true)
    let [page, setPage] = useState(1)
    let [fetchError, setFetchError] = useState("")
    let [fullTimeFilter, setFullTimeFilter] = useState(false)
    let [showMobileFilters, setShowMobileFilters] = useState(false)
    let [description, setDescription] = useState("")
    let [locationQuery, setLocationQuery] = useState("")
    let [geoLocation, setGeoLocation] = useState(undefined)
    let [jobPostings, setJobPostings] = /* useState(testData()) */ useState([])
    let location = useLocation();
    let history = useHistory();

    const handleSubmit = () => {
        let desc = description.split(" ").join("+")
        let locQ = locationQuery.split(" ").join("+")
        let query = "positions.json?"
        if (description)
            query += "description=" + desc
        if (locationQuery) {
            query += "&location=" + locQ
        }
        if (fullTimeFilter)
            query += "&full_time=true"
        history.push(query)
        setPath(query)
        setPage(0)
    }

    const addToData = () => {
        if (path !== location.search)
            setPath(location.search)

        let url = `/cors-proxy/https://jobs.github.com/positions.json?page=${page + 1}` + location.search.substr(1, location.search.length)
        setPage(page + 1)
        axios.get(url)
            .then(
                response => {
                    setJobPostings([...jobPostings, ...response.data])
                    setFetchError("")
                    if (response.data.length > 0)
                        setShouldLoadNextPage(true)
                    else
                        setShouldLoadNextPage(false)
                }
            )
            .catch((e) => {
                setFetchError(e.message)
                setShouldLoadNextPage(false)
            })
    }

    if (path === "" && location.search === "") {
        navigator.geolocation.getCurrentPosition((position) => {
            let query = `positions.json?lat=${position.coords.latitude}&long=${position.coords.longitude}`
            history.push(query)
            setPath(query)
            setPage(0)
            setGeoLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        }, () => {
            setGeoLocation(null)
            console.log("Unable to retrieve your location!")
        })
    }

    useEffect(() => {
        setSpinner(true)
        if (path !== location.search)
            setPath(location.search)
        if (location.search === "" && geoLocation === null)
            return
        let url = "/cors-proxy/https://jobs.github.com/positions.json" + location.search
        axios.get(url)
            .then(
                response => {
                    setJobPostings(response.data);
                    setSpinner(false)
                    setFetchError("")
                    setShouldLoadNextPage(true)
                }
            )
            .catch(e => {
                setSpinner(false)
                setFetchError(e.message)
                setShouldLoadNextPage(false)
            })
    }, [path])

    const classes = useStyles();


    let JobCards = (
        <InfiniteScroll
            dataLength={jobPostings.length} //This is important field to render the next data
            next={addToData}
            hasMore={shouldLoadNextPage}
            loader={<p style={{ textAlign: "center", marginTop: "2em" }}>
                {!spinner &&
                    <CircularProgress />
                }
            </p>}
            endMessage={<div />}
        >
            <Grid container spacing={2} >
                {jobPostings.map(item =>
                    <Grid item xs={12} sm={6} lg={4}>
                        <JobTile themeType={themeType} {...item} />
                    </Grid>
                )}
            </Grid>
            {fetchError !== "" &&
                <Typography style={{ textAlign: "center", marginTop: "2em" }}>
                    <b>{fetchError}</b>
                </Typography>
            }
            {fetchError === "" && !spinner && jobPostings.length === 0 &&
                <Typography style={{ textAlign: "center", marginTop: "2em" }}>
                    <b>No Results Found!</b>
                </Typography>
            }
        </InfiniteScroll>
    )

    let DeskTopSearchBar = (
        <Card position="static" className={`${classes.desktopSearchBar} ${classes.searchBar}`}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item xs={12} sm={12} md={4} lg={4}>
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
                            value={description}
                        />
                    </div>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} sm={12} md={4} lg={4}>
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
                            value={locationQuery}
                        />
                    </div>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item>
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                        <Grid item>
                            <FormControlLabel
                                className={classes.checkboxForm}
                                control={
                                    <ThemedCheckbox
                                        className={classes.checkbox}
                                        checked={fullTimeFilter}
                                        onChange={(e) => { setFullTimeFilter(e.target.checked) }}

                                        color="primary"
                                        name="checkedA" />
                                }
                                label="Full Time Only"
                            />
                        </Grid>
                        <Grid item className={classes.searchButton}>
                            <DarkPurpleButton variant="contained" color="primary" onClick={handleSubmit}

                            >Search</DarkPurpleButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )

    let MobileSearchBar = (
        <Card position="static" className={`${classes.mobileSearchBar} ${classes.searchBar}`}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item xs={7}>
                    <div className={classes.search}>
                        <InputBase
                            placeholder="Filter by keyword..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            fullWidth={true}
                            onChange={(e) => { setDescription(e.target.value) }}
                            value={description}
                        />
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                        <Grid item>
                            <Button onClick={() => { setShowMobileFilters(!showMobileFilters) }}>
                                <SortIcon color="primary" />
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                <SearchIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {showMobileFilters &&
                    <Grid item xs={6}>
                        <InputBase
                            placeholder="Filter by Location..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => { setLocationQuery(e.target.value) }}
                            value={locationQuery}
                        />
                    </Grid>
                }
                {showMobileFilters &&
                    <Grid item xs={6}>
                        <FormControlLabel
                            classes={{ root: classes.checkboxForm, label: classes.checkboxLabel }}
                            control={
                                <ThemedCheckbox
                                    className={classes.checkbox}
                                    checked={fullTimeFilter}
                                    onChange={(e) => { setFullTimeFilter(e.target.checked) }}

                                    color="primary"
                                    name="checkedA" />
                            }
                            label="Full Time Only"
                        />
                    </Grid>
                }
            </Grid>
        </Card >
    )

    return (
        <div>
            <div className={classes.root}>
                <Container fixed>
                    {DeskTopSearchBar}
                    {MobileSearchBar}
                    {JobCards}
                </Container>
            </div>
        </div>
    );
}
