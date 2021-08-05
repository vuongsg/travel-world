import { Typography } from '@material-ui/core';
import { ReactElement } from 'react';
import './About.scss';

export const About = (): ReactElement => {
    return (
        <div id='main'>
            <Typography>
                <h3>A place to introduce the countries around the world</h3>
                <p>Hi everyone. I'm Vuong Nguyen, the creator</p>
            </Typography>
        </div>
    )
}