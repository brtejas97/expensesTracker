import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';

import { startGetCatgs } from "../actions/catgAction";
import { startAddExp, startUpdExp } from "../actions/expAction";

const ExpenseForm = (props) => {
    const {setNewExpTgl,setExpEditToggle,_id,name,date,amount,category,newExpTgl,expEditToggle} = props
    // const [newExpTgl,setNewExpTgl] = useState(false)
    const [expName,setExpName] = useState(name?name:'')
    const [expDate,setExpDate] = useState(date?date.slice(0,10):'')
    const [expAmount,setExpAmount] = useState(amount?amount:'')
    const [expCatgType,setExpCatgType] = useState(category?category:'')
    const [formErrors,setFormErrors] = useState({})

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetCatgs())
    },[])

    const categories = useSelector((store)=>{
        return store.categories
    })

    const handleChange = (e) => {
        const attr = e.target.name
        const value = e.target.value
        if(attr==='name') setExpName(value)
        else if(attr==='amount') setExpAmount(value)
        else if(attr==='date') setExpDate(value)
        else if(attr==='select') setExpCatgType(value)
    }

    const errors={}
    const runValidations = () => {
        if(expName.length===0) errors.name = 'describe the expense'
        if(expAmount.length===0) errors.amount = 'expense value?'
        if(expDate.length===0) errors.date = 'date is required'
        if(expCatgType.length===0) errors.category = 'category is required'
    }

    const handleExpenseForm = (e) => {
        e.preventDefault()
        const expForm = {
            name:expName,
            amount:expAmount,
            date:expDate,
            category:expCatgType
        }
        runValidations()
        if(Object.keys(errors).length===0){
            setFormErrors({})
            console.log(expForm)
            const refreshNewForm = () => {
                setExpName('')
                setExpAmount('')
                setExpDate('')
                setExpCatgType('')
                setNewExpTgl(false)
            }
            const refreshEditForm = () => {
                setExpName('')
                setExpAmount('')
                setExpDate('')
                setExpCatgType('')
                setExpEditToggle(false)
            }
            if(window.confirm(
                `if you want to make changes hit CANCEL
                hit OK to proceed with submission`
            )){
                expEditToggle&&dispatch(startUpdExp(_id,expForm,refreshEditForm))
                newExpTgl&&dispatch(startAddExp(expForm,refreshNewForm))
        }
        }else{
            setFormErrors(errors)
        }
    }
    return (
                    <div>
                        <br/>
                        <form>
                            <label>Expense - </label>&nbsp;
                            <input name="name" type="name" placeholder="on what did you spend?" value={expName} onChange={handleChange} />
                            &nbsp;
                            {formErrors.name&&<b style={{fontSize:'12px',color:'red'}}>{formErrors.name}</b>}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <label>Amount - </label>&nbsp;
                            <input name="amount" type="number" placeholder="how much?" value={expAmount} onChange={handleChange} />
                            &nbsp;
                            {formErrors.amount&&<b style={{fontSize:'12px',color:'red'}}>{formErrors.amount}</b>}
                            <br/><br/>
                            <label>Date - </label>&nbsp;
                            <input name="date" type="date" value={expDate} onChange={handleChange} />
                            &nbsp;
                            {formErrors.date&&<b style={{fontSize:'12px',color:'red'}}>{formErrors.date}</b>}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <label>Select a category for the expense - </label>&nbsp;
                            <select value={expCatgType} name="select" onChange={handleChange}>
                                <option value="">---select one---</option>
                                {
                                    categories.map((ele)=>{
                                        return <option key={ele._id} value={ele._id} >{ele.name}</option>
                                    })
                                }
                            </select>
                            &nbsp;
                            {formErrors.category&&<b style={{fontSize:'12px',color:'red'}}>{formErrors.category}</b>}
                            <br/><br/>
                            {/* {
                                newExpTgl && <button onClick={handleExpenseForm}>add</button>
                            } */}
                            {
                                newExpTgl && <Button variant="success" onClick={handleExpenseForm}>add</Button>
                            }
                            {
                                expEditToggle && <Button variant="success" onClick={handleExpenseForm}>update expense</Button>
                            }
                            {/* <button onClick={handleAddExpense}>add</button> */}
                            {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                            {/* <button onClick={handleCancelEdit}>cancel</button> */}
                        </form>
                        <br/>
                    </div>
    )
}

export default ExpenseForm