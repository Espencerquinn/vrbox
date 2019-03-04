const initialState ={
    id: '',
    firstname: '',
    lastname: '',
    username: '',
    email:'',
    phonenumber: '',
    password: '',
    isUploading: 'false',
    url: 'http://via.placeholder.com/450x450'
}

const SET_ATTRIBUTE = 'SET_ATTRIBUTE';


//action builder 
export function setAttribute(userAttr){
    return {
        type: SET_ATTRIBUTE,
        payload: userAttr
    }
}

export default function reducer (state = initialState, action) {
    const { type, payload } = action; 
    switch(type){
        case SET_ATTRIBUTE:
        state={...state, ...payload}
        console.log("reducer", state, payload)
        return state
        default:
            return state;
    }
}