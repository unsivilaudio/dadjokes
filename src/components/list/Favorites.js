import React from 'react';

import classes from '../../assets/stylesheets/favorites.module.css';
import Button from '../ui/Button';
import Card from '../ui/Card';

const favorites = props => {
    return (
        <Card>
            <div className={classes.Favorites}>
                <h1>The Favorites Component</h1>
                <Button label='Go Back' btnStyle='Primary' clicked={null} />
            </div>
        </Card>
    );
};

export default favorites;
