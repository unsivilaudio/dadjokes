import React from 'react';
import axios from 'axios';
import Simplebar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import JokeItem from './JokeItem';
import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from '../../assets/stylesheets/jokelist.module.css';

class JokeList extends React.Component {
    state = { jokes: [] };

    componentDidMount() {
        this.fetchTenJokes();
    }

    fetchTenJokes = async () => {
        try {
            const response = await axios.get(
                'https://icanhazdadjoke.com/search?limit=10',
                { headers: { Accept: 'application/json' } }
            );
            const jokes = response.data.results.map(el => {
                el.score = 0;
                return el;
            });
            console.log(jokes);
            this.setState({ jokes });
        } catch (err) {
            console.log(err);
        }
    };

    renderJokeList = () => {
        return this.state.jokes.map(el => {
            return (
                <JokeItem
                    key={el.id}
                    id={el.id}
                    score={el.score}
                    clicked={this.handleScoreChange}>
                    {el.joke}
                </JokeItem>
            );
        });
    };

    handleScoreChange = (id, val) => {
        const jokes = this.state.jokes.map(el => {
            if (el.id === id) el.score = val;
            return el;
        });
        this.setState({ jokes });
    };

    render() {
        return (
            <div className={classes.JokeList}>
                <Card flex='column'>
                    <div className={classes.Content}>
                        <h3 className={classes.Header}>
                            Dad<span>Jokes</span>
                        </h3>
                        <div className={classes.Action}>
                            <Button
                                label='New Jokes'
                                btnStyle='Primary'
                                clicked={this.fetchTenJokes}
                            />
                        </div>
                    </div>
                    <Simplebar style={{ maxHeight: '500px' }}>
                        <ul className={classes.List}>
                            {this.renderJokeList()}
                        </ul>
                    </Simplebar>
                </Card>
            </div>
        );
    }
}

export default JokeList;
