import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import JobTile from "./JobTile";
import testData from "./testData";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#F5F6F8"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Home() {
    let [path, setPath] = useState("")
    let [data, setData] = useState(testData())
    let location = useLocation();

    // useEffect(() => {
    //     setPath(location.search)
    //     let url = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json" + location.search
    //     fetch(url)
    //         .then(
    //             response => {
    //                 return response.json()
    //             })
    //         .then(
    //             data => {
    //                 setData(data);
    //                 console.log(data)
    //             }
    //         )
    //         .catch(e => console.log(e))
    // }, [path])

    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {data.map(item =>
                        <Grid item xs={12} sm={6} lg={4}>
                            <JobTile {...item} />
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    );
}
