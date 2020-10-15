import React from 'react';

import classes from '../assets/stylesheets/app.module.css';
import JokeList from './list/JokeList';

const app = props => {
    return (
        <div className={classes.App}>
            <h1>The App component</h1>
            <JokeList />
        </div>
    );
};

export default app;
