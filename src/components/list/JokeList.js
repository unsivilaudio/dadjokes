import React from 'react';

import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from '../../assets/stylesheets/jokelist.module.css';

class JokeList extends React.Component {
    render() {
        return (
            <div className={classes.JokeList}>
                <Card flex='column'>
                    <h3 className={classes.Header}>The Joke List Component</h3>
                    <div className={classes.Content}>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Commodi ea eaque veniam vel quaerat animi
                            mollitia, provident reprehenderit assumenda sed
                            molestiae maiores accusamus sequi accusantium modi
                            est expedita tempora totam.
                        </p>
                        <div>
                            <Button label='Success' btnStyle='Success' />
                            <Button label='Danger' btnStyle='Danger' />
                            <Button label='Primary' btnStyle='Primary' />
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default JokeList;
