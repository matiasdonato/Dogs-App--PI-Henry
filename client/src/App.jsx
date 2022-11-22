import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DogDetails from './components/DogDetails.jsx';
import Home from './components/Home.jsx';
import LandPage from './components/LandPage.jsx';
import Nav from './components/Nav.jsx';
import CreateDog from './components/CreateDog.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="App">
      <Route exact path={"/"} render={()=> <LandPage/> } />
      <Route path={"/dogs"} render={()=> <Nav/> } />
      <Route exact path={"/dogs/home"} render={()=> <Home/> } />
      <Route path={"/dogs/createdog"} render={()=> <CreateDog/>} />
      <Route path={"/dogs/home/:dogId"} render={({match})=> <DogDetails id={parseInt(match.params.dogId)}/>}></Route>
      <Route path={"/dogs"} render={()=> <Footer/> } />
    </div>
  );
}


