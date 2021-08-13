import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import Header from "../../header/Header";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { addOrder } from "../../../actions/order.action";
import { address } from "../../../actions/auth.action";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./styles.css"


function Checkout(props) {


    const dispatch = useDispatch()

      const useStyles = makeStyles((theme) => ({
        appBar: {
          position: 'relative',
        },
        layout: {
          width: 'auto',
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
          [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        },
        paper: {
          marginTop: theme.spacing(3),
          marginBottom: theme.spacing(3),
          padding: theme.spacing(2),
          [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
          },
        },
        stepper: {
          padding: theme.spacing(3, 0, 5),
        },
        buttons: {
          display: 'flex',
          justifyContent: 'flex-end',
        },
        button: {
          marginTop: theme.spacing(3),
          marginLeft: theme.spacing(1),
          
        },
      }));

      

      const FormSubmit = () => {
        const ref = useRef(null);
        //const autoSubmit = () => ref.current.submit()
   
         //autoSubmit()
        useEffect(() => {
          ref.current.submit();
          }, []);
       
        return (
       <>           
            <Typography variant="h6" gutterBottom>
                   you are being redirected to payfast
          </Typography>
         <form ref={ref} action="https://sandbox.payfast.co.za​/eng/process" method="post">
            <input type="hidden" name="merchant_id" value="10000100"/>
            <input type="hidden" name="merchant_key" value="46f0cd694581a"/>
            <input type="hidden" name="amount" value={TotalPrice.toFixed(0)}/>
            <input type="hidden" name="item_name" value={productsNames}/>
            <input type="hidden" name="return_url" value=""/>
            <input type="hidden" name="cancel_url" value=""/>
         </form> 
         </>
         )
      }

      
      const steps = ['Shipping address',  'Payment options'];
      
    function getStepContent(step) {
        switch (step) {
          case 0:
            return <AddressForm />;
          case 1:
            return <PaymentForm/>;
          case 2:
            return <FormSubmit />;
          case 3:
            return <Data />;
          case 4:
              return <Redirect to="/orders" />;
          default:
            throw new Error('Unknown step');
        }
      }
      


      const AddressForm = () => {

      return (
        <>
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                label="First name"
                fullWidth
                autoFocus={false}
                //autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                label="Last name"
                fullWidth
                autoFocus={false}
                //autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                label="Address line 1"
                fullWidth
                autoFocus={false}
                //autoComplete="shipping address-line1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                label="Address line 2"
                fullWidth
                autoFocus={false}
                //autoComplete="shipping address-line2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="City"
                fullWidth
                autoFocus={false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="state" value={province} onChange={(e) => setProvince(e.target.value)} name="state" label="State/Province/Region" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                autoFocus={false}
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                label="Zip / Postal code"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                label="Country"
                fullWidth
                autoFocus={false}
                ///autoComplete="shipping country"
              />
            </Grid>
          
          </Grid>
        </>
      );
    }
    

      const Data = () => (
          <>
      <Typography variant="h5" gutterBottom>
      Thank you for your order.
       </Typography>
       <Typography variant="subtitle1">
        We have emailed your order confirmation, and will
        send you an update when your order has shipped.
       </Typography>
       
       
       </>)
 

        const classes = useStyles();
        const [activeStep, setActiveStep] = useState(0);
        const [option, setOption] = useState("");
        
        
        const auth = useSelector(state => state.auth);
      
        

       // if(storedAdress) dataAddress = storedAdress
        //const auth = useSelector(state => state.auth);
        const { FirstName, LastName, Address1, Address2, City,  Zip, Province,  Country } = auth.address
         
        const [firstName, setFirstName] =useState(/*FirstName !== "" ? FirstName : */"");
        const [lastName, setLastName] = useState(/*LastName !== "" ? LastName :*/ "");
        const [address1, setAddress1] = useState(/*Address1 !== "" ? Address1 :*/ "");
        const [address2 ,setAddress2] = useState(/*Address2 !== "" ? Address2 : */"");
        const [city, setCity] =useState(/*City !== "" ? City :*/ "");
        const [zip, setZip] =useState(/*Zip !== "" ? Zip : */"");
        const [province, setProvince] =useState(/*Province !== "" ? Province :*/ "");
        const [country, setCountry] =useState(/*Country !== "" ? Country :*/ "");
        
        const cart = useSelector(state => state.cart);


        const productsNames = cart.cartProducts.map(({name}, index) => name);
        //console.log(...productsNames)
        console.log(productsNames)
      
        useEffect(() => {
            //dispatch(address())
      
         }, []);


         if(!auth.signedIn) {
          return <Redirect to="/login"/>
        }
     
        //const address = { FirstName, LastName, Address1, Address2, City, Zip, Country  }
        const deliveryLocation = { FirstName: firstName, LastName: lastName, Address1: address1, Address2: address2, City: city, Zip: zip, Province: province, Country: country }

        const deliveryAddress = JSON.stringify(deliveryLocation);
        
        const items = cart.cartProducts;

        const orderItems = JSON.stringify(items);
        
        //console.log(items)
        const TotalPrice = cart.cartProducts.reduce((initQty, { productId, quantity, price }, index) => {
            return quantity * price + initQty
        }, 0);

        const orderPayload = {
            deliveryAddress,
            totalItems: cart.cartProducts.length,
            totalPrice: TotalPrice,
            paymentMethod: option,
            orderItems,
        }

        const handleNext = () => {
            if(activeStep === 0 && firstName === "" && lastName === "" && firstName === "" && address1 === "" && address2 === "" && city === "" && zip === "" && province === "" && country === "" ) return

            if(activeStep === 1) {
                //
                if(option === "payFast") {
                   //getStepContent(2)
                    setActiveStep(2);                   
                    console.log(activeStep);                    
                    dispatch(addOrder(orderPayload));
                    //localStorage.setItem("address", deliveryAddress);

                } else {
                   //setActiveStep(activeStep + 1);
                   //console.log(activeStep);  
                   setActiveStep(3);                        
                   dispatch(addOrder(orderPayload));
                   //localStorage.setItem("address", deliveryAddress);
                } 
           } else {
                   if(activeStep === 3) setActiveStep(4)
                  setActiveStep(activeStep + 1);   
                //return <Redirect to="/orders" />          
          }

        }
       
        
      
        const handleBack = () => {
          setActiveStep(activeStep - 1);
        };

        

      const PaymentForm = () => {
            
              return (
                <>
                 <Typography variant="h6" gutterBottom>
                    Payment Method
                  </Typography>
                  <Grid container spacing={3}>
                 
                  <FormControl component="fieldset">      
                  <RadioGroup aria-label="gender" name="payment-options" value={option} onChange={(e) => setOption(e.target.value)}>
                    <FormControlLabel value="cod" control={<Radio />} label="COD" />
                    <FormControlLabel value="payFast" control={<Radio />} label="payfast" />
                  </RadioGroup>
                </FormControl>
                  </Grid>
                </>
              );
        }

      
    return (
      <Header login={!auth.signedIn} >

         <div className="checkout-border" style={{}}>
         <div>
         <CssBaseline />
     
      <main className={classes.layout}>
        <Paper elevation={3} className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper style={{ color:"#0b79bf" }}  activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>                     
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep === 1 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}            
                </div>
              </>               
        </Paper>
      
      </main>
         </div>
         
     <div style={{ alignItems: "center", height: 170, marginLeft: 10, marginBottom: 10, width: "auto" }} >
     <Paper elevation={3} className={classes.paper}>
             <h3 style={{ color: "#474747"}}>Order Summary</h3>
           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p>Total Items ({cart.cartProducts.length})</p>
            <h2 style={{color: "#1c8644"}}>R {TotalPrice}</h2>
            </div>
            <button style={{}} className="button" onClick={handleNext}>{activeStep === steps.length - 1 ? 'Place order' : 'Continue'}</button>
      </Paper>
       </div>
       
       </div>  
  
    </Header>
    )
}

export default Checkout;