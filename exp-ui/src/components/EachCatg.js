import React, {useState} from "react";
import { Button } from "react-bootstrap";
import {useDispatch} from "react-redux"
import { withRouter } from "react-router-dom";

import { startDeleteCatg, startUpdCatg } from "../actions/catgAction";

const EachCatg = (props) => {
    const {_id,name, updatedAt} = props

    const [updTgl,setUpdTgl] = useState(false)
    const [catgUpdEntry,setCatgUpdEntry] = useState(name)

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setCatgUpdEntry(e.target.value)
    }

    const handleDelete = () => {
        if(window.confirm(`are you sure you want to delete '${name}' category? by doing this all expenses in '${name}' will be moved to 'uncategorised' `)){
            dispatch(startDeleteCatg(_id,props))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(catgUpdEntry.trim().length==0){
            alert('update catg field is empty')
        }
        else {
            const body = {
                name: catgUpdEntry
            }
            const refresh = () => {
                setUpdTgl(false)
                setCatgUpdEntry('')
            }
            dispatch(startUpdCatg(body,_id,refresh))
        }
    }

    return (
        <div>
            {
                updTgl ? (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={catgUpdEntry} onChange={handleChange} />
                            &nbsp;&nbsp;
                            <Button variant="success">save update</Button>
                            &nbsp;&nbsp;
                            <Button variant="warning" onClick={()=>setUpdTgl(false)} >cancel update</Button>
                        </form>
                        
                    </div>
                ) : (
                    <div>
                        <span>Name: </span><b>{name}</b> &nbsp;&nbsp;
                        <span>Last updated on: </span><b>{updatedAt.slice(0,10)}</b> &nbsp;&nbsp;
                        {name!=='uncategorised'&&<Button variant="info" onClick={()=>setUpdTgl(true)}>update category</Button>} &nbsp;&nbsp;
                        {name!=='uncategorised'&&<Button variant="warning" onClick={handleDelete}>delete category</Button>} &nbsp;&nbsp;
                    </div>
                )
            }
            <hr/>
        </div>
    )
}

export default withRouter(EachCatg)