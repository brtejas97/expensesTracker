import React from "react";
import { Pie, Line, Bar, Doughnut, PolarArea } from "react-chartjs-2";
import {Charts as ChartsJS} from "chart.js/auto"

const BdgtOverView = (props) => {
    const {totExp,budget} = props
    const stats = {
        labels:['Total Expense','Budget'],
        datasets:[{
            label:"Budget vs Expenditure",
            labelColor:"red",
            data:[totExp(),budget],
            borderColor:"black",
            hoverBackgroundColor: "rgba(232,105,90,0.8)",
            backgroundColor:["#404040","#0099ff"],
            borderWidth:0.5
        }]
    }

    return(
        <div style={{width:'250px'}}>
            <h3>Your Budget Overview</h3>
            <Pie data={stats}/>
        </div>
    )
}

export default BdgtOverView