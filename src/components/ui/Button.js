import React from 'react';

import classes from '../../assets/stylesheets/button.module.css';

const customButton = props => {
    const styles = [classes.Button];

    switch (props.btnStyle) {
        case 'Primary':
            styles.push(classes.Primary);
            break;
        case 'Danger':
            styles.push(classes.Danger);
            break;
        case 'Success':
            styles.push(classes.Success);
            break;
        default:
            break;
    }

    return (
        <button type={props.btnType || 'button'} className={styles.join(' ')}>
            {props.label}
        </button>
    );
};

export default customButton;
