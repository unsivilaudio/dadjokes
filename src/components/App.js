import React from 'react';

import classes from '../assets/stylesheets/app.module.css';
import JokeList from './list/JokeList';

const app = props => {
    return (
        <div className={classes.App}>
            <JokeList />
        </div>
    );
};

export default app;
