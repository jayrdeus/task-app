
import Button from '@mui/material/Button';
export default function ButtonComponent( props) {
    const { children } = props
  return (
    <Button {...props}>{children}</Button>
  )
}
