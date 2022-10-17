import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { startGetCatgs } from "../actions/catgAction";
import { startDeleteExp, startGetExp, startUpdExp } from "../actions/expAction";
import ExpenseForm from "./ExpenseForm";

const EachExpense = (props) => {
    const [expEditToggle,setExpEditToggle] = useState(false)
    const {_id,name,amount,date,category:catgId,isDeleted} = props

    const dispatch = useDispatch()

    useEffect(()=>{
        catgName()
        dispatch(startGetCatgs(props))
        dispatch(startGetExp(props))
        // dispatch(startGetOneCatg(_id))
    },[])

    const catgDetails = useSelector((store)=>{
        return store.categories
    })
    // console.log(catgDetails);

    const catgName = () => {
        const catg = catgDetails.find((ele)=>{
            return ele._id===catgId
        })
        if(catg===undefined) return 'uncategorised'
        else return catg.name
    }

    const handleExpDelete = () => {
        if(isDeleted===false){
            if(window.confirm(`sure you want to move '${name}' expense to trash?`)) dispatch(startUpdExp(_id,{isDeleted:true}))
        }
        else{
            if(window.confirm(`sure you want to permanently delete '${name}' expense?`)) dispatch(startDeleteExp(_id))
        }
    }

    const handleExpUndo = () => {
        if(window.confirm(`move ${name} expense to primary expense list in home page?`)) dispatch(startUpdExp(_id,{isDeleted:false}))
    }

    return(
        <div>
            <span>Name: </span> &nbsp;
            <b>{name}</b> &nbsp;&nbsp;
            <span>Amount: </span> &nbsp;
            <b>{amount}</b> &nbsp;&nbsp;
            <span>Spent on: </span> &nbsp;
            <b>{date.slice(0,10)}</b> &nbsp;&nbsp;
            <span>Category: </span> &nbsp;
            <b>{catgName()}</b> &nbsp;&nbsp;
            {/* <button onClick={()=>setExpEditToggle(true)}>update</button> &nbsp;&nbsp; */}
            <Button variant="outline-secondary" onClick={()=>setExpEditToggle(true)}>update</Button> &nbsp;&nbsp;
            {
                expEditToggle && (
                    <div>
                        <ExpenseForm expEditToggle={expEditToggle} setExpEditToggle={setExpEditToggle} {...props} />
                        <Button variant="secondary" onClick={()=>setExpEditToggle(false)}>cancel</Button>
                    </div>
                )
            }
            {
                !expEditToggle && <Button variant="outline-danger" onClick={handleExpDelete}>{!isDeleted ? <i style={{fontSize:"24px"}} class="fa">&#xf014;</i> : 'Delete'}</Button>
            }
            {/* {
                !expEditToggle && <button onClick={handleExpDelete}>delete</button>
            } */}
            &nbsp;&nbsp;
            {
                (!expEditToggle && isDeleted) && <Button onClick={handleExpUndo} ><i class="fa fa-refresh fa-spin"></i> Move to primary expenses</Button>
            }
            
            <hr/>
        </div>
    )
}

export default EachExpense