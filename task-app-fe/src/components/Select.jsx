
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function SelectComponent({id,name,val,statuses, handleChange,inputProps}) {
  return (
    <FormControl fullWidth>
        <InputLabel id="select-status">Statuses</InputLabel>
        <Select
          labelId="select-status"
          id={id}
          name={name}
          value={val}
          label="Statuses"
          onChange={handleChange}
          inputProps={inputProps}
        >
          {statuses?.map(status => (
              <MenuItem value={status.id} key={status.id}>{status.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
  )
}
