import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function Dropdown({ items,changeCategory,selectedCategory }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}
          label="Categories"
          onChange={changeCategory}
        >
          {items.map((item,index) => (
             <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
