import React, { useEffect } from "react"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import "./JobTile.css";
import { TimeAgo } from "./Utils"
import { useHistory } from "react-router-dom";
import { colors } from "./constants"
// is location is a number (US zip code), we could use zip static for obtaining City, State in US


export default function JobTile({ themeType, title, type, created_at, company_logo, company, location, url }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            textAlign: "left",
            minWidth: 275,
            position: "relative",
            top: - theme.spacing(3.5),
            '&:hover': {
                "cursor": "pointer"
            },
            backgroundColor: themeType === "light" ? colors.mainLight : colors.mainDark,
            color: themeType === "light" ? "black" : "white",
            [theme.breakpoints.up('sm')]: {
                height: 225,
            },
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            marginTop: theme.spacing(3.5),
            fontSize: 14,
            color: themeType === "light" ? colors.mainDark : colors.mainLight,
        },
        pos: {
            color: themeType === "light" ? "black" : "white",
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(3),
            },
        },
        location: {
            color: colors.purple,
            position: "absolute",
            bottom: theme.spacing(2)
        },
        logo: {
            backgroundColor: "white",
            marginLeft: 16,
            height: theme.spacing(7),
            width: theme.spacing(7),
            zIndex: 2,
            boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%); `
        },

    }));


    let timeAgo = TimeAgo(created_at)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const history = useHistory();
    const handleClick = () => {
        history.push("/positions/" + url.split("/").pop());
    }

    return (
        <div className={classes.main}>
            <Avatar variant="rounded" src={company_logo} sx={{ ".MuiAvatar-img": "contain" }} className={classes.logo} />
            <Card className={classes.root} onClick={handleClick}>
                <CardContent >
                    <Typography className={classes.title} gutterBottom>
                        {timeAgo}   {bull}   {type}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        {title}
                    </Typography>
                    <Typography className={classes.pos}>
                        {company}
                    </Typography>
                    <Typography className={classes.location}>
                        {location}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
