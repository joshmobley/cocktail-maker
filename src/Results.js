import React from 'react';
import './css/Results.css';
import axios from 'axios';

class Results extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: []
        };
    }

    componentDidMount() {
        const { searchTerm } = this.props.match.params;
        axios
            .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchTerm)
            .then( res => console.log(res));
    }

    render () {
        return (
            <h1>results</h1>
        )
    }
}

export default Results;