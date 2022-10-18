import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap"; 
import pngegg from '../imgs/pngegg.png'
import moneyAll from '../imgs/moneyAll.png'

import {startGetToken} from '../actions/tokenAction'

const Login = (props) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [formErrors,setFormErrors] = useState({})

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const attr = e.target.name
        const value = e.target.value
        if(attr==='email') setEmail(value)
        else if(attr==='password') setPassword(value)
    }

    const errors = {}
    const runValidations = () => {
        if(email.length===0) errors.email = "email is required"
        else if(!email.includes('@')||!email.includes('.com')) errors.email = "please enter a valid email"
        if(password.length===0) errors.password = "password field cannot be empty"
        else if(password.length<8) errors.password = "password length should be between 8 to 128 characters"
        setFormErrors(errors)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length===0){
            const formData = {
                email:email,
                password:password
            }
           dispatch(startGetToken(formData,props));
        }else{
            setFormErrors(errors)
        }
    }

    return(
        // <div class="flex-container" >
        //     {/* style={{
        //     position: 'absolute', left: '50%', top: '50%',
        //     transform: 'translate(-50%, -50%)'
        //   }} */}
        //     <br/>
        //     <div style={{float:'left'}}>
        //     <h4>Login</h4>
            
        //     <form onSubmit={handleSubmit}>
        //         <input type="text" name="email" placeholder="e-mail" value={email} onChange={handleChange}  /> {formErrors.email&&<span>{formErrors.email}</span>}
        //         <br/><br/>
        //         <input type="password" name="password" placeholder="password" value={password} onChange={handleChange}  /> {formErrors.password&&<span>{formErrors.password}</span>}
        //         <br/><br/>
        //         <Button type="submit" variant="success">login</Button>
        //     </form>
        //     </div>
        //     <div style={{float:'right'}}>
        //         <img src="https://img.freepik.com/free-vector/childcare-expenses-abstract-concept-vector-illustration-child-care-tax-credit-family-budget-childcare-money-daycare-expenses-calculation-deduction-financial-plan-abstract-metaphor_335657-5908.jpg" />
        //     </div>
        // </div>

        <div style={{display:'flex',justifyContent: 'space-evenly'}}>
          <div className="card" style={{borderColor:'white'}}>
            <br/>
            <h4>Login</h4>
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="e-mail" value={email} onChange={handleChange}  /> {formErrors.email&&<b style={{fontSize:'12px',color:'red'}}>{formErrors.email}</b>}
                <br/><br/>
                <input type="password" name="password" placeholder="password" value={password} onChange={handleChange}  /> {formErrors.password&&<b style={{fontSize:'12px',color:'red'}}>{formErrors.password}</b>}
                <br/><br/>
                <Button type="submit" variant="success">login</Button>
            </form>
            </div>

            <div className="card" style={{width: "30rem",borderColor:'white'}}>
                <img src={moneyAll} />
                {/* <img src="https://img.freepik.com/free-vector/childcare-expenses-abstract-concept-vector-illustration-child-care-tax-credit-family-budget-childcare-money-daycare-expenses-calculation-deduction-financial-plan-abstract-metaphor_335657-5908.jpg" /> */}
            </div>
        </div>
    )
}

export default Login