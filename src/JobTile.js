import React, { useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import "./JobTile.css";
import { TimeAgo } from "./Utils"
// is location is a number (US zip code), we could use zip static for obtaining City, State in US

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "left",
        minWidth: 275,
        position: "relative",
        top: - theme.spacing(3.5),
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

}));

export default function JobTile({ title, type, created_at, company_logo, company, location }) {
    let timeAgo = TimeAgo(created_at)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;


    return (
        <div>
            <Avatar variant="rounded" src={company_logo} sx={{ ".MuiAvatar-img": "contain" }} className={classes.logo} />
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {timeAgo}   {bull}   {type}
                    </Typography>
                    <Typography variant="h6" component="h6">
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
