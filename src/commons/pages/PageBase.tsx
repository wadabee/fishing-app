import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { AppProps } from "next/app";

import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import firebase from "../../firebase";

const PageBase = ({ Component, pageProps }: AppProps) => {
  const [hasAuthenticated, setHasAuthenticated] = useState(true);

  const router = useRouter();

  const auth = getAuth(firebase);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setHasAuthenticated(true);
      } else {
        setHasAuthenticated(false);
        router.push("/login");
      }
    });
  }, [auth, router]);

  const onLogout = () => {
    signOut(auth).then(() => {
      router.push("/login");
    });
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          {hasAuthenticated ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fishing App
          </Typography>
          {hasAuthenticated ? (
            <Button
              size="large"
              color="inherit"
              endIcon={<Logout />}
              onClick={() => {
                onLogout();
              }}
            >
              LOGOUT
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 7 }}>
        <Component {...pageProps} />
      </Box>
    </>
  );
};

export default PageBase;
