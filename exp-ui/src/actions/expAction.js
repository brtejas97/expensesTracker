import axios from "axios";
import swal from 'sweetalert'

export const startGetExp = (props) => {
    return (dispatch)=>{
        axios.get('http://localhost:3005/api/expenses',{
            headers:{
                Authorization : localStorage.getItem('exp-token')
            }
        })
            .then(response=>{
                const result = response.data
                if(result.message==='jwt expired'){
                    localStorage.removeItem('exp-token')
                    props.history.push('/login')
                } 
                else{
                    dispatch(getExpenses(result))
                }
            })
            .catch(err=>{
                alert(err.message)
            })
    }
}

const getExpenses = (data) => {
    return {
        type : "GET_EXPENSES",
        payload: data
    }
}

export const startAddExp = (body,refreshForm) => {
    return (dispatch)=>{
        // console.log(body)
        axios.post('http://localhost:3005/api/expenses',body,{
            headers:{
                Authorization : localStorage.getItem('exp-token')
            }
        })
            .then(response=>{
                const result = response.data
                console.log(response)
                if(result.errors) alert(result.errors.message)
                else{
                    dispatch(addExpense(result))
                    swal("New expense added successfully", "", "success");
                    refreshForm()
                }
            })
            .catch(err=>{
                console.log(err)
                alert(err.message)
            })
    }
}

const addExpense = (data) => {
    return {
        type:"ADD_EXPENSE",
        payload:data
    }
}

export const startDeleteExp = (id) => {
    return (dispatch)=>{
        axios.delete(`http://localhost:3005/api/expenses/${id}`,{
            headers:{
                Authorization:localStorage.getItem('exp-token')
            }
        })
        .then(response=>{
            const result = response.data
            // console.log(response)
            if(result.errors) alert(result.errors.message)
            else{
                dispatch(deleteExp(result))
            }
        })
        .catch(err=>{
            // console.log(err)
            alert(err.message)
        })
    }
}

const deleteExp = (data) => {
    return {
        type:"DELETE_EXPENSE",
        payload:data
    }
}

export const startUpdExp = (id,body,refreshEditForm) => {
    return (dispatch)=>{
        axios.put(`http://localhost:3005/api/expenses/${id}`,body,{
            headers:{
                Authorization:localStorage.getItem('exp-token')
            }
        })
            .then((response)=>{
                const result = response.data
            // console.log(response)
                if(result.errors) alert(result.errors.message)
                else{
                    dispatch(updateExpense(result))
                    if(refreshEditForm) refreshEditForm()
                }
            })
            .catch((err)=>{
                // console.log(err);
                alert(err.message)
            })
    }
}

const updateExpense = (data) => {
    return {
        type:"UPDATE_EXPENSE",
        payload:data
    }
}