import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cleanDogs } from "../redux/actions/actions";
import "./css/Nav.css"
import MyImage from '../multimedia/logo.png';

export default function Nav(){
    let dispatch = useDispatch()

    return(
        <div className="navContainer">
            <div className="homeLink">
                <Link to={"/dogs/home"} onClick={() => dispatch(cleanDogs())}>
                    <img src={MyImage} alt="logo" />
                </Link>
                <Link to={"/dogs/home"} onClick={() => dispatch(cleanDogs())}>
                    <h2 className="navTitle">Dog App</h2>
                </Link>
            </div>
            <Link to={"/dogs/createdog"}>
                <div className="createDogLink">
                    <h2>Create Dog</h2>
                </div>
            </Link>
        </div>
    )
}

// { 
//     dogs.length > 0 ? 
//         (dogs.length > 4 ? 
//             <div className="bigDogsContainer">
//                 <div className="dogsContainer">{(currentDogs.slice(0,4).map(d => <DogCard className="dogCardInBox" dog={d}/>))}</div> 
//                 <div className="dogsContainer">{(currentDogs.slice(4).map(d => <DogCard className="dogCardInBox" dog={d}/>))}</div>
//             </div> : 
//         <div className="dogsContainer">{currentDogs.map(d => <DogCard dog={d}/>)}</div>) : 
//     <span>No se encontraron resultados</span>
// }