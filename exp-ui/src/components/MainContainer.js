import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {withRouter } from "react-router-dom";
import Primal from "./Primal";
import { startGetBdgt } from "../actions/bdgtAction";
import { startGetCatgs } from "../actions/catgAction";
import { startGetExp } from "../actions/expAction";

import NavComp from "./NavComp";

const MainContainer = () => {
    // const dispatch = useDispatch()

    // useEffect(()=>{ 
    //     dispatch(startGetBdgt())
    //     dispatch(startGetExp())
    //     dispatch(startGetCatgs())
    // },[])

    const userToken = useSelector((store)=>{
        return store.token
    })
    
    return(
        <div>
            {
                userToken&&localStorage.getItem('token') ? <NavComp/> : <Primal/> 
            }
        </div>
    )
}

export default withRouter(MainContainer)