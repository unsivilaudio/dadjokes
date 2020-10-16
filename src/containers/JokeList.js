import React from 'react';
import Simplebar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import JokeItem from '../components/list/JokeItem';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import classes from '../assets/stylesheets/jokelist.module.css';

class JokeList extends React.Component {
    renderJokeList = () => {
        const favIds = this.props.favorites.map(el => el.id);
        return this.props.jokes.map(el => {
            return (
                <JokeItem
                    key={el.id}
                    id={el.id}
                    score={el.score}
                    favorited={favIds.includes(el.id)}
                    toggleFavorite={() => this.props.handleFavorite(el)}
                    clicked={this.props.handleRating}>
                    {el.joke}
                </JokeItem>
            );
        });
    };

    render() {
        return (
            <div className={classes.JokeList}>
                <Card flex='column'>
                    <Simplebar style={{ maxHeight: '500px' }}>
                        <ul className={classes.List}>
                            {this.renderJokeList()}
                        </ul>
                    </Simplebar>
                    <div className={classes.FooterAction}>
                        {this.props.page === 1 ? (
                            <div />
                        ) : (
                            <Button
                                label='Prev Page'
                                btnStyle='Primary'
                                clicked={() =>
                                    this.props.fetchPage(this.props.page - 1)
                                }
                            />
                        )}
                        <Button
                            label='Next Page'
                            btnStyle='Success'
                            disabled={this.props.page === this.props.maxPages}
                            clicked={() =>
                                this.props.fetchPage(this.props.page + 1)
                            }
                        />
                    </div>
                </Card>
            </div>
        );
    }
}

export default JokeList;
