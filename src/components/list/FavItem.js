import React from 'react';
import { Favorite } from '@material-ui/icons';

import Button from '../ui/Button';
import classes from '../../assets/stylesheets/favoriteitem.module.css';

const favItem = props => {
    return (
        <li className={classes.FavoriteItem}>
            <div className={classes.Icon} onClick={props.clicked}>
                <Favorite fontSize='large' />
            </div>
            <div className={classes.Content}>"{props.children}"</div>
            <a href={props.permalink} target='_blank' rel='noopener noreferrer'>
                <Button btnStyle='Success' label='Share' />
            </a>
        </li>
    );
};

export default favItem;
