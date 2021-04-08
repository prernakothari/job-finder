import React, { useEffect, useState } from "react"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { purple } from "@material-ui/core/colors";
import { colors } from "./constants";

export const PurpleButton = withStyles((theme) => ({
    root: {
        color: colors.mainLight,
        backgroundColor: colors.purple,
        '&:hover': {
            backgroundColor: purple[500]
        },
    }
}))(Button)

export const LightPurpleButton = withStyles((theme) => ({
    root: {
        color: "black",
        backgroundColor: colors.lightPurple,
        '&:hover': {
            backgroundColor: purple[500]
        },
    }
}))(Button)

export const DarkPurpleButton = withStyles((theme) => ({
    root: {
        color: "black",
        backgroundColor: colors.darkPurple,
        '&:hover': {
            backgroundColor: purple[500]
        },
    }
}))(Button)