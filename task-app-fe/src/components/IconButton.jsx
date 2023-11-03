
import IconButton from "@mui/material/IconButton";

export default function IconButtonComponent(props) {
    const { children } = props
  return (
    <IconButton {...props} >{children}</IconButton>
  )
}
