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
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import drawerState from "../../recoil/drawer";

const AppDrawer = () => {
  const [open, setOpen] = useRecoilState(drawerState.open);

  const items = useMemo(() => {
    return [
      {
        icon: <SetMeal />,
        label: "Fishing Recorder",
        url: "/fishing/start",
      },
      {
        icon: <ShowChart />,
        label: "Tide Graph",
        url: "/tide-graph",
      },
      {
        icon: <Phishing />,
        label: "Tackle",
        url: "/tackle/register",
      },
      {
        icon: <Place />,
        label: "Location",
        url: "/",
      },
    ];
  }, []);

  const router = useRouter();
  const onClick = useCallback(
    (url: string) => {
      router.push(url).then((result) => {
        if (result) {
          setOpen(false);
        }
      });
    },
    [router, setOpen]
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {items.map((item, idx) => {
            return (
              <ListItem key={idx} disablePadding>
                <ListItemButton
                  onClick={() => {
                    onClick(item.url);
                  }}
                >
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
