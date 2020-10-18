import React from 'react';
import Simplebar from 'simplebar-react';

import classes from '../../assets/stylesheets/favorites.module.css';
import Button from '../ui/Button';
import Card from '../ui/Card';
import FavItem from './FavItem';
import emoji from './emoji';

const favorites = props => {
    const renderFavsList = () => {
        return props.items.map(fav => {
            const link = `https://icanhazdadjoke.com/j/${fav.id}`;
            return (
                <FavItem
                    key={fav.id}
                    clicked={() => props.handleFavorite(fav)}
                    permalink={link}>
                    {fav.joke}
                </FavItem>
            );
        });
    };

    return (
        <Card>
            <div className={classes.Favorites}>
                <h1 className={classes.Header}>
                    <img src={emoji.favorite} alt='heart-emoji' />
                    <p>Your personal favorites</p>
                </h1>
                <div className={classes.Content}>
                    <Simplebar>
                        <ul className={classes.List}>{renderFavsList()}</ul>
                    </Simplebar>
                    <Button
                        label='Go Back'
                        btnStyle='Danger'
                        clicked={props.toggleList}
                    />
                </div>
            </div>
        </Card>
    );
};

export default favorites;
