import React from 'react';
import { Redirect } from 'react-router';
import './css/Search.css';
import axios from 'axios';

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            performRandom: false,
            performSearch: false,
            searchTerm: '',
            randomId: null
        };

        this.performSearch = this.performSearch.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    getRandomDrink = (event) => {

        axios
            .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then( res => {
                const drinkID = res.data.drinks[0].idDrink;
                this.setState( (prevState) => {
                    return {
                        ...prevState,
                        randomId: drinkID,
                        performRandom: true
                    }
                })
            })
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

        if(this.state.performSearch) {
            return <Redirect to={'/search/' + this.state.searchTerm } push/>
        }
        
        if(this.state.performRandom) {
            return <Redirect to={'/drink/' + this.state.randomId } push />
        }
        
        return (
            <div className="search">
                <form onSubmit={this.performSearch} className="search__form">
                    <label>Feeling thirsty?</label>
                    <input type="text" placeholder="What can I get started for you..." value={this.state.searchTerm} onChange={this.updateSearch} />
                </form>
                <button onClick={this.getRandomDrink}>Bartender&rsquo;s Choice</button>
            </div>
        );
    }
}

export default Search;