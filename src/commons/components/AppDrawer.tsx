import { Phishing, Place, SetMeal, ShowChart } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";

const AppDrawer = () => {
  const items = useMemo(() => {
    return [
      {
        icon: <SetMeal />,
        label: "Fishing Recorder",
      },
      {
        icon: <ShowChart />,
        label: "Tide Graph",
      },
      {
        icon: <Phishing />,
        label: "Tackle",
      },
      {
        icon: <Place />,
        label: "Location",
      },
    ];
  }, []);

  return (
    <Drawer anchor="left" open={true}>
      <Box sx={{ width: 250 }}>
        <List>
          {items.map((item, idx) => {
            return (
              <ListItem key={idx} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default AppDrawer;
