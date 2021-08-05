import { Typography } from '@material-ui/core';
import { ReactElement } from 'react';
import './About.scss';

export const About = (): ReactElement => {
    return (
        <div id='main'>
            <Typography>
                <h2>A place to introduce the countries around the world</h2>
                <h2>I'm Vuong Nguyen, the creator</h2>
            </Typography>
        </div>
    )
}