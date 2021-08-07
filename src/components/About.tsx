import { Container, Grid, SnackbarContent } from '@material-ui/core';
import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 680,
        padding: 30,
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      }
}));

export const About = (): ReactElement => {
    const classes = useStyles();

    return (
        <Container>
            <Grid container direction='row'>
                <Grid item lg={12} className={classes.root}>
                    <SnackbarContent
                        message={
                            <div style={{lineHeight: 2}}>
                                <p>Hi everyone, I'm Vuong Nguyen - creator of this page &nbsp; ^_^</p>
                                <p>Here is the place where you can travel online around the world. Enjoy yourselves !</p>
                            </div>
                        }
                    />
                </Grid>
            </Grid>
        </Container>
    )
}