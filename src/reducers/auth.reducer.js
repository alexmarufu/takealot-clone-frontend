import { 
     USER_LOGIN_IN_REQUEST, 
     USER_LOGIN_IN_SUCCESS, 
     USER_LOGIN_IN_ERROR, 
     UPDATE_ADDRESS,
     USER_LOGOUT 
    } from "../constants/index.js"

const initialState = {
    token: null,
    signedIn: false,
    loading : false,
    error: null,
    user : {
        id: null,
        userId: "",
        first_name: "",
        last_name: "",
        email: ""
    },
    address: {
        FirstName: "",
        LastName: "", 
        Address1: "", 
        Address2: "",
        City: "",
        Zip: "",
        Province: "",
        Country: ""
    }
}

const authReducer = (state = initialState, action) => {
 
 switch (action.type) {
 
     case USER_LOGIN_IN_REQUEST:
        return state = {
            ...state,
            loading: true
        }
        
    case USER_LOGIN_IN_SUCCESS:
          return state = {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
            loading: false,
            signedIn: true
            
        }
    case UPDATE_ADDRESS:
           return state = {
                   ...state,
                   address: action.payload.address,
                }
    case USER_LOGIN_IN_ERROR:
           return state = {
               ...state,
               loading: false,
               error: action.payload.error
            
        }
        
    case USER_LOGOUT:
            return state = {
           ...initialState
            
        }
        
       default: return state;
        
           
    }
}

export default authReducer;