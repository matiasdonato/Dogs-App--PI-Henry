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
            <Link to={"/dogs/createdog"} className="createDogLink">
                <div >
                    <h2>Create Dog</h2>
                </div>
            </Link>
        </div>
    )
}
