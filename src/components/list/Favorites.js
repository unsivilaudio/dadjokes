import React from 'react';
import Simplebar from 'simplebar-react';

import classes from '../../assets/stylesheets/favorites.module.css';
import Button from '../ui/Button';
import Card from '../ui/Card';
import FavItem from './FavItem';

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
                <h1 className={classes.Header}>The Favorites Component</h1>
                <Simplebar style={{ maxHeight: '500px' }}>
                    <ul className={classes.List}>{renderFavsList()}</ul>
                </Simplebar>
                <Button
                    label='Go Back'
                    btnStyle='Primary'
                    clicked={props.toggleList}
                />
            </div>
        </Card>
    );
};

export default favorites;
