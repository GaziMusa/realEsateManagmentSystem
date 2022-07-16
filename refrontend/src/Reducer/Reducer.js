export const intialState = {
    isLogin:false,
    type: '',
    id: '',
    name: '',
    email: ''
};

export const reducer = (state, action) => {
    if (action.type === "AGENT") {
        return action.agentPayload;
    } else if (action.type === "USER") {
        return action.userPayload;
    } else if (action.type === "ADMIN"){
        return action.adminPayload;
    }
    return state;
}