"use client";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { doLogout } from "../actions";

export default function MenuDrawer({ state, toggleDrawer, username }) {
  const list = () => (
    <Box
      sx={{
        width: { xs: "50vw", md: "25vw", lg: "20vw", xl: "20vw" },
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {username ? (
          <ListItem key={"profile"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar alt="Random Pic" src="./female_avatar.png" />
              </ListItemIcon>
              <ListItemText primary={`Hi, ${username}`} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem key={"signin"} disablePadding>
            <ListItemButton href="/auth/signin">
              <ListItemIcon>
                <LockOpenOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Sign In"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      {username && (
        <>
          <List>
            {[
               {
                name: "My Plans",
                icon: <LocalMallOutlinedIcon />,
                target: "/myplans",
              },
              {
                name: "Plans",
                icon: <LocalMallOutlinedIcon />,
                target: "/plans",
              },
              {
                name: "Order History",
                icon: <ReceiptLongOutlinedIcon />,
                target: "/orders",
              },
              {
                name: "Account",
                icon: <ManageAccountsOutlinedIcon />,
                target: "#",
              },
              {
                name: "Support",
                icon: <SupportAgentOutlinedIcon />,
                target: "https://twitter.com/messages/compose?recipient_id=1025891337638268928",
              },
            ].map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton href={item.target}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem key={"signout"} disablePadding>
              <ListItemButton onClick={async () => await doLogout('/')}>
                <ListItemIcon>
                  <ExitToAppOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Sign Out"} />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );

  return (
    <>
      <Drawer
        sx={{ zIndex: 99999 }}
        anchor={"left"}
        open={state}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
}
