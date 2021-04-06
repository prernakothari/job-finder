import React, { useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// is location is a number (US zip code), we could use zip static for obtaining City, State in US

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "left",
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    logo: {
        backgroundColor: "#FFFFFF",
        marginLeft: 16,
        marginTop: 16,
        height: theme.spacing(7),
        width: theme.spacing(7),
    },
}));

function TimeAgo(created_at) {
    created_at = created_at.split(" ")
    let month = {
        "Jan": 0,
        "Feb": 1,
        "Mar": 2,
        "Apr": 3,
        "May": 4,
        "Jun": 5,
        "Jul": 6,
        "Aug": 7,
        "Sep": 8,
        "Oct": 9,
        "Nov": 10,
        "Dec": 11
    }
    let minutes = 1000 * 60;
    let hours = minutes * 60;
    let days = hours * 24;
    let months = days * 30;
    let years = days * 365;
    let createdDayTime = created_at[3].split(":").map(it => Number(it))

    let createdDate = Date.UTC(Number(created_at[5]), month[created_at[1]], Number(created_at[2]), createdDayTime[0], createdDayTime[1], createdDayTime[2]);
    let deltaT = new Date().getTime() - createdDate

    if (deltaT < 1000 * 60)
        return "Just now"
    else if (deltaT > minutes && deltaT < hours)
        return `${Math.floor(deltaT / minutes)} min ago`
    else if (deltaT > hours && deltaT < days)
        return `${Math.floor(deltaT / hours)}h ago`
    else if (deltaT > days && deltaT < months)
        return `${Math.floor(deltaT / days)}d ago`
    else if (deltaT > months && deltaT < years)
        return `${Math.floor(deltaT / months)} months ago`
    else
        return `${Math.floor(deltaT / years)}yr ago`
}


export default function JobTile({ title, type, created_at, company_logo, company, location }) {
    let timeAgo = TimeAgo(created_at)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;


    return (
        <div>
            <Avatar variant="rounded" src={company_logo} className={classes.logo} />
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {timeAgo}   {bull}   {type}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {company}
                    </Typography>
                    <Typography color="textPrimary">
                        {location}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
