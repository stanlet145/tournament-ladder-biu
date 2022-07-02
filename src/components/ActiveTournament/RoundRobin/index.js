import React, { useState, useEffect } from "react";
import Ladder from "../Ladder";

const prepareRounds = (teams) => {
  const rounds = [];
  const numberOfRounds = teams.length - 1;
  const teamsCopy = [...teams];

  for(let i = 0; i < numberOfRounds; i++) {
    const round = [];
    for (let j = 0; j < teamsCopy.length / 2; j++) { 
      const matchTeams = [teamsCopy[j], teamsCopy[teamsCopy.length - 1 - j]];
      round.push({ teams: matchTeams, score: "" });
    }

    teamsCopy.splice(1, 0, teamsCopy[teamsCopy.length - 1]);
    teamsCopy.pop();
    rounds.push(round);
  }
  return rounds;
};
 
const RoundRobin = ({ tournament, updateTournament }) => {
  const [rounds, setRounds] = useState(tournament.rounds || []);

  useEffect(() => {
    if (!tournament.rounds) {
      const rounds = prepareRounds(tournament.teams);
      setRounds(rounds);
    }
  }, [])
  
  useEffect(() => {
    updateTournament({
      ...tournament,
      rounds: rounds
    })
  }, [rounds])
  
  const handleScore = (roundIndex, matchIndex, score) => {
    const updatedRounds = [...rounds];
    updatedRounds[roundIndex][matchIndex].score = score;
    setRounds(updatedRounds);
  }

  return <Ladder handleScore={handleScore} rounds={rounds} />
};

export default RoundRobin; 

