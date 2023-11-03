import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DownloadIcon from "@mui/icons-material/Download";
import React from "react";

export default function ListComponent(props) {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="attachment-list"
      subheader={
        <ListSubheader component="div" id="attachment-list">
          Attachment Items
        </ListSubheader>
      }
    >
     {props.images && props.images.map((image,index) => (
      <ListItemButton key={index} onClick={() => props.handleDownloadImage(index)}>
        <ListItemIcon>
          <DownloadIcon />
        </ListItemIcon>
        <ListItemText primary="Download attachment" />
      </ListItemButton>

     ))}
    </List>
  );
}
