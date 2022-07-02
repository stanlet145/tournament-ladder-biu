import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from "@mui/material/Button";

export const TOURNAMENT_TYPES = {
  single: "Single elimination",
  round_robin: "Round Robin",
  double: "Double elimination"
}

const initialState = {
  name: "",
  type: "single",
  teams: ""
};

const AddTournament = ({ addNewTournament }) => {
  const [formState, setFormState] = useState(initialState);

  const handleAdd = () => {
    if (!formState.name.length || !formState.teams.length) return;
    const teams = formState.teams.split(/\r?\n/).filter(team => team.length).map(team => ({ name: team }));
    const payload = {
      id: Date.now(),
      name: formState.name,
      type: formState.type,
      teams: teams
    }
    addNewTournament(payload);
    setFormState(initialState);
  };

  return (
    <>
      <h2>Add Tournament</h2>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
          <FormLabel id="name">Name</FormLabel>
          <TextField
            aria-labelledby="name"
            name="name"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel id="type-radio">Type</FormLabel>
          <RadioGroup
            aria-labelledby="type-radio"
            name="type-radio"
            value={formState.type}
            onChange={(e) => setFormState({ ...formState, type: e.target.value })}
          >
            {Object.entries(TOURNAMENT_TYPES).map(([type, label]) => <FormControlLabel key={'type_' + type} value={type} control={<Radio />} label={label} />)}
          </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
          <FormLabel id="teams">Teams (one team per row)</FormLabel>
          <TextField
            aria-labelledby="teams"
            name="teams"
            multiline
            rows={10}
            value={formState.teams}
            onChange={(e) => setFormState({ ...formState, teams: e.target.value })}
          />
        </FormControl>
      </Box>
      <Button variant="contained" color="success" disabled={!formState.name.length || !formState.teams.length} onClick={handleAdd}>Add</Button>
    </>
  )
};

export default AddTournament; 