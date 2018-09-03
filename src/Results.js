import React from 'react';
import './css/Results.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Results extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            searchTerm: undefined
        };
    }

    getResults = () => {
        const { searchTerm } = this.props.match.params;
        this.setState( (prevState) => {
            return {
                ...prevState,
                searchTerm: searchTerm
            }
        });

        axios
            .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchTerm)
            .then( res => {
                this.setState((prevState) => {
                    return { 
                        ...prevState,
                        results: res.data.drinks 
                    }
                })
            })
    }

    showResults = () => {
        if(this.state.results) {
            return this.state.results.map( result => {
                return (
                    <li key={result.idDrink}>
                        <Link to={"/drink/" + result.idDrink}>
                            <img src={result.strDrinkThumb} />
                            {result.strDrink}
                        </Link>
                    </li>
                );
            });
        } else {
            return <p>No results, try another search.</p>;
        }
    }

    componentDidMount() {
        this.getResults();
    }

    render () {
        return (
            <div className="results">
                <h1>Results: {this.state.searchTerm}</h1>
                <ul>
                    { this.showResults() }
                </ul>
            </div>
        )
    }
}

export default Results;