import React, { useState, useEffect } from "react";
import Ladder from "../Ladder";
import { shuffleArray } from "../../../utils";

const emptyTeam = { name: "" };

const prepareRounds = (teams) => {
  const rounds = [prepareFirstRound(teams)];
  while (rounds[rounds.length - 1].length > 1) {
    rounds.push(prepareNextRound(rounds[rounds.length - 1]));
  }
  return rounds;
};
const prepareFirstRound = (teams) => {
  const shuffledTeams = shuffleArray(teams);
  const round = [];
  for (let i = 0; i < shuffledTeams.length; i) {
    const teams = shuffledTeams.splice(0,2);
    if (teams.length === 1) teams.push(emptyTeam);
    round.push({ teams, score: "" });
  }
  return round;
};

const prepareNextRound = (previousRound) => {
  const previousRoundCopy = [...previousRound];
  const round = [];
  for (let i = 0; i < previousRoundCopy.length; i) {
    previousRoundCopy.splice(0,2);
    round.push({ teams: [emptyTeam, emptyTeam], score: "" });
  }
  return round;
}

const SingleElimination = ({ tournament, updateTournament }) => {
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

export default SingleElimination; 

