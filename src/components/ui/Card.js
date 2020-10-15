import React from 'react';

import classes from '../../assets/stylesheets/card.module.css';

const card = props => {
    const styles = [classes.Card];
    if (props.flex === 'column') styles.push(classes.Column);

    return <div className={styles.join(' ')}>{props.children}</div>;
};

export default card;
