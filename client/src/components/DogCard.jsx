import React from "react";
import { useSelector } from "react-redux";
import { getDogImage} from "../redux/actions/actions";
import { Link } from "react-router-dom";
import "./css/DogCard.css"

export default function DogCard({dog}){
    let apiDogs = useSelector(state => state.apiDogs)
    let image = getDogImage(dog, apiDogs);

    let weight
    let temperament

    if (dog.id > 999) {
        weight = dog.weight;
        let tempArray = dog.temperament.map(t => t.name)
        temperament = tempArray.join(", ")
    }else{
        if (dog.weight) {
            weight = dog.weight.metric
        }
        temperament = dog.temperament
    }
    
    return(
        <Link to={`/dogs/home/${dog.id}`}>
            <div className="dogCardContainer">
                <img src={image} alt={dog.name} />
                <div>
                    <h4>{dog.name}</h4>
                    <h5>Temperament: {temperament}</h5>
                    <h5>{weight} Kg</h5>
                </div>
            </div>
        </Link>
    )
}