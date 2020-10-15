import React from 'react';

import classes from '../../assets/stylesheets/counter.module.css';

const counter = props => {
    const colorScale = {
        angry2: '#e74c3c',
        angry1: '#e67e22',
        neutral: '#f1c40f',
        positive1: '#1abc9c',
        positive2: '#2ecc71',
    };

    const borderColor =
        props.count > 0
            ? props.count > 10
                ? colorScale.positive2
                : colorScale.positive1
            : props.count < 0
            ? props.count < -5
                ? colorScale.angry2
                : colorScale.angry1
            : colorScale.neutral;

    return (
        <div className={classes.Counter} style={{ borderColor }}>
            <p className={classes.Value}>{props.count}</p>
        </div>
    );
};

export default counter;
