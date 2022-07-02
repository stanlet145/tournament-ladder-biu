import React from "react";
import SingleElimination from "./SingleElimination";
import RoundRobin from "./RoundRobin";
import DoubleElimination from "./DoubleElimination";

const ActiveTournament = (props) => {
  const type = props.tournament?.type;
  if (type === 'single') return <SingleElimination {...props} />
  if (type === 'round_robin') return <RoundRobin {...props} />
  if (type === 'double') return <DoubleElimination {...props} />
  return <></>
};

export default ActiveTournament; 

