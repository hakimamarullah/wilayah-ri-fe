import AddIcon from "@mui/icons-material/Add";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import PropTypes from "prop-types";

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, items, title } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog scroll="paper" onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {items.map((item, idx) => (
          <ListItem disableGutters key={`${item}_${idx}`}>
            <ListItemButton onClick={() => handleListItemClick(item.id)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <HomeOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.value}
                sx={{ textTransform: "capitalize" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add Address" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};
