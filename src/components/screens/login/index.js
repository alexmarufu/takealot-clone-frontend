import React, { useState } from 'react'
import Header from "../../header/Header"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../../actions/auth.action"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  //const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    email,
    password,
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user))
  }

  if(auth.loading) {
    return <div style={{ width: "100%", height: "100%", alignItems: "center" }}><h3>Loading</h3></div>
  }

  
  if(auth.signedIn) {
    return <Redirect to="/"/>
  }

 
  return (
    <Header>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <br/>
       <h3 style={{ color: "red", textAlign: "center" }}>{auth.error}</h3>
        <br/>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
            
              <p>Don't have an account? <Link to="/register" >Sign up</Link></p>
             
            </Grid>
          </Grid>
        </form>
      </div>
    
    </Container>
    </Header>
  );
}

export default Login