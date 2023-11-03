import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonComponent from "./Button";
export default function DialogComponent(props) {
  return (
    <Dialog
        open={props.open}
        onClose={() => props.handleDialog(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do you want to delete ${props.task?.title}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonComponent onClick={() => props.handleDialog(null)} color="error">Cancel</ButtonComponent>
          <ButtonComponent onClick={props.handleRemoveTask} autoFocus color="primary">
            Confirm
          </ButtonComponent>
        </DialogActions>
      </Dialog>
  )
}
