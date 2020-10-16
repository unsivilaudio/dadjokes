import React from 'react';
import axios from 'axios';
import Simplebar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import JokeItem from './JokeItem';
import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from '../../assets/stylesheets/jokelist.module.css';

class JokeList extends React.Component {
    state = {
        jokes: [],
        favorites: [],
        page: 1,
        nPages: 1,
        ratings: {},
    };

    componentDidMount() {
        this.fetchTenJokes(this.state.page);
    }

    fetchTenJokes = async page => {
        try {
            const response = await axios.get(
                `https://icanhazdadjoke.com/search?limit=10&page=${page}`,
                { headers: { Accept: 'application/json' } }
            );
            const keys = Object.keys(this.state.ratings);
            const jokes = response.data.results
                .map(el => {
                    keys.includes(el.id)
                        ? (el.score = this.state.ratings[el.id])
                        : (el.score = 0);
                    return el;
                })
                .sort((a, b) => {
                    return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
                });
            const nPages = response.data.total_pages;
            this.setState({ jokes, page, nPages });
        } catch (err) {
            console.log(err);
        }
    };

    sortJokeList = () => {
        const jokes = this.state.jokes
            .map(el => el)
            .sort((a, b) => {
                return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
            });
        this.setState({ jokes });
    };

    renderJokeList = () => {
        const favIds = [...this.state.favorites].map(el => el.id);
        return this.state.jokes.map(el => {
            return (
                <JokeItem
                    key={el.id}
                    id={el.id}
                    score={el.score}
                    favorited={favIds.includes(el.id)}
                    toggleFavorite={() => this.handleToggleFavorite(el)}
                    clicked={this.handleScoreChange}>
                    {el.joke}
                </JokeItem>
            );
        });
    };

    handleToggleFavorite = newFavorite => {
        let favorites = [...this.state.favorites];
        const keys = favorites.map(el => el.id);
        if (keys.includes(newFavorite.id)) {
            favorites = favorites.filter(el => el.id !== newFavorite.id);
        } else {
            favorites.push(newFavorite);
        }
        this.setState({ favorites });
    };

    handleScoreChange = (id, val) => {
        const ratings = this.state.ratings;
        ratings[id] = val;
        const jokes = this.state.jokes.map(el => {
            if (el.id === id) el.score = val;
            return el;
        });
        this.setState({ jokes, ratings });
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
                            {this.state.page === 1 ? null : (
                                <Button
                                    label='Prev Page'
                                    btnStyle='Primary'
                                    clicked={() =>
                                        this.fetchTenJokes(this.state.page - 1)
                                    }
                                />
                            )}
                            <Button
                                label='Next Page'
                                btnStyle='Success'
                                disabled={this.state.page === this.state.nPages}
                                clicked={() =>
                                    this.fetchTenJokes(this.state.page + 1)
                                }
                            />
                        </div>
                    </div>
                    <Simplebar style={{ maxHeight: '500px' }}>
                        <ul className={classes.List}>
                            {this.renderJokeList()}
                        </ul>
                    </Simplebar>
                    <div className={classes.FooterAction}>
                        <Button
                            label='Favorites'
                            btnStyle='Primary'
                            clicked={null}
                        />
                        <Button
                            label='Sort'
                            btnStyle='Success'
                            clicked={this.sortJokeList}
                        />
                    </div>
                </Card>
            </div>
        );
    }
}

export default JokeList;
