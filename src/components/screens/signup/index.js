import React, { useState } from 'react'
import Header from "../../header/Header"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../../actions/auth.action"
import { Link, Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const user = {
    firstName,
    lastName,
    email,
    password,
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(user))
  }
  
  if(auth.signedIn) {
    return <Redirect to="/"/>
  }

 if(auth.loading) {
    return <div style={{ width: "100%", height: "100%", alignItems: "center" }}><h3>Loading</h3></div>
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
          Sign up
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} Validate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" >
              <p>Already have an account? Sign in</p>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
    </Header>
  );
}

export default SignUp