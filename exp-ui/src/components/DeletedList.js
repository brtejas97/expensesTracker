import React,{useEffect} from "react";
import { Button } from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux"
import { startGetExp } from "../actions/expAction";
import EachExpense from "./EachExpense";

const DeletedList = (props) => {
    const {setTrashTgl} = props

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetExp())
    },[])

    const deletedExpenses = useSelector((store)=>{
        if(store.expenses.length>0) return store.expenses.filter(ele=>ele.isDeleted)
        return []
    })

    // const {_id,name,amount,date,category:catgId} = props

    return (
        <div>
            <h3>Deleted Expenses - [{deletedExpenses.length}]</h3>
            {
                deletedExpenses.length>0 && deletedExpenses.map((exp)=>{
                    return <EachExpense key={exp._id} _id={exp._id} name={exp.name} amount={exp.amount} date={exp.date} isDeleted={exp.isDeleted} category={exp.category}/>
                })
            }
            <Button onClick={()=>setTrashTgl(false)}>Hide trash</Button>
        </div>
    )
}

export default DeletedList