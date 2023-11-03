import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatepickerComponent(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker {...props} />
    </LocalizationProvider>
  );
}
