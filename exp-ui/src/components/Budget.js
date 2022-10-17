import React, {useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux'
import { withRouter } from "react-router-dom";

import { startGetBdgt, startPutBdgt, startUpdBdgt } from "../actions/bdgtAction";

const Budget = (props) => {
    console.log(props)
    // const {props} = props
    const bdgt = useSelector((store)=>{
        if (store.budget!==null) return store.budget.amount
    })
    // console.log(bdgt);
    
    const bdgtId = useSelector((store)=>{
        if (store.budget!==null) return store.budget._id
    })
    // console.log(bdgtId);

    const [budget,setBudget] = useState(bdgt)
    const [amount,setAmount] = useState('')
    const [editToggle,setEditToggle]  = useState(false)
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetBdgt(props))
    },[])

    const handleToggle = () => {
        setBudget(bdgt)
        setEditToggle(!editToggle)
    }

    const handleBdgtUpdEntry = (e) => {
        setBudget(e.target.value)
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(amount.length===0) alert('enter your budget before submitting')
        else{
            dispatch(startPutBdgt({amount:Number(amount)}))
        }
    }

    const handleBdgtUpdSubmit = (e) => {
        e.preventDefault()
        if(budget.length===0) alert('update with a value or hit cancel button')
        else{
            if(bdgt>budget ? window.confirm(`decrease budget from ${bdgt} to ${budget}?`) : window.confirm(`increase budget from ${bdgt} to ${budget}?`)){
                dispatch(startUpdBdgt({amount:Number(budget)},bdgtId,handleToggle))
            }
        }
    }

    return (
        <div>
            {
                bdgt ? 
                (
                    editToggle ? (
                        <div>
                            <form onSubmit={handleBdgtUpdSubmit}>
                            <input type="number" placeholder="update budget" onChange={handleBdgtUpdEntry} value={budget} /> &nbsp;
                            <Button variant="outline-success" onClick={handleBdgtUpdSubmit} >update budget</Button> &nbsp;
                            <Button variant="outline-danger" onClick={handleToggle}>cancel update</Button>
                            </form>
                            {/* <span>Your Budget -</span>
                            <input type="text" value={budget} onChange={handleBdgtUpdEntry} />
                            <button onClick={handleToggle}>save update</button> */}
                            
                        </div>
                    ) : (
                        <div>
                            <span style={{fontSize:'20px'}}>Your Budget - </span>
                            <b style={{fontSize:'23px'}}>{bdgt}</b> &nbsp;
                            <Button class = "btn btn-primary btn-sm" style={{size:''}} onClick={handleToggle}>update budget</Button>
                        </div>
                    )
                )
                :
                (
                <div>
                    <h3>Add your first budget now</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="number" placeholder="budget" onChange={handleAmountChange} value={amount} /><br/><br/>
                            <Button onClick={ handleSubmit }>Submit</Button>
                        </form>
                </div>
                )
            }
             
        </div>
    )
}

export default withRouter(Budget)