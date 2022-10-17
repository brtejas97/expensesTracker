import axios from "axios"

export const startGetUserProfile = (props) => {
    return (dispatch) => {
        // console.log(localStorage.getItem('token'))
        axios.get('http://localhost:3005/api/users/profile',{
            headers:{
                Authorization:localStorage.getItem('exp-token')
            }
        })
            .then(resp=>{
                const result = resp.data
                // console.log(resp)
                // if(result.hasOwnProperty('message')){
                //     alert(result.message)
                //     localStorage.removeItem('token')
                // }
                if(result.message==='jwt expired'){
                    localStorage.removeItem('exp-token')
                    props.history.push('/login')
                }
                else{
                    dispatch(setUserProfile(result))
                }
            })
            .catch((err)=>alert(err))
    }
}



export const startUpdateProfile = (body,refresh,props) => {
    return (dispatch) => {
        axios.put('http://localhost:3005/api/users/update',body,{
            headers:{
                Authorization:localStorage.getItem('exp-token')
            }
        })
            .then((response)=>{
                const result = response.data
                console.log(result)
                if(result.message==='jwt expired'){
                    localStorage.removeItem('exp-token')
                    props.history.push('/login')
                }
                else{
                    dispatch(setUserProfile(result))
                    refresh()
                }
            })
            .catch((err)=>alert(err.message))
    }
}

const setUserProfile = (body) => {
    return {
        type:"SET_USER_PROFILE",
        payload:body
    }
}

// const updateProfile = (data) => {
//     return {
//         type:"UPDATE_PROFILE",
//         payload:data
//     }
// }