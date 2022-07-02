import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TOURNAMENT_TYPES } from "../AddTournament";
import ActiveTournament from "../ActiveTournament";

const Tournaments = ({ state, removeTournament, updateTournament }) => {
  const [activeTournament, setActiveTournament] = useState(null);

  return (  
    <>
      <h2>Tournaments</h2>
      <ul>
        {
          state.tournaments.map(tournament => (
            <li key={"tournament_" + tournament.id}>
              <span
                className={tournament.id === activeTournament?.id ? "active" : ""}
                onClick={() => setActiveTournament(tournament)}
              >
                {`${tournament.name} (${TOURNAMENT_TYPES[tournament.type]})`}
              </span>
              <Button size="small" variant="outlined" color="error" onClick={() => removeTournament(tournament.id)}>Remove</Button>
            </li>
          ))
        }
      </ul>
      {
        activeTournament && <ActiveTournament tournament={activeTournament} updateTournament={updateTournament} />
      }
    </>
  )
};

export default Tournaments; 