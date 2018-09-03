import React from 'react';
import axios from 'axios';
import './css/Detail.css';

class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: '',
            image: '',
            glass: '',
            ingredients: [],
            instructions: ''
        }
    }

    componentDidMount() {
        this.getDetails();
    }

    setIngredients = (drinkObj) => {
        const maxIng = 15; // arbitrary number that aligns with number of possible ingredients in api return
        let ingredients = [];
        for(let i = 1; i <= maxIng; i++) {
            const ing = drinkObj['strIngredient' + i];
            const mea = drinkObj['strMeasure' + i];
            let saveString = '';
            if(ing) {
                if(mea) {
                    saveString += mea + ' of ';
                }
                saveString += ing;
                ingredients.push(saveString);
            }
        }
        return ingredients;
    }

    getDetails = () => {
        const { id } = this.props.match.params;
        axios
            .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id)
            .then( res => {
                const drink = res.data.drinks[0];
                this.setState( (prevState) => {
                    return {
                        title: drink.strDrink,
                        category: drink.strCategory,
                        image: drink.strDrinkThumb,
                        glass: drink.strGlass,
                        ingredients: this.setIngredients(drink),
                        instructions: drink.strInstructions
                    }
                });
                console.log(this.state);
            });
                        
            
    }

    showDetails = () => {
        return (
            <div>
            <h1>{this.state.title}</h1>
            <h2>{this.state.category}</h2>
            <img src={this.state.image} />
            <p>{this.state.glass}</p>
            <ul>
                {this.state.ingredients.map( ing => <li key={ing}>{ing}</li>)}
            </ul>
            <p>{this.state.instructions}</p>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1>details</h1>
                {this.showDetails()}
            </div>
        )
    }

}
export default Detail;