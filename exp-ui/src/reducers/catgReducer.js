const initCatgs = []

const catgReducer = (state=initCatgs,action) => {
    switch (action.type) {
        case "GET_CATEGORIES" : {
            return [...action.payload]
        }
        case "ADD_CATEGORY" : {
            return [...state,action.payload]
        }
        case "UPDATE_CATEGORY" :{
            const result = state.map((ele)=>{
                if(ele._id===action.payload._id){
                    return action.payload
                }else{
                    return ele
                }
            }) 
            return result
        }
        case "DELETE_CATEGORY" : {
            const result = state.filter((ele)=>{
                return ele._id!==action.payload._id
            })
            return result
        }

        default : {
            return state
        }
    }
}

export default catgReducer