import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from "@material-ui/core/colors";
import { colors } from "../helpers/constants";

export const PurpleButton = withStyles((theme) => ({
    root: {
        color: colors.mainLight,
        "text-transform": "capitalize",
        backgroundColor: colors.purple,
        '&:hover': {
            backgroundColor: purple[500]
        },
    }
}))(Button)

export const LightPurpleButton = withStyles((theme) => ({
    root: {
        color: "black",
        "text-transform": "capitalize",
        backgroundColor: colors.lightPurple,
        '&:hover': {
            backgroundColor: purple[500]
        },
    }
}))(Button)

export const DarkPurpleButton = withStyles((theme) => ({
    root: {
        color: colors.mainLight,
        "text-transform": "capitalize",
        backgroundColor: colors.darkPurple,
        '&:hover': {
            backgroundColor: purple[500]
        },
    }
}))(Button)