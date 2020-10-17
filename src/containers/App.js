import React from 'react';
import axios from 'axios';

import classes from '../assets/stylesheets/app.module.css';
import Button from '../components/ui/Button';
import JokeList from './JokeList';
import FavoritesList from '../components/list/Favorites';

class App extends React.Component {
    state = {
        jokes: [],
        favorites: [],
        showFavorites: false,
        ratings: {},
        page: 1,
        nPages: 99,
    };

    componentDidMount() {
        const ratings = JSON.parse(localStorage.getItem('joke_ratings'));
        const favorites = JSON.parse(localStorage.getItem('joke_favorites'));
        this.setState({ ratings, favorites });
        this.fetchTenJokes(this.state.page);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.ratings !== this.state.ratings) {
            localStorage.setItem(
                'joke_ratings',
                JSON.stringify(this.state.ratings)
            );
        }
        if (prevState.favorites !== this.state.favorites) {
            localStorage.setItem(
                'joke_favorites',
                JSON.stringify(this.state.favorites)
            );
        }
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

    handleShowFavorites = () => {
        this.setState(prevState => {
            return { ...prevState, showFavorites: !prevState.showFavorites };
        });
    };

    handleSortRating = () => {
        const jokes = [...this.state.jokes]
            .map(el => el)
            .sort((a, b) => {
                return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
            });
        this.setState({ jokes });
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

    handleChangeRating = (id, val) => {
        const ratings = { ...this.state.ratings };
        ratings[id] = val;
        const jokes = this.state.jokes.map(el => {
            if (el.id === id) el.score = val;
            return el;
        });
        this.setState({ jokes, ratings });
    };

    render() {
        return (
            <div className={classes.App}>
                <div className={classes.Hero}>
                    <h3 className={classes.Header}>
                        Dad<span>Jokes</span>
                    </h3>
                    <span>
                        <Button
                            label={
                                this.state.showFavorites
                                    ? 'More Jokes'
                                    : 'Favorites'
                            }
                            btnStyle='Primary'
                            clicked={this.handleShowFavorites}
                        />
                        <Button
                            label='Sort'
                            btnStyle='Success'
                            clicked={this.handleSortRating}
                        />
                    </span>
                </div>
                <div className={classes.Content}>
                    {this.state.showFavorites ? (
                        <FavoritesList items={this.state.favorites} />
                    ) : (
                        <JokeList
                            favorites={this.state.favorites}
                            handleFavorite={this.handleToggleFavorite}
                            ratings={this.state.ratings}
                            handleRating={this.handleChangeRating}
                            page={this.state.page}
                            maxPage={this.state.nPages}
                            fetchPage={this.fetchTenJokes}
                            jokes={this.state.jokes}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default App;
