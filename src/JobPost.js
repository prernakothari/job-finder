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
import { PurpleButton } from "./Button"
// is location is a number (US zip code), we could use zip static for obtaining City, State in US

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "left",
        position: "relative",
        top: - theme.spacing(3.5),
    },
    details: {
        textAlign: "left",
        position: "relative",
        marginTop: theme.spacing(3.5)
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
    },
    logo: {
        backgroundColor: "#FFFFFF",
        marginLeft: 16,
        height: theme.spacing(7),
        width: theme.spacing(7),
        zIndex: 2,
    },
    applyNowButton: {
        float: "right"
    }

}));

export default function JobDetails() {
    let [jobData, setJobDetails] = useState(testData()[0])
    let timeAgo = TimeAgo(jobData.created_at)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <div>
            <div className={classes.root}>
                <Container fixed>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar variant="rounded" src={jobData.company_logo} className={classes.logo} />
                            }
                            action={
                                <PurpleButton href={jobData.company_url} aria-label="Company Site"> Company Site
                                </PurpleButton>
                            }
                            title={jobData.company}
                            subheader={jobData.company_url}
                        />
                    </Card>
                    <Card className={classes.details}>
                        <CardContent>
                            <Grid container direction="row" justify="space-between" alignItems="center" >
                                <Grid item xs={12} sm={8} lg={8}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {timeAgo}   {bull}   {jobData.type}
                                    </Typography>
                                    <Typography variant="h6" component="h6">
                                        {jobData.title}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {jobData.company}
                                    </Typography>
                                    <Typography color="textPrimary">
                                        {jobData.location}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} lg={8}>
                                    <PurpleButton className={classes.applyNowButton}>
                                        Apply Now
                                    </PurpleButton>
                                </Grid>
                            </Grid>
                            <Typography color="textPrimary">
                                <div dangerouslySetInnerHTML={{ __html: jobData.description }} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </div>
    )
}