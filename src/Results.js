import React from 'react';
import './css/Results.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Results extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: []
        };
    }

    componentDidMount() {
        this.getResults();
    }

    getResults = () => {
        const { searchTerm } = this.props.match.params;
        axios
            .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchTerm)
            .then( res => {
                console.log(res.data.drinks);
                this.setState((prevState) => {
                    return { results: res.data.drinks }
                })
            })
    }

    showResults = () => {
        if(this.state.results) {
            return this.state.results.map( result => <li key={result.idDrink}><Link to={"/drink/" + result.idDrink}>{result.strDrink}</Link></li>);
        } else {
            return 'No results, try another search.';
        }
    }

    render () {
        return (
            <div>
                <h1>Results</h1>
                { this.showResults() }
            </div>
        )
    }
}

export default Results;