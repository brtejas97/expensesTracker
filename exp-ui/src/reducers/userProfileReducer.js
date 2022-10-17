const initState = {}

const userProfileReducer = (state=initState,action) => {
    switch (action.type) {
        case "SET_USER_PROFILE" : {
            return action.payload
        }
        case "UPDATE_PROFILE" : {
            return action.payload
        }

        default : {
            return state
        }
    }
}

export default userProfileReducer