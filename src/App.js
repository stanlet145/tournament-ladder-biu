import React, { useReducer } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import './App.css';
import AddTournament from "./components/AddTournament";
import Tournaments from "./components/Tournaments";

const initialState = { tournaments: [
  { id: 1656739015705, name: "First one", type: 'single', teams: [{name: '1 team'}, {name: '2 team'}, {name: '3 team'}, {name: '4 team'}, {name: '5 team'}, {name: '6 team'}, {name: '7 team'}, {name: '8 team'}, {name: '9 team'}]},
  { id: 1656739176332, name: "Third one", type: 'round_robin', teams: [{name: '1 team'}, {name: '2 team'}, {name: '3 team'}, {name: '4 team'}, {name: '5 team'}, {name: '6 team'}, {name: '7 team'}, {name: '8 team'}, {name: '9 team'}, {name: '10 team'}]},
  { id: 1656739186527, name: "Fourth one", type: 'double', teams: [{name: '1 team'}, {name: '2 team'}, {name: '3 team'}, {name: '4 team'}, {name: '5 team'}, {name: '6 team'}, {name: '7 team'}, {name: '8 team'}, {name: '9 team'}, {name: '10 team'}]},
], map: {
  1656739015705: 0,
  1656739176332: 1,
  1656739186527: 2
} };

// change to:
// const initialState = { tournaments: [], map: {} };

function reducer(state, action) {
  let index;
  let updatedTournaments;
  let updatedMap;
  switch (action.type) {
    case 'add':
      index = state.tournaments.length;
      return { tournaments: [...state.tournaments, action.payload], map: { ...state.map, [action.payload.id]: index }};
    case 'update':
      updatedTournaments = state.tournaments;
      index = state.map[action.payload.id];
      updatedTournaments[index] = action.payload;
      return { ...state, tournaments: updatedTournaments };
    case 'remove':
      index = state.map[action.id];
      updatedTournaments = [...state.tournaments];      
      updatedTournaments.splice(index, 1);      
      updatedMap = {};
      updatedTournaments.forEach((tournament, index) => {
        updatedMap[tournament.id] = index;
      });
      return { tournaments: updatedTournaments, map: updatedMap }
    default:
      throw new Error();
  }
} 

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addNewTournament = (payload) => {
    dispatch({ type: 'add', payload });
  }

  const removeTournament = (id) => {
    dispatch({ type: 'remove', id })
  }

  const updateTournament = (payload) => {
    dispatch({ type: 'update', payload });
  }

  return (
    <div className="app">
      <header className="header">
        <h1>
          Tournament manager
        </h1>
      </header>
      <nav className="nav">
        <Link to="/"><Button variant="text">Tournaments</Button></Link>
        <Link to="/add"><Button variant="text">Add new tournament</Button></Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Tournaments state={state} removeTournament={removeTournament} updateTournament={updateTournament} />} />
          <Route path="add" element={<AddTournament addNewTournament={addNewTournament} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
