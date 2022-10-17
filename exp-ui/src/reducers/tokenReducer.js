const initToken = localStorage.getItem('exp-token')

const tokenReducer = (state=initToken,action) => {
    switch (action.type) {
        case "SET_TOKEN" : {
            return action.payload
        }
        case "ERASE_TOKEN" : {
            return null
        }

        default : {
            return state
        }
    }

}

export default tokenReducer