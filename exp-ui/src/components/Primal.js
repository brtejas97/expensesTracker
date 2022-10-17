import React from "react";
import {Link,Route,withRouter} from "react-router-dom"
import {Button} from "react-bootstrap"

import Login from "./Login";
import Register from "./Register";

const Primal = () => {

    return (
        <div>
            <h3>Hello user!</h3>
            <h4>Login to your account to track your expenses</h4>
            <h4>If you don't have one, create NOW</h4>
            <hr/>
            {/* <button>
                <Link to='/login' >Login</Link>
            </button> */}
            <Button variant="primary" href="/login" >Login
                {/* <Link to='/login' >Login</Link> */}
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="primary" href="/register" >Register
                {/* <Link to='/register' ></Link> */}
            </Button>
            {/* <button>
                <Link to='/register' >Register</Link>
            </button> */}
            {/* <hr/> */}

            <Route path='/login' component={Login} exact={true} />
            <Route path='/register' component={Register} exact={true} />
            {/* <hr/> */}
        </div>
    )
}

export default withRouter(Primal)