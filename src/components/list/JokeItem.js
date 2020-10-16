import React from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

import emoji from './emoji';
import Counter from '../ui/Counter';
import classes from '../../assets/stylesheets/jokeitem.module.css';

const jokeItem = props => {
    const emojiStyle =
        props.score > 0
            ? props.score > 10
                ? emoji.positive3
                : props.score > 5
                ? emoji.positive2
                : emoji.positive1
            : props.score < 0
            ? props.score < -5
                ? emoji.negative2
                : emoji.negative1
            : emoji.neutral;

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
            <div className={classes.Emoji}>
                <img src={emojiStyle} alt={`${props.score}-emoji`} />
            </div>
        </li>
    );
};

export default jokeItem;
