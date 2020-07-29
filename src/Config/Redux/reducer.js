import { combineReducers } from "redux";
import { ActivityIndicatorComponent } from "react-native";


const loginState = {
    email : '',
    password : '',
};

const homeState = {
    friendlist : []
}

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
        message : '',
        timestamp : ''
    },
    sender : '',
    receiver : '',
    message : []
}

const findfriend = {
    name : '',
}

const invitationState = {
    listpending : [],
    listincoming : [],
    senderid : '',
    receiverid : ''
}

const invitationReducer = (state = invitationState, action) => {
    if(action.type === 'SET_LIST'){
        return{
            ...state ,
            listpending : action.value
        }
    }
    if(action.type === 'SET_INCOMING'){
        return{
            ...state ,
            listincoming : action.value
        }
    }
    if(action.type === 'SET_SENDER'){
        return{
            ...state ,
            [action.intype] : action.value
        }
    }
    return state;
}

const homeReducer = (state = homeState , action) => {
    if(action.type === 'SET_HOMEFRIEND'){
        return{
            ...state,
            friendlist : action.value
        }
    }
    return state;
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
    if(action.type === 'SET_SENDER'){
        return{
            ...state,
            sender : action.value
        }
    }
    if(action.type === 'SET_RECEIVER'){
        return{
            ...state,
            receiver : action.value
        }
    }
    if(action.type === 'SET_LISTMSG'){
        return{
            ...state , 
            message : action.value
        }
    }
    return state;
}

const reducer = combineReducers({
    registerReducer ,
    loginReducer,
    chatReducer,
    findFriendReducer,
    invitationReducer,
    homeReducer
})

export default reducer;