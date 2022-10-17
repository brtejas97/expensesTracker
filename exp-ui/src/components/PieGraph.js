import React from "react";
import {Pie} from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"

const PieGraph = (props) => {
    const {uData} = props

    return(
        <div style={{width:"270px"}}>
            <h3>Your expenses distribution</h3>
            <Pie data={uData} />
            <br/>
        </div>
    )
}

export default PieGraph