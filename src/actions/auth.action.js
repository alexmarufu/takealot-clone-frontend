import { USER_LOGIN_IN_REQUEST, USER_LOGIN_IN_SUCCESS, USER_LOGIN_IN_ERROR, UPDATE_ADDRESS, USER_LOGOUT} from "../constants/index"

import axios from '../Axios/index';

export const login = (user) => async (dispatch) => {
        dispatch({type: USER_LOGIN_IN_REQUEST})
             try {
                const res = await axios.post("/signin", user);
                if (res.status === 201) {
                    console.log(res);
                    const { token, user } = res.data; 
                    localStorage.setItem("token", token);
                    localStorage.setItem("logedInuser",JSON.stringify(user));
                    dispatch({type: USER_LOGIN_IN_SUCCESS, payload: { token, user }})
                } else {
                    const { error } = res.data
                    dispatch({type: USER_LOGIN_IN_ERROR, payload: { error }})
                    console.log(res)
            }
                
             } catch (error) {
                dispatch({type: USER_LOGIN_IN_ERROR, payload: { error }})
                   console.log(error)
          }
        
}






export const signup = (user) => async (dispatch) => {
    dispatch({type: USER_LOGIN_IN_REQUEST});
         try {
            const res = await axios.post("/signup", user);
            if (res.status === 201) {
                console.log(res);
                const { token, user } = res.data; 
                localStorage.setItem("token", token);
                localStorage.setItem("logedInuser", JSON.stringify(user));
                dispatch({type: USER_LOGIN_IN_SUCCESS, payload: { token, user }})
            } else {
                    const { error } = res.data
                    dispatch({type: USER_LOGIN_IN_ERROR, payload: { error }})
            }
            
         } catch (error) {
            dispatch({type: USER_LOGIN_IN_ERROR, payload: { error }})
               console.log(error)
      }
    
}

 
export const updateUser = () => (dispatch) => {
  dispatch({type: USER_LOGIN_IN_REQUEST});

  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("logedInuser"));
    if (token && user) {
        dispatch({type: USER_LOGIN_IN_SUCCESS, payload: { token, user }});
    } else {
        dispatch({type: USER_LOGOUT})
     }
    } catch (error) {
            dispatch({type: USER_LOGIN_IN_ERROR, payload: { error }});
            console.log(error)
        }
    }









export const address = () => (dispatch) => {
      dispatch({type: USER_LOGIN_IN_REQUEST});
    const address = JSON.parse(localStorage.getItem("address"));
    if (address) {
          try {
           dispatch({type: UPDATE_ADDRESS, payload: { address }})
           console.log(address)
          } catch (error) {
              dispatch({type: USER_LOGIN_IN_ERROR, payload: { error }})
          }
     } else {
          const address = {
                  FirstName: "",
                  LastName: "", 
                  Address1: "", 
                  Address2: "",
                  City: "",
                  Zip: "",
                  Province: "",
                  Country: ""
              }
          dispatch({type: UPDATE_ADDRESS, payload: { address }})
    }
  }
  
  
