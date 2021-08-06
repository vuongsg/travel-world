import { SnackbarContent } from '@material-ui/core';
import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './About.scss';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 600,
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      }
}));

export const About = (): ReactElement => {
    const classes = useStyles();

    return (
        <div id='main' className={classes.root}>
            <SnackbarContent
                message={
                    <div style={{lineHeight: 2}}>
                        <p>Hi everyone, I'm Vuong Nguyen - creator of this page &nbsp; ^_^</p>
                        <p>Here is the place where you can travel online around the world. Enjoy yourselves !</p>
                    </div>
                }
            />
        </div>
    )
}