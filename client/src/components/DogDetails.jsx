import React from "react";
import { useSelector } from "react-redux";
import { getDogImage} from "../redux/actions/actions";
import "./css/DogDetails.css"

export default function DogDetails({id}){

    let dog = useSelector(state => state.dogDetails)
    
    
    let apiDogs = useSelector(state => state.apiDogs)
    let image = getDogImage(dog, apiDogs);

    let weight
    let height
    let yearsOfLife
    let temperament

    if (dog.id > 999) {
        weight = dog.weight;
        height = dog.height;
        if (dog.yearsOfLife) {
        yearsOfLife = dog.yearsOfLife 
        }
        let tempArray = dog.temperament.map(t => t.name)
        temperament = tempArray.join(", ")
    }else{
        if (dog.weight) {
            weight = dog.weight.metric
        }
        if (dog.height) {
            height = dog.height.metric
        }
        yearsOfLife = dog.life_span.split(" ")
        yearsOfLife.pop()
        yearsOfLife = yearsOfLife.join(" ")
        temperament = dog.temperament
    }


    
    
    return(

        <div className="dogDetailsContainer">
            <div className="dogDetails">
                <img src={image} alt={dog.name} />
                <hr />
                <div>
                    <h2>{dog.name}</h2>
                    <h3>Temperament: {temperament}</h3>
                    <h3>Weight: {weight} Kg</h3>
                    <h3>Height: {height} Centimetros</h3>
                    { dog.min_life && <h3>Years of life: {yearsOfLife}</h3> }
                </div>
            </div>
        </div>
    )
}