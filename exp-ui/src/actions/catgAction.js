import axios from "axios";

export const startGetCatgs = (props) => {
    return (dispatch) => {
        axios.get('http://localhost:3005/api/categories',{
            headers:{
                Authorization:localStorage.getItem('exp-token')
            }
        })
            .then((response)=>{
                if(response.data.message==='jwt expired'){
                    localStorage.removeItem('exp-token')
                    props.history.push('/login')
                } 
                else{
                    dispatch(getCategories(response.data))
                }
            })
            .catch(err=>alert(err.message))
    }
}

const getCategories = (data) => {
    return{
        type:"GET_CATEGORIES",
        payload:data
    }
}

// export const startGetOneCatg = () => {
//     return (dispatch)=>{
//         axios.get(`http://localhost:3005/api/categories/`)
//     }

// }

export const startAddCatg = (body,refreshForm) => {
    return (dispatch) => {
        axios.post('http://localhost:3005/api/categories',body,{
            headers:{
                Authorization : localStorage.getItem('exp-token')
            }
        })
            .then((response)=>{
                console.log(response);
                if(response.data.errors) alert(response.data.errors.message)
                else{
                    dispatch(addCategories(response.data))
                    refreshForm()
                }
            })
            .catch(err=>alert(err.message))
    }
}

const addCategories = (data) => {
    return{
        type:"ADD_CATEGORY",
        payload:data
    }
}

export const startUpdCatg = (body,id,refresh) => {
    return (dispatch)=>{
        // console.log(body,id)
        axios.put(`http://localhost:3005/api/categories/${id}`,body,{
            headers:{
                Authorization:localStorage.getItem('exp-token')
            }
        })
            .then((response)=>{
                const result = response.data
                // console.log(result);
                if(result.errors) alert(result.errors.message)
                else{
                    dispatch(updateCategory(result))
                    refresh()
                }
            })
            .catch((err)=>{
                alert(err.message);
            })
    }
}

const updateCategory = (data) => {
    return {
        type:"UPDATE_CATEGORY",
        payload: data
    }
}

export const startDeleteCatg = (id) => {
    console.log(id)
    return (dispatch)=>{
        axios.delete(`http://localhost:3005/api/categories/${id}`,{
            headers:{
                Authorization:localStorage.getItem('exp-token')
            }
        })
            .then((response)=>{
                const result = response.data
                if(result.errors) alert(result.errors.message)
                else{
                    dispatch(deleteCategory(result))
                }
            })
            .catch((err)=>{
                alert(err.message);
            })
    }
}

const deleteCategory = (data) => {
    return {
        type:"DELETE_CATEGORY",
        payload:data
    }
}