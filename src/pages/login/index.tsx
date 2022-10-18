import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import firebase from "../../firebase";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const canLogin = useMemo<boolean>(() => {
    return !!email && !!password;
  }, [email, password]);

  const onLogin = useCallback(() => {
    const auth = getAuth(firebase);

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/");
      })
      .catch((error) => {
        setPassword("");
        setErrorMessage("Invalid e-mail or password");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, password, router]);

  return (
    <Box sx={{ pt: 5 }}>
      <Grid container justifyContent="center">
        <Grid item xl={6} lg={7} md={8} sm={10} xs={12}>
          <Card>
            <CardContent>
              <Typography marginBottom={3} variant="h5">
                Login
              </Typography>

              <Stack spacing={2}>
                {!!errorMessage ? (
                  <Alert severity="error">{errorMessage}</Alert>
                ) : null}

                <TextField
                  label="e-mail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Stack>
            </CardContent>

            <CardActions>
              <LoadingButton
                variant="contained"
                fullWidth
                disabled={!canLogin}
                loading={loading}
                loadingPosition="start"
                startIcon={<LoginIcon />}
                onClick={() => {
                  onLogin();
                }}
              >
                Login
              </LoadingButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
