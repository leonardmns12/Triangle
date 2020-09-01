import { combineReducers } from "redux";
import { inviteGroupMember } from "./restApi";

const loginState = {
    email : '',
    password : '',
};

const homeState = {
    friendlist : [],
    displayname : '',
    statusmessage : '',
    profileuri : 'null',
    allfriend : [],
    grouplist : [],
    pendinggroup : []
}

const groupInfoState = {
    memberGroup : [],
    pendingGroup : []
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
    userId : '',
    form : {
        sender : '',
        receiver : '',
        message : '',
        timestamp : '',
        token : '',
    },
    sender : '',
    receiver : '',
    message : [],
    profileImg : 'null',
    downloaduri : ''
}

const findfriend = {
    name : '',
    render : false
}

const invitationState = {
    listpending : [],
    listincoming : [],
    senderid : '',
    receiverid : ''
}

const editprofileState = {
    statusmessage : '',
    displayname : ''
}

const chatMenuState = {
    chatlist : [],
    allfriend : []
}

const resultFriendState = {
    displayname : '',
    profileimg : false
}

const inviteChatState = {
    friendlist : []
}

const postTimelineState = {
    postList : []
}


const postTimelineReducer = (state = postTimelineState, action) => {
    if(action.type === 'SET_TIMELINEPOST'){
        return{
            ...state,
            postList : action.value
        }
    }
    return state
}

const inviteChatReducer = (state = inviteChatState , action) => {
    if(action.type === 'SET_FRIENDINVITE'){
        return{
            ...state,
            friendlist : action.value
        }
    }
    return state
}

const groupInfoReducer = (state = groupInfoState , action) => {
    if(action.type === 'SET_MEMBERGROUP'){
        return{
            ...state,
            memberGroup : action.value
        }
    }
    if(action.type === 'SET_GROUPPENDING'){
        return{
            ...state,
            pendingGroup : action.value
        }
    }
    return state;
}

const resultFriendReducer = (state = resultFriendState , action) => {
    if(action.type === 'SET_RESULTFRIEND'){
        return{
            ...state,
            displayname : action.value
        }
    }
    if(action.type === 'SET_RESULTFRIENDIMG'){
        return{
            ...state,
            profileimg : action.value
        }
    }
    return state;
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
    if(action.type === 'SET_ALLHOMEFRIEND'){
        return{
            ...state,
            allfriend : action.value
        }
    }
    if(action.type === 'SET_SHOWPROFILE'){
        return{
            ...state,
            [action.tipe] : action.value
        }
    }
    if(action.type === 'SET_HOMEGROUP'){
        return{
            ...state,
            grouplist : action.value
        }
    }
    if(action.type === 'SET_PENDINGGROUP'){
        return{
            ...state,
            pendinggroup: action.value
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
    if(action.type === 'SET_RENDER'){
        return{
            ...state,
            render : action.value
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

const editprofileReducer = (state = editprofileState , action) => {
    if(action.type === 'SET_EDITPROFILE'){
        return{
            ...state,
            [action.inputType] : action.value
        }
    }
    return state;
}

const chatMenuReducer = (state = chatMenuState , action) => {
    if(action.type === 'SET_CHATLIST'){
        return{
            ...state,
            chatlist : action.value
        }
    }
    if(action.type === 'SET_ALLFRIEND'){
        return{
            ...state,
            allfriend : action.value
        }
    }
    
    return state;
}

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
    if(action.type === 'SET_PROFILEIMG'){
        return{
            ...state,
            profileImg : action.value
        }
    }
    if(action.type === 'SET_DOWNLOADURI'){
        return{
            ...state,
            downloaduri : action.value
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
    homeReducer,
    editprofileReducer,
    chatMenuReducer,
    resultFriendReducer,
    groupInfoReducer,
    inviteChatReducer,
    postTimelineReducer
})

export default reducer;