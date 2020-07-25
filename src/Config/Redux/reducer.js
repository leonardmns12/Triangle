import { combineReducers } from "redux";
import { ActivityIndicatorComponent } from "react-native";


const loginState = {
    email : '',
    password : '',
};

const registerState = {
    form : {
        username : '',
        email : '',
        password : '',
        password_confirm : ''
    }  
}

const chatWindowState = {
    userId : 'ab',
    form : {
        sender : '',
        receiver : '',
        message : ''
    }
}

const findfriend = {
    name : '',
}

const invitatioState = []

const invitationReducer = (state = invitatioState, action) => {
    if(action.type === 'SET_LIST'){
        return{
            ...state ,
            form : {
                ...state.form,
                [action.inputType]: action.inputValue 
            }
        }
    }
}

const registerReducer = (state = registerState , action) => {
    if(action.type === 'SET_FORM'){
        return{
            ...state ,
            form : {
                ...state.form,
                [action.inputType]: action.inputValue 
            }
        }
    }
    if(action.type === 'CLEAR_FORM'){
        return{
            ...state,
            form : {
                username : '',
                email : '',
                password : '',
                password_confirm : ''
            }
        }
    }
    return state;
}

const findFriendReducer = (state = findfriend , action) => {
    if(action.type === 'SET_FINDFRIEND'){
        return{
            ...state,
            name : action.value
        }
    }
    return state;
}

const loginReducer = (state = loginState, action) => {
    if(action.type === 'SET_LOGIN'){
        return{
            ...state,
            [action.inputType] : action.inputValue
        }
    }
    if(action.type === 'CLEAR_PASSWORD'){
        return{
            ...state,
            password : ''
        }
    }
    return state;
};

const chatReducer = (state = chatWindowState, action) => {
    if(action.type === 'SET_MESSAGE'){
        return{
            ...state,
            form : {
                ...state.form,
                [action.inputType] : action.inputValue 
            }
        }
    }
    if(action.type === 'SET_USERID'){
        return{
            ...state,
            userId : action.value
        }
    }
    return state;
}

const reducer = combineReducers({
    registerReducer ,
    loginReducer,
    chatReducer,
    findFriendReducer
})

export default reducer;