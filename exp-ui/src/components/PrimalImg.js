import React from "react";
import pngegg from '../imgs/pngegg.png'
import moneyAll from '../imgs/moneyAll.png'
import calcMoney from '../imgs/calcMoney.png'
import handMoney from '../imgs/handMoney.png'
import moneyDashboard from '../imgs/moneyDashboard.png'

const PrimalImg = () => {

    return(
        <div style={{display:'flex',justifyContent: 'space-evenly'}}>
            <div className="card" style={{width:'47rem',borderColor:'white'}}>
            <img src={moneyDashboard} />
            </div>
        </div>
    )
}

export default PrimalImg