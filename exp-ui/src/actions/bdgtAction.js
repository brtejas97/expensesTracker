import axios from 'axios'

export const startGetBdgt = (props) => {
    // console.log(props)
    return (dispatch)=>{
        axios.get('http://localhost:3005/api/budget',{
            headers:{
                Authorization:localStorage.getItem('exp-token')
            }
        })
            .then((response)=>{
                // console.log(response);
                const result = response.data
                // if(result.hasOwnProperty('errors')) alert(result.errors)
                // else{
                    if(result!==null){
                        if(result.message==='jwt expired'){
                            localStorage.removeItem('exp-token')
                            props.history.push('/login')
                        }
                        else{
                            dispatch(setBudget(result))
                        }
                    }else{
                        dispatch(setBudget(result))
                    }
            })
            .catch((err)=>alert(err.message))
    }
}

const setBudget = (data) => {
    return {
        type:"GET_BUDGET",
        payload:data
    }
}

export const startPutBdgt = (body) => {
    return (dispatch) => {
        axios.post('http://localhost:3005/api/budget',body,{
            headers:{
                Authorization:localStorage.getItem('exp-token')
            }
        })
            .then((response)=>{
                if(response.data.errors){ 
                    console.log(response)
                    alert(response.data.errors)
                }
                else{
                    dispatch(addBudget(response.data))
                }
            })
            .catch(err=>alert(err.message))
    }
}

export const startUpdBdgt = (body,bdgtId,handleToggle) => {
    // console.log(bdgtId);
    return (dispatch) => {
        axios.put(`http://localhost:3005/api/budget/${bdgtId}`,body,{
            headers:{
                Authorization:localStorage.getItem('exp-token')
            }
        })
        .then((response)=>{
            if(response.data.errors) alert(response.data.errors.message)
            else{
                dispatch(addBudget(response.data))
                alert('budget update successfull')
                handleToggle()
            }
        })
        .catch(err=>alert(err.message))
    }
}

const addBudget = (data) => {
    return {
        type:"ADD_BUDGET",
        payload:data
    }
}