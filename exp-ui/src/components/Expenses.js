import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { startGetExp } from "../actions/expAction";
import { startGetCatgs } from "../actions/catgAction"

import EachExpense from "./EachExpense";
import { withRouter } from "react-router-dom";

const Expenses = (props) => {
    const {chartData} = props

    const expenses = useSelector((store)=>{
        return store.expenses
    })

    const [searchText,setSeacrhText] = useState('')
    const [filterList,setFilterList] = useState(expenses)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetExp(props))
        dispatch(startGetCatgs(props))
    },[])

    useEffect(()=>{
        setFilterList(expenses)
    },[])

    const searchTextReader = (text) => {
        if(text.length>0){
            const result = expenses.filter((ele)=>{
                return ele.name.toLowerCase().includes(text.trim().toLowerCase())
            })
            if(result.length>0){
                setFilterList(result)
            }else if(result.length===0){
                setFilterList(expenses)
            }
        }
        else{
            setFilterList(expenses)
        }
    }

    useEffect(()=>{
        if(expenses.length>0){
            searchTextReader(searchText)
        }
    },[searchText])

    const handleSeacrchText = (e) => {
        setSeacrhText(e.target.value)
    }

    return(
        <div>
            <label>Search expenses: </label>&nbsp;
            <input type="text" placeholder="enter expense names" value={searchText} onChange={handleSeacrchText} /><br/><hr/>

            <h3>listing expenses - [{((searchText.length>0&&filterList.length)>0?filterList.filter(ele=>!ele.isDeleted).length:expenses.filter(ele=>!ele.isDeleted).length)}]</h3><br/>
            
            <div style={{height:'400px', overflowY:'scroll'}} >
            {
                ((searchText.length>0&&filterList.length>0)?filterList:expenses).map((ele)=>{
                    return !ele.isDeleted && <EachExpense key={ele._id} {...ele} />
                })
            }
            </div>
        </div>
    )
}

export default withRouter(Expenses)