import React from "react";
import TextField from '@mui/material/TextField';
 
const Ladder = ({ rounds, handleScore }) => {
  return (  
    <div style={{ width: "80%", margin: "0 auto", display: 'flex', justifyContent: "space-between" }}>
      {
        rounds.map((round, roundIndex) => (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontWeight: "bold" }}>ROUND {roundIndex + 1}</div>
            {
              round.map((match, matchIndex) => (
                <div style={{ margin: "20px 10px" }}>
                  <div>{match.teams[0].name} VS {match.teams[1].name}</div>
                  <div>SCORE:</div>
                    <TextField
                      size="small"
                      aria-labelledby="name"
                      name="name"
                      value={match.score}
                      onChange={(e) => handleScore(roundIndex, matchIndex, e.target.value)}
                    />
                </div>
              ))
            }
          </div>
        ))
    }
    </div>
  )
};

export default Ladder; 

