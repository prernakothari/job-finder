import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import JobTile from "./JobTile";
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
import { colors } from "../helpers/constants";
import SortIcon from '@material-ui/icons/Sort';
import { DarkPurpleButton } from "./Buttons";
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
        inputLocation: {
            [theme.breakpoints.up('sm')]: {
                paddingLeft: theme.spacing(1),
            },
            [theme.breakpoints.up('md')]: {
                paddingLeft: 0,
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
    let [locationMode, setLocationMode] = useState("location") // location or geoLocation
    let [geoLocation, setGeoLocation] = useState(undefined)
    let [jobPostings, setJobPostings] = /* useState(testData()) */ useState([])
    let location = useLocation();
    let history = useHistory();

    const handleSubmit = () => {
        setSpinner(true)
        setJobPostings([])
        let desc = description.split(" ").join("+")
        let locQ = locationQuery.split(" ").join("+")
        let query = "positions.json?"
        if (description)
            query += "description=" + desc
        if (locationMode === "location") {
            if (locationQuery) {
                query += "&location=" + locQ
            }
        } else if (geoLocation !== null && geoLocation !== undefined) {
            query += `&lat=${geoLocation.latitude}&long=${geoLocation.longitude}`
        }
        if (fullTimeFilter)
            query += "&full_time=true"
        history.push(query)
        setPath(query)
        setPage(1)
    }

    const success = (response) => {
        setJobPostings([...jobPostings, ...response.data])
        setFetchError("")
        if (response.data.length > 0)
            setShouldLoadNextPage(true)
        else
            setShouldLoadNextPage(false)
    }

    const fail = (e) => {
        setFetchError(e.message)
        setShouldLoadNextPage(false)
    }

    const addToData = () => {
        if (path !== location.search)
            setPath(location.search)

        let url = `/cors-proxy/https://jobs.github.com/positions.json?page=${page + 1}` + location.search.substr(1, location.search.length)
        axios.get(url)
            .then(
                success
            )
            .catch(
                fail
            )
        setPage(page + 1)
    }

    const handleGeoLocationSubmit = () => {
        if (locationMode === "location") {
            setLocationMode("geoLocation")
            SetLocationNearMe()
        }
        else {
            setLocationMode("location")
        }
    }

    const handleLocationInput = (e) => {
        if (locationMode === "geoLocation")
            setLocationMode("location")
        setLocationQuery(e.target.value)
    }

    const handleCheckBoxInput = (e) => {
        setFullTimeFilter(e.target.checked)
        if (e.target.checked)
            handleSubmit()
    }

    const SetLocationNearMe = () => {
        setSpinner(true)
        navigator.geolocation.getCurrentPosition((position) => {
            setPage(1)
            setLocationQuery('(using your location)')
            setGeoLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            setSpinner(false)
        }, () => {
            setGeoLocation(null)
            setSpinner(false)
            setLocationMode("location")
            alert("Unable to retrieve your location!")
        })
    }

    useEffect(handleSubmit, [geoLocation, locationMode])

    useEffect(() => {
        setPage(1)
        setSpinner(true)
        if (path !== location.search)
            setPath(location.search)
        let url = "/cors-proxy/https://jobs.github.com/positions.json" + location.search
        setJobPostings([])
        axios.get(url)
            .then(
                success
            )
            .catch(
                fail
            )
            .finally(() => {
                setSpinner(false)
            })
    }, [path])

    const classes = useStyles();

    let GeoLocationButton = (
        <Button active={locationMode === "location"} size="small" color="primary" onClick={handleGeoLocationSubmit}>
            <RoomIcon />
        </Button>
    )
    let textColor = themeType === "light" ? "black" : "white"
    let errorMessageStyle = { textAlign: "center", marginTop: "2em", color: textColor }

    let JobCards = (
        <InfiniteScroll
            dataLength={jobPostings.length} //This is important field to render the next data
            next={addToData}
            hasMore={shouldLoadNextPage}
            loader={<p style={errorMessageStyle}>
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
                <Typography style={errorMessageStyle}>
                    <b>{fetchError}</b>
                </Typography>
            }
            {fetchError === "" && !spinner && jobPostings.length === 0 &&
                <Typography style={errorMessageStyle}>
                    <b>No Results Found!</b>
                </Typography>
            }
        </InfiniteScroll>
    )

    let DeskTopSearchBar = (
        <Card position="static" className={`${classes.desktopSearchBar} ${classes.searchBar}`}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={12} sm={12} md={4} lg={4} >
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

                        <Grid container direction="row" justify="flex-start" alignItems="center">
                            <Grid item sm={1} md={2}>
                                {GeoLocationButton}
                            </Grid>
                            <Grid item sm={9} md={8}>
                                <InputBase
                                    placeholder="Filter by Location..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: `${classes.inputInput} ${classes.inputLocation}`,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={handleLocationInput}
                                    value={locationQuery}
                                />
                            </Grid>

                        </Grid>

                    </div>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} sm={12} md={4} lg={4} style={{ maxWidth: "32%" }}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>
                            <FormControlLabel
                                className={classes.checkboxForm}
                                control={
                                    <ThemedCheckbox
                                        className={classes.checkbox}
                                        checked={fullTimeFilter}
                                        onChange={handleCheckBoxInput}

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
                    <Grid item xs={4}>
                        <InputBase
                            placeholder="Filter by Location..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleLocationInput}
                            value={locationQuery}
                        />
                    </Grid>
                }
                {showMobileFilters &&
                    <Grid item sm={4}>
                        {GeoLocationButton}
                    </Grid>

                }
                {showMobileFilters &&
                    <Grid item xs={4}>
                        <FormControlLabel
                            classes={{ root: classes.checkboxForm, label: classes.checkboxLabel }}
                            control={
                                <ThemedCheckbox
                                    className={classes.checkbox}
                                    checked={fullTimeFilter}
                                    onChange={handleCheckBoxInput}

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
