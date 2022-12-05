import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { searchApiDogs, searchDbDogs, cleanDogs, getAllDogs, getApiDogs, getDbDogs, getTemperaments} from "../redux/actions/actions";
import DogCard from "./DogCard.jsx";
import "./css/Home.css"

export default function Home(){
    let dispatch = useDispatch();


    

    let [loading, setLoading] = useState(true)
    
    let permanentDogs = useSelector(state => state.permanentDogs)
    async function fetchData(){
        if (permanentDogs.length === 0) {
            await dispatch(getApiDogs())
            await dispatch(getDbDogs())
            dispatch(getTemperaments())
            dispatch(getAllDogs())
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
        dispatch(cleanDogs())
    }, [])

    
    let dogs = useSelector(state => state.dogs) 
    dogs = dogs.filter(d => d.name)

    let temperaments = useSelector(state => state.temperaments)
    console.log(temperaments)


// Busqueda
    let [input, setInput] = useState("")

    async function fetchSearch(input){
        await dispatch(searchApiDogs(input));
        await dispatch(searchDbDogs(input));
    }

    let [cleanButton, setCleanButton] = useState(false)

    if (dogs.length === permanentDogs.length) {
        cleanButton = false
    }

    async function searchDogs(e){
        e.preventDefault();
        setInput("")
        await fetchSearch(input)
        setLast(8)
        setFirst(0)
        pageLoader(1)
        setReload(true)
        setCleanButton(true)
    }

    async function cleanSearch(){
        dispatch(cleanDogs())
        setReload(true)
        setCleanButton(false);
    }
// Fin busqueda




//Filtracion y Ordenamiento
    let [filter, setFilter] = useState("Todos")
    if (filter === "API") {
        dogs = dogs.filter(d => d.id < 1000)
    }
    if(filter === "DB"){
        dogs = dogs.filter(d => d.id > 999)
    }

    
    let [temper, setTemper] = useState("Todos")

    function temperFilter(dog){
        let tempArray;
        if (dog.id > 999) {
            tempArray = dog.temperament.map(t => t.name)
            return tempArray.includes(temper)
        }else{
            if (dog.temperament) {
                tempArray = String(dog.temperament).split(", ")
                return tempArray.includes(temper)
            }
            return false;  
        }
    }

    if (temper !== "Todos") {
        dogs = dogs.filter(d => temperFilter(d))
    }

    let [order, setOrder] = useState(["alfabetic", "ascendent"])

    function compareWeight (a,b) {
        let aWeight;
        let bWeight;
        if (a.weight.metric) {
            aWeight = a.weight.metric
        }else{
            aWeight = a.weight
        }
        let aArray = aWeight.split(" - ")
        aWeight = parseInt(aArray[0])
        if (isNaN(aWeight)) {
            aWeight = parseInt(aArray[1])
        }
    
        if (b.weight.metric) {
            bWeight = b.weight.metric
        }else{
            bWeight = b.weight
        }
        let bArray = bWeight.split(" - ")
        bWeight = parseInt(bArray[0])
        if (isNaN(bWeight)) {
            bWeight = parseInt(bArray[1])
        }
        
        let comparison = 0
        if (aWeight > bWeight) {
            comparison = 1;
        }
        if (bWeight > aWeight) {
            comparison = -1
        };
        return (order[1] === "descendent" ? (comparison * -1) : comparison)
    }

    function compareAlfabetic(a, b){
        if (order[1] === "ascendent") {
            return a.name.localeCompare(b.name, 'fr', {ignorePunctuation: true});
        }else{
            return b.name.localeCompare(a.name, 'fr', {ignorePunctuation: true})
        }

    }

    if (order[0] === "alfabetic") {
        dogs.sort(compareAlfabetic)
    }
    if (order[0] === "weight") {
        dogs.sort(compareWeight)
    }

    function filterClear(){
        setOrder(["alfabetic", "ascendent"])
        setTemper("Todos")
        setFilter("Todos")
    }

    let [seeFilters, setSeeFilters] = useState(false)
//Fin de la Filtracion y Ordenamiento



//Paginacion

    let [first, setFirst] = useState(0);
    let [last, setLast] = useState(8);
    let currentDogs = dogs.slice(first, last); 
    let tp = Math.ceil(dogs.length/8);
    let tpArray = [];
    for (let i = 0; i < tp;) {
        tpArray.unshift(tp)
        tp = tp -1
    }
    tp = tpArray.length
    let [pages, setPages] = useState([1,2,3,4,5])
    let [actualPage, setActualPage] = useState(1)

    function pageLoader(p){
        if (p.target) {
            p = parseInt(p.target.value)
        } 
        if (tp > 5) {
            if (p > (tp - 3)) {
                setPages(tpArray.slice(tp-5, tp))
            }
            else if (p>1) {
                setPages(tpArray.slice(p-2, p+3))
            }
            else{
                setPages([1,2,3,4,5])
            }   
        }
        setActualPage(p)
        setLast(p*8)
        setFirst((p-1)*8)
    }

    function next(){
        if ((last+8)<=(dogs.length+7)) {
            let p = (last/8) + 1
            pageLoader(p)
        }
    }

    function previous(){
        if ((first-8)>=0) {
            let p = (last/8) - 1
            pageLoader(p)
        }
    }

    let [reload, setReload] = useState(false)

    function onReload(){
        if (tp < 5) {
            if (reload === true) {
                setPages(tpArray.slice(0, tp))
                setReload(false)
            }
        }else{
            if (reload === true) {
                setPages([1,2,3,4,5])
                setReload(false)
            }
        }
        if (pages.length<1 && dogs.length > 0) {
            setPages([1,2,3,4,5])
        }
    }
    onReload();
    
    
// Fin de la paginacion

    if (loading === true) {
        return(
            <div className="loadingContainer">
                loading
            </div>
        )
    }

    return(
        <div className="homeContainer"> 
            <div className={seeFilters === true ? "bigFilterContainer showFilter": "bigFilterContainer"}>
                <div className="filterContainer">
                    <div>
                        <label htmlFor="petOrder">Sort by:</label>
                        <select id="petOrder" value={order[0]} onChange={(e) => setOrder([e.target.value, "ascendent"])}>
                            <option value="alfabetic">Alphabetical Order</option>
                            <option value="weight">Weight</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="AsDes">Way:</label>
                        <select id="AsDes" value={order[1]} onChange={(e) => setOrder([order[0], e.target.value])}>
                            <option value="ascendent">Upward</option>
                            <option value="descendent">Downward</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="filterBy">Filter by:</label>
                        <select id="filterBy" value={filter} onChange={(e) => {setFilter(e.target.value); setOrder([order[0], "ascendent"]); pageLoader(1); setReload(true)}}>
                            <option value="Todos">All</option>
                            <option value="DB">Data Base</option>
                            <option value="API">API</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="filterByTemp">Filter by temperament:</label>
                        <select id="filterByTemp" value={temper} onChange={(e) => {setTemper(e.target.value); setOrder([order[0], "ascendent"]); pageLoader(1); setReload(true)}} >
                            <option value={"Todos"}>All</option>
                            {temperaments.map(t => <option value={t.name}>{t.name}</option> )}
                        </select>
                    </div>
                </div>
                <button onClick={filterClear} className="cleanFiltersButton">Clear Filters</button>
            </div> 
            
            <button onClick={() => {
                if (seeFilters === true) {
                    setSeeFilters(false)
                }else{
                    setSeeFilters(true)
                }
            }} className="seeFiltersButton" >{ seeFilters === false ? `Open Filters` : `Close Filters` }</button>
            <div className="formContainer">
                {cleanButton === true && <button onClick={cleanSearch}className="cleanSearchButton" >Clear Search</button> }
                <form onSubmit={searchDogs}>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="searchInput" />
                    <input type="submit" value={"Search"} className="searchButton" />
                </form>
            </div>
            {/* PAGINACION */}
            <button onClick={previous} className="pageChangerPrevious" > {"<<"} </button>
            {pages.map(p => <button value={p} onClick={pageLoader} className={`pageSelector ${ p === actualPage && "actualPage"}`}>{p}</button>)}
            <button onClick={next} className="pageChangerNext" >{">>"}</button>
            {/* FINAL DE LA PAGINACION */}
            <div className="dogsBox">
                { 
                    dogs.length > 0 ? 
                        (dogs.length > 4 ? 
                            <div className="bigDogsContainer">
                                <div className="dogsContainer">{(currentDogs.slice(0,4).map(d =>    <DogCard className="dogCardInBox" dog={d}/>))}</div> 
                                <div className="dogsContainer">{(currentDogs.slice(4).map(d =>  <DogCard className="dogCardInBox" dog={d}/>))}</div>
                            </div> : 
                            <div className="dogsContainer">{currentDogs.map(d => <DogCard dog={d}/>)}</div>) : 
                    <span>No match found, check that you have correctly entered the uppercase letters</span>
                }
            </div>
            
            
        </div>
    )
}