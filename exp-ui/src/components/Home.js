import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {Button} from "react-bootstrap"

import { startGetBdgt } from "../actions/bdgtAction";
import { startGetCatgs } from "../actions/catgAction";
import { startGetExp } from "../actions/expAction";
import ExpenseForm from "./ExpenseForm";
import Expenses from "./Expenses";
import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";
import BdgtOverView from "./BdgtOverView";

const Home = (props) => {
    const [chartData,setChartData] = useState([])
    const [newExpTgl,setNewExpTgl] = useState(false)
    const [highest,setHighest] = useState({})

    const dispatch = useDispatch()
    
    useEffect(()=>{ 
        dispatch(startGetBdgt(props))
        dispatch(startGetExp(props))
        dispatch(startGetCatgs(props))
    },[])

    const budget = useSelector((store)=>{
        if(store.budget==={}){
            return `GO TO SETTINGS TO ADD YOUR FIRST BUDGET`
        }
        else if(store.budget===null){
            return `GO TO SETTINGS TO ADD YOUR FIRST BUDGET`
        }
        else{
            return store.budget.amount
        }
    })

    const expenses = useSelector((store)=>{
        return store.expenses
    })
    
    const catgs = useSelector((store)=>{
        return store.categories
    })

    const totExp = () => {
        if(expenses.length===0) return 0
        else{
            return expenses.filter(ele=>!ele.isDeleted).reduce((pv,nv)=>{
                return pv+nv.amount
            },0)
        }
    }

    const chartDataGen = () => {
        const catgNames = catgs.map((ele)=>ele.name)
        const catgWiseExp = catgs.map((ctg)=>{
            return expenses.filter((exp)=>{
                return exp.category===ctg._id
            })
        })
        const chartStats = catgNames.map((ctgName,i)=>{
            const result = catgWiseExp[i].reduce((pv,nv)=>{
                return pv+nv.amount
            },0)
            return {name:ctgName,totalExpense:result}
        })
        return chartStats
    }
    
    // let result
    useEffect(()=>{
        const result = chartDataGen().filter((ele)=>{
            return ele.totalExpense !== 0
        })
        const final = {
            labels: result.map((ele)=>ele.name),
            datasets:[{
                label: "uncategorized",
                data: result.map((ele)=>ele.totalExpense),
                backgroundColor:['#00ff00','#0066ff','#ffff1a','#d2a679','#cc33ff','red'],
                borderColor:"black",
                hoverBackgroundColor: "rgba(232,105,90,0.8)",
                borderWidth:0.5
            }],
        }
        setChartData(final)
        // console.log(result)
        const highestExpData = () => {
            let hgh=0, result
            chartDataGen().forEach((ele)=>{
                if(ele.totalExpense>hgh){ 
                    hgh=ele.totalExpense
                    result=ele
                }
            })
            setHighest(result)
        }
        highestExpData()
    },[expenses,catgs])

    

    return(
        <div>
            <br/>
            <div style={{display:'flex',justifyContent: 'space-evenly'}} >
            {
                (Object.keys(chartData).length>0&&(chartData.labels.length>0&&chartData.labels.length<=5)) && <div><PieGraph uData={chartData} /></div> 
            }
            {
                (Object.keys(chartData).length>0&&(chartData.labels.length>0&&chartData.labels.length>5)) && <div><BarGraph uData={chartData} /></div>
            }
            {
                (typeof(budget)===typeof(0)) && <div> <BdgtOverView totExp={totExp} budget={budget} /> </div>
            }
            </div>
            <hr/>
            <br/>

            <div style={{display:'flex',justifyContent: 'space-evenly'}}>
                <div className="card" style={{width: "18rem",borderColor:'black'}}>
                <div className="card-body">
                    <h6 className="card-title">Your total Budget</h6>
                    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <h4 className="card-text">INR {budget}</h4>
                    <span><a href="/settings" className="card-link">settings</a></span>
                </div>
                </div>

                <div className="card" style={{width: "18rem",borderColor:'black'}}>
                <div className="card-body">
                    <h6 className="card-title">Your total Expenses</h6>
                    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <h4 className="card-text">INR {totExp()}</h4>
                    <span style={{fontSize:'15px'}}><a href="/profile" className="card-link">expenses in trash</a> not included</span>
                </div>
                </div>
            
                {/* <div><b>Total Budget - {budget}</b></div> */}
                {/* <div><b>Total Expense - {totExp()} </b></div> */}
                {
                    (expenses.length > 0 && (typeof budget === typeof 0)) && (
                        (totExp())<(Math.round(budget/2))?
                        <div>
                            <div className="card" style={{width: "18rem",borderColor:'#006600'}}>
                            <div className="card-body">
                                <h6 className="card-title">Analysis</h6>
                                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                                <h5  style={{color:'#008000'}} className="card-text">Your budget vs total expenses stats look good</h5>
                                <span style={{fontSize:'15px'}}></span>
                            </div>
                            </div>
                        </div>:
                        <div>
                            <div className="card" style={{width: "18rem",borderColor:'#cc2900'}}>
                            <div className="card-body">
                                <h6 className="card-title">Analysis</h6>
                                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                                <h5 style={{color:'#cc2900'}} className="card-text">Your total expenses is nearing your budget!</h5>
                            </div>
                            </div>
                            {/* <b>Your total expenses is nearing your budget!</b> */}
                        </div>
                    )
                }
            </div>
            
            <br/>
            <hr/>
            <br/>
            <Button onClick={()=>setNewExpTgl(true)}>Add new expense</Button>
            {/* <button onClick={()=>setNewExpTgl(true)}>Add Expense</button> */}
            {
                newExpTgl && (
                    <div>
                        <ExpenseForm newExpTgl={newExpTgl} setNewExpTgl={setNewExpTgl} />
                        <Button variant="warning" onClick={()=>setNewExpTgl(false)}>cancel</Button>
                        {/* <button onClick={()=>setNewExpTgl(false)}>cancel</button> */}
                    </div>
                )
            }
            <br/><br/>

            <Expenses chartData={chartData} />
            
        </div>
    )
}

export default withRouter(Home)