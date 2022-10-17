import React from "react";

import Budget from "./Budget";
import Categories from "./Categories";

const Settings = () => {

    return(
        <div>
            <h2>Customise your preferences here</h2>
            <Budget/>
            <hr/>
            <Categories/>
        </div>
    )
}

export default Settings