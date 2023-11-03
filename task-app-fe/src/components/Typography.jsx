import Typography from "@mui/material/Typography";
export default function TypographyComponent(props) {
  const { children } = props;
  return <Typography {...props}>{children}</Typography>;
}
