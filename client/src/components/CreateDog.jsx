import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllDogs, getDbDogs, getTemperaments} from "../redux/actions/actions";
import axios from "axios";
import "./css/CreateDog.css"
import defaultDog from "../multimedia/dog-face-logo-free-vector.jpg"

export default function CreateDog(){

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTemperaments())
    },[])

    let [input, setInput] = useState({
        name: "",
        min_weight: undefined,
        max_weight: undefined,
        min_height: undefined,
        max_height: undefined,
        tempsId: [],
        min_life: undefined,
        max_life: undefined,
        image: undefined,
    })


    let [error, setError] = useState({})


    let [preview, setPreview] = useState("")

    let [tempsArr, setTempsArr] = useState([])


    function validate(input){
        let error ={}

        if (!input.name) {
            error.name = "Name missing"
        }

        if (!input.min_weight) {
            error.min_weight = "Min weight missing"
        }else if (input.min_weight >= input.max_weight) {
            error.min_weight = "Max weight must be less than min"
        }
        if (!input.max_weight) {
            error.max_weight = "Max weight missing"
        }
        if (!input.min_height) {
            error.min_height = "Min height missing"
        }else if (input.min_height >= input.max_height) {
            error.min_height = "Max height must be less than min"
        }
        if (!input.max_height) {
            error.max_height = "Max weight missing"
        }

        if (input.min_life && !input.max_life) {
            error.max_life = "You have to enter a max life"
        }else if (!input.min_life && input.max_life) {
            error.min_life = "You have to enter a min life"
        }else if (input.min_life >= input.max_life) {
            error.min_life = "Max life must be less than min"
        }

        if (input.tempsId.length === 0) {
            error.tempsId = "Enter at least one temperament"
        }
        return error;
    }


    let temperaments = useSelector(state => state.temperaments)
    let [available, setAvailable] = useState(false)
    let [maxReached, setMaxReached] = useState(false)

    function eliminateTemp(temp){
        setInput((prev) => ({...prev, tempsId: input.tempsId.filter(t => t !== parseInt(temp[0]))}))
        setTempsArr(tempsArr.filter(t => t[0] !== temp[0]))
        setMaxReached(false)
    }

    console.log(maxReached)

    function handleInput(e){
        let value = e.target.value
        let inputName = e.target.name
        if (inputName !== "name" && inputName !== "image" && inputName!=="tempsId") {
            value = parseInt(value);
        }
        if (inputName === "tempsId") {
            let valueArr = value.split(",")
            if (input.tempsId.length > 9) {
                setMaxReached(true)
            }
            else if (!input.tempsId.includes(parseInt(valueArr[0]))) {
                setInput((prev) => ({...prev, [inputName]:[...input.tempsId, parseInt(valueArr[0])]}));
                setTempsArr((prev) => [...prev, valueArr])
                setAvailable(false)
                setMaxReached(false)
            }else{
                setAvailable(true)
            }
        }else if (inputName === "image") {
            const reader = new FileReader();
            reader.onload = () => {
                    if (reader.readyState === 2) {
                        setPreview(reader.result);
                    }
            }
            reader.readAsDataURL(e.target.files[0])
            let imagefile = document.querySelector('#file');
            setInput((prev) => ({...prev, [inputName]:imagefile.files[0]}));
        }
        else{
            setInput((prev) => ({...prev, [inputName]:value}));
        }
        validateErrors(e);
    }

    let [incompleted, setIncompleted] = useState(null)

    function validateErrors(e){
        let objError = validate({...input, [e.target.name]: e.target.value})
        let formState;
        if (objError.name || objError.min_weight || objError.max_weight || objError.min_height || objError.max_height || objError.tempsId || objError.min_life || objError.max_life) {
            formState = "incompleted"
        }else{
            formState = "completed"
        }
        setError(objError)
        return formState
    }

    function postNewDog(dog) {
        return axios.post('https://dogs-app-matiasdonato.herokuapp.com/dogs', dog, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(r => console.log(r))
            .catch(err => console.log(err))
    }
    

    async function formSubmit(e){
        e.preventDefault();
        let formState = validateErrors(e);
        if(formState === "completed"){
            await postNewDog(input)
            await dispatch(getDbDogs())
            await dispatch(getAllDogs())
            setIncompleted(false)
            setInput({
                name: "",
                min_weight: "",
                max_weight: "",
                min_height: "",
                max_height: "",
                tempsId: [],
                min_life: "",
                max_life: "",
                image: "",
            })
            setTempsArr([])
            setPreview("")
        }else{
            setIncompleted(true)
            let objError = validate(input)
            setError(objError)
        } 
    }


    

    return(
        <div className="createDogContainer">
            <form onSubmit={formSubmit} className="createDogForm">
                <div className="inputsAndImage">
                    <div className="allInputs">
                        <h4>Weight:</h4>
                        <div className="inputContainer">
                            <div className="inputStructure">
                                <label htmlFor="min_weight">Min(Kg):</label>
                                <input className={error.min_weight && "inputError"}  type="number" name="min_weight" value={input.min_weight} onChange= {handleInput}/>
                                {error.min_weight && <span>{error.min_weight}</span>}
                            </div>
                            <div className="inputStructure">
                                <label htmlFor="max_weight">Max(Kg):</label>
                                <input className={error.max_weight && "inputError"}  type="number" name="max_weight"  value={input.max_weight}onChange= {handleInput}/>
                                {error.max_weight && <span>{error.max_weight}</span>}
                            </div>
                        </div>
                        <h4>Height:</h4>
                        <div className="inputContainer">
                            <div className="inputStructure">
                                <label htmlFor="min_height">Min(Cm):</  label>
                                <input className={error.min_height && "inputError"}  type="number" name="min_height"  value={input.min_height}onChange= {handleInput}/>
                                {error.min_height && <span>{error.min_height}</span>}
                            </div>
                            <div className="inputStructure">
                                <label htmlFor="max_height">Max(Cm)</   label>
                                <input className={error.max_height && "inputError"}  type="number" name="max_height"  value={input.max_height}onChange= {handleInput}/>
                                {error.max_height && <span>{error.max_height}</span>}
                            </div>
                        </div>
                        <h4>Years of Life:</h4>
                        <div className="inputContainer">
                            <div className="inputStructure">
                                <label htmlFor="min_life">Min:</label>
                                <input className={error.min_life && "inputError"} type="number" name="min_life" value={input.min_life}onChange={handleInput} />
                                {error.min_life && <span>{error.min_life}</span>}
                            </div>
                            <div className="inputStructure">
                                <label htmlFor="max_life">Max:</label>
                                <input className={error.max_life && "inputError"}  type="number" name="max_life" value={input.max_life}onChange={handleInput}/>
                                {error.max_life && <span>{error.max_life}</span>}
                            </div>
                        </div>
                        <div className="temperamentBox">
                            <h4>Temperaments:</h4>
                            <div className="temperamentInputContainer">
                                <select className={error.tempsId && "inputError"}  name="tempsId" value={input.tempsId.length > 0 ? input.tempsId[input.tempsId.length - 1] : ""}   multiple={false} onChange={handleInput}>
                                    <option value={""}>Select Tempers (10 Max)</ option>
                                    {temperaments.map(t => <option value={[t.id, t.name]}>{t.name}</  option> )}
                                </select>
                                {console.log(input.tempsId.length)}
                                {maxReached === true ? <span>Max capacity reached</span> : 
                                    (available === true ? <span>Temperament already available</span> : 
                                        (error.tempsId && <span>{error.tempsId}</span>))}
                            </div>
                        </div>
                    </div>
                    <div className="nameAndImage">
                        <h3>Name:</h3>
                        <div className= {`inputStructure nameInputStructure` } >
                            <div>
                                <input className={error.name && "inputError"} type="text" name="name" value={input.name}onChange={handleInput}/>
                                {error.name && <span>{error.name}</span> }
                            </div>    
                        </div>
                        <div className="imageContainer">
                            <div className="imgContainer">
                                <img src={preview ? preview : defaultDog} />
                            </div>
                            <hr />
                            {tempsArr.length > 0 && <div className="tempsRemover"> {tempsArr.map(t => <div className="tempContainer">{t[1]} <button onClick={() => eliminateTemp(t)}>x</button></div>)} </div>}
                            <div className="selectImage">
                                <label htmlFor="file">Select a image</label>
                                <input id="file" type="file" name="image" accept="image/*" onChange={handleInput}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="createButtonContainer">
                    <input className="createDogButton" type="submit" value={"Create Dog"} />
                    {incompleted === true && <span className="createDogSpan">Data Missing</span>}
                    {incompleted === false && <span className="createDogSpan">Dog Created!</span>}
                </div>
            </form>
        </div>
    )
}