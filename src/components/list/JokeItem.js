import React from 'react';

import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import Counter from '../ui/Counter';
import classes from '../../assets/stylesheets/jokeitem.module.css';

const jokeItem = props => {
    return (
        <li className={classes.JokeItem}>
            <div className={classes.Controls}>
                <div
                    className={classes.Icons}
                    onClick={() => props.clicked(props.id, props.score - 1)}>
                    <KeyboardArrowDown fontSize='large' />
                </div>
                <Counter count={props.score} />
                <div
                    className={classes.Icons}
                    onClick={() => props.clicked(props.id, props.score + 1)}>
                    <KeyboardArrowUp fontSize='large' />
                </div>
            </div>
            <div className={classes.JokeText}>{props.children}</div>
            <div className={classes.Emoji}>EMOJI</div>
        </li>
    );
};

export default jokeItem;
