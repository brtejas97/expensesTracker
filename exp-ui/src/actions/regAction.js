import axios from "axios";

export const startRegUser = (body,props) => {
    return () => {
        axios.post('http://localhost:3005/api/users/reg',body)
            .then(resp=>{
                // console.log(resp)
                const result = resp.data
                if(result.code===11000) alert('this email is already registered with us')
                else{
                    alert('registered successfully')
                    props.history.push('/login')
                }
            })
            .catch(err=>alert(err))
    }
}
