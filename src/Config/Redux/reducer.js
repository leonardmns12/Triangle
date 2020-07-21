import { combineReducers } from "redux";


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
    chatReducer
})

export default reducer;