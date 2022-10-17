import React, {useEffect,useState} from "react";
import {Bar, Line, Pie, PolarArea} from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"

const BarGraph = (props) => {
    const {uData} = props

    return(
        <div style={{width:"470px"}}>
            <h3>Your expenses distribution</h3>
            <Bar data={uData} />
            <br/>
        </div>
    )
}

export default BarGraph