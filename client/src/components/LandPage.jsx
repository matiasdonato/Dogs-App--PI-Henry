import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllDogs, getApiDogs, getDbDogs, getTemperaments } from "../redux/actions/actions.js"

import "./css/LandPage.css"

export default function LandPage(){

    let dispatch = useDispatch()
    
    async function fetchData(){
        await dispatch(getApiDogs())
        await dispatch(getDbDogs())
        dispatch(getTemperaments())
        dispatch(getAllDogs())
    }

    useEffect(() => {
        fetchData()
    }, [])

    let number = Math.random() * (0 - 6) + 6
    number = Math.round(number)
    console.log(number)

    

    let gif 
    let color
    switch (number) {
        case 0:
            gif = "https://cdn.dribbble.com/users/2726/screenshots/2444314/media/8c5ce347aeb9be05e4edebadabb529b3.gif"
            color="#53bbb4"
            break;
        
        case 1:
            gif= "https://i.pinimg.com/originals/db/e6/b9/dbe6b90d0fd0d209001cb64eefd038d7.gif"
            color="#f4ded3"
            break;

        case 2:
            gif = "https://i.pinimg.com/originals/a3/46/b5/a346b5a33532d995e0748f16756f08f5.gif"
            color="#efe8c7"
            break;

        case 3:
            gif = "https://cdn.dribbble.com/users/640601/screenshots/2980072/harper-dribble.gif"
            color="#ffe55f"
            break;

        case 4:
            gif = "https://i.pinimg.com/originals/8b/58/ef/8b58efbd7b8133a92bc08407b05b32fa.gif"
            color="#efefef"
            break;

        case 5:
            gif = "https://i.pinimg.com/originals/16/b2/b3/16b2b38d1acedd03c56fbb029fd9cf00.gif"
            color="#e3e3e3"
            break;

        case 6:
            gif = "https://i.pinimg.com/originals/70/98/9e/70989ecb0258f566b9af13e876cf7dce.gif"
            color="#c7cccb"
            break;
    }

    return(
        <div className={`bigContainer`}>
            <div className={`container`} style={{backgroundColor: color}}>
                <img src={gif} />
            </div>
            <div className="buttonContainer">
                <Link to={"/dogs/home"}>    
                        <div className="button"><h2>Dogs App</h2></div>
                </Link>
            </div>
        </div>
    )
}