const initBdgt = {}

const bdgtReducer = (state=initBdgt,action) => {
    // console.log(action.payload)
    switch (action.type) {
        case "GET_BUDGET" : {
            return action.payload
        }
        case "ADD_BUDGET" : {
            return action.payload
        }

        default : {
            return state
        }
    }
}

export default bdgtReducer