import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import "./JobTile.css";
import testData from "./testData"
import { TimeAgo } from "./Utils"
import { PurpleButton, LightPurpleButton, DarkPurpleButton } from "./Button"
import { useLocation } from "react-router-dom"
import { colors } from "./constants"
    // is location is a number (US zip code), we could use zip static for obtaining City, State in US

    ;

export default function JobDetails({ themeType }) {

    const useStyles = makeStyles((theme) => ({
        root: {
            textAlign: "left",
            position: "relative",
            top: - theme.spacing(3.5),
        },
        details: {
            textAlign: "left",
            position: "relative",
            marginTop: theme.spacing(3.5),
            backgroundColor: themeType === "light" ? colors.mainLight : colors.mainDark,
            color: themeType === "light" ? "black" : "white"
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            marginTop: theme.spacing(3.5),
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
            color: themeType === "light" ? colors.mainDark : colors.mainLight,
        },
        logo: {
            backgroundColor: colors.mainLight,
            height: theme.spacing(10),
            width: theme.spacing(10),
            zIndex: 2,
        },
        applyNowButton: {
            float: "right",
            width: "100%"
        },
        JobDetailsHeading: {
            height: theme.spacing(10),
            backgroundColor: themeType === "light" ? colors.mainLight : colors.mainDark,
            color: themeType === "light" ? "black" : "white"
        },
        companyHeading: {
            paddingLeft: theme.spacing(3)
        },
        companySiteButton: {
            marginRight: theme.spacing(3)
        },
        howToApplyCard: {
            marginTop: theme.spacing(3),
            backgroundColor: colors.purple,
            color: colors.mainLight
        },
        location: {
            color: colors.purple
        }

    }))
    let CompanySiteButton = themeType === "light" ? LightPurpleButton : DarkPurpleButton
    let [path, setPath] = useState("")
    let [jobData, setJobDetails] = useState(testData()[0])
    let timeAgo = TimeAgo(jobData.created_at)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const location = useLocation();
    let pattern = new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)
    let applyLink = pattern.exec(jobData.how_to_apply)

    useEffect(() => {
        console.log(location)
        if (path !== location.pathname)
            setPath(location.pathname)
        let url = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/" + location.pathname + ".json"
        fetch(url)
            .then(
                response => {
                    return response.json()
                })
            .then(
                jobData => {
                    setJobDetails(jobData);
                    console.log(jobData)
                }
            )
            .catch(e => console.log(e))
    }, [path])

    return (
        <div>
            <div className={classes.root}>
                <Container fixed>
                    <Card className={classes.JobDetailsHeading}>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item >
                                        <Avatar variant="rounded" src={jobData.company_logo} className={classes.logo} />
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="column" className={classes.companyHeading}>
                                            <Grid item>
                                                <Typography>
                                                    {jobData.company}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography>
                                                    {jobData.company_url}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <CompanySiteButton className={classes.companySiteButton} href={jobData.company_url} aria-label="Company Site">Company Site</CompanySiteButton>
                            </Grid>
                        </Grid>
                    </Card>
                    <Card className={classes.details}>
                        <CardContent>
                            <Grid container direction="row" justify="space-between" alignItems="center" >
                                <Grid item xs={12} sm={8} lg={8}>
                                    <Typography className={classes.title} gutterBottom>
                                        {timeAgo}   {bull}   {jobData.type}
                                    </Typography>
                                    <Typography variant="h6" component="h6">
                                        {jobData.title}
                                    </Typography>
                                    <Typography className={classes.pos} >
                                        {jobData.company}
                                    </Typography>
                                    <Typography className={classes.location} >
                                        {jobData.location}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} lg={8}>
                                    <PurpleButton className={classes.applyNowButton} href={applyLink}>
                                        Apply Now
                                    </PurpleButton>
                                </Grid>
                            </Grid>
                            <Typography >
                                <div dangerouslySetInnerHTML={{ __html: jobData.description }} />
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.howToApplyCard}>
                        <CardContent>
                            <Typography variant="h6" component="h6">
                                How to Apply?
                            </Typography>

                            <Typography >
                                <div dangerouslySetInnerHTML={{ __html: jobData.how_to_apply }} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </div>
    )
}