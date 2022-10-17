import React,{useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { startGetCatgs, startAddCatg } from "../actions/catgAction";

import EachCatg from "./EachCatg";

const Categories = (props) => {
    const [newCatg,setNewCatg] = useState('')
    const dispatch = useDispatch()

    const categories = useSelector((store)=>{
        return store.categories
    })
    // console.log(categories)

    useEffect(()=>{
        dispatch(startGetCatgs(props))
    },[])

    const handleNewCatgChange = (e) => {
        setNewCatg(e.target.value)
    }

    const refreshForm = () => {
        setNewCatg('')
    }

    const handleNewCatgSubmit = (e) => {
        e.preventDefault()
        if(window.confirm(`want to add ${newCatg} as a category?`)){
            if(newCatg.length===0) alert('category field cannot be empty')
            else if(newCatg.trim()==='uncategorised'||newCatg.trim()==='UNCATEGORISED'||newCatg.trim()==='Uncategorised') alert('there is already an uncategorised category, cannot create a duplicate one')
            else{
                dispatch(startAddCatg({name:newCatg.trim()},refreshForm))
            }
        }
    }

    return(
        <div>
            <b>Add new category</b>
            <form onSubmit={handleNewCatgSubmit}>
                <input type="text" placeholder="add category" value={newCatg} onChange={handleNewCatgChange} /> &nbsp;&nbsp;
                <Button variant="success" onClick={handleNewCatgSubmit}>add category</Button>
            </form>
            <br/>
            <h4>Your categories - [{categories.length}]</h4>
            <div style={{height:'350px', overflowY:'scroll'}} >
            <ul>
                {
                    categories.map((ele)=>{
                        return <EachCatg key={ele._id} {...ele} />
                    })
                }
            </ul>
            </div>
            <br/>
            {/* <b>Add new category</b>
            <form onSubmit={handleNewCatgSubmit}>
                <input type="text" placeholder="add category" value={newCatg} onChange={handleNewCatgChange} /> &nbsp;&nbsp;
                <Button variant="success" onClick={handleNewCatgSubmit}>add category</Button>
            </form> */}
        </div>
    )
}

export default withRouter(Categories)