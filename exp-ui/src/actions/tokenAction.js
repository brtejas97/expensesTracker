import axios from 'axios'
import swal from 'sweetalert'

export const startGetToken = (body,props) => {
    // console.log(props)
    return (dispatch)=>{
        axios.post('http://localhost:3005/api/users/login',body)
            .then((response)=>{
                // console.log(response)
                if(response.data.errors) alert(response.data.errors)
                else{ 
                    localStorage.setItem('exp-token',response.data.token)
                    dispatch(setToken(response.data))
                    // // alert('login successful')
                    // swal({
                    //     title: "Login successful",
                    //     // text: "will be delivered in 30 minutes",
                    //     icon: "success",
                    //     button: "OK",
                    //   })
                    // .then(() => {
                    //     swal(props.history.push('/'))
                    // })
                    props.history.push('/')
                }
            })
            .catch((err)=>alert(err))
    }
}

const setToken = (tkn) => {
    return {
        type: "SET_TOKEN",
        payload: tkn
    }
}

export const eraseToken = () => {
    localStorage.removeItem('exp-token')
    return {
        type:'ERASE_TOKEN'
    }
}