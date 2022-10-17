const initExp = []

const expReducer = (state=initExp,action) => {
    switch (action.type) {
        case "GET_EXPENSES" : {
            return action.payload
        }
        case "ADD_EXPENSE" : {
            return [...state,action.payload]
        }
        case "DELETE_EXPENSE" : {
            const result = state.filter((ele)=>{
                return ele._id !== action.payload._id
            })
            return result
        }
        case "UPDATE_EXPENSE" : {
            const result = state.map((ele)=>{
                if(ele._id===action.payload._id){
                    return action.payload
                }else{
                    return ele
                }
            })
            return result
        }

        default : {
            return state
        }
    }
}

export default expReducer