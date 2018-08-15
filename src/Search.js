import React from 'react';
import { Redirect } from 'react-router';
import './css/Search.css';
import axios from 'axios';

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            chooseRandom: false,
            performSearch: false,
            searchTerm: ''
        };

        this.performSearch = this.performSearch.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    getRandomDrink(event) {
        event.preventDefault();

        axios
            .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then( res => console.log(res));
    }

    performSearch(event) {
        event.preventDefault();
        console.log(this.state.searchTerm);
        this.setState({ performSearch: true });
    }

    updateSearch(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.performSearch} className="search__form">
                    <label>Feeling thirsty?</label>
                    <input type="text" placeholder="What can I get started for you..." value={this.state.searchTerm} onChange={this.updateSearch} />
                </form>
                <button>Bartender&rsquo;s Choice</button>
                { this.state.performSearch && (
                    <Redirect to={'search/' + this.state.searchTerm }/>
                )}
            </div>
        );
    }
}

export default Search;