import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Link, withRouter } from "react-router-dom"

import Home from "./Home";
import Profile from "./Profile";
import Settings from "./Settings";
import Login from "../components/Login";
import ErrPage from "./ErrPage";

import { eraseToken } from "../actions/tokenAction";
import { startGetUserProfile } from "../actions/userProfileAction";

const NavComp = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetUserProfile())
    }, [])

    const userProfile = useSelector((store) => {
        return store.userProfile
    })

    const handleLogOut = () => {
        const cnf = window.confirm('sure want to logout?')
        if (cnf) dispatch(eraseToken())
    }

    return (
        <div>
            {
                userProfile.name && <div>
                    <h3>Hi, {userProfile.name}</h3>
                    {/* <div style={{width:'100px'}}> <a href="/" onClick={handleLogOut}> Logout </a> </div> */}
                    <hr />
                </div>
            }

            <nav class="navbar navbar-expand-lg bg-light" >
                <div style={{ backgroundColor: '#e6f0ff', margin: '1px' }} class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">

                            <a style={{ color: 'black', fontSize: '20px' }} class="nav-link" aria-current="page" href="/"><b><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-house" viewBox="0 0 19 19">
                                <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                            </svg>Home</b></a>

                            <a style={{ color: 'black', fontSize: '20px' }} class="nav-link" href="/profile"><b><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-person" viewBox="0 0 18 18">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>Profile</b></a>
                            <a style={{ color: 'black', fontSize: '20px' }} class="nav-link" href="/settings"><b><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-gear" viewBox="0 0 19 19">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                            </svg>Settings</b></a>
                            <a style={{ color: 'black', fontSize: '20px' }} class="nav-link" onClick={handleLogOut} href="" ><b><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</b></a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* <ul class="nav" style={{backgroundColor:'beige'}} >
                <li class="nav-item" href='#' > <Link class="nav-link" to='/'><b> Home </b></Link></li>
                <li class="nav-item" href='#' > <Link class="nav-link" to='/profile'><b> Profile </b></Link> </li>
                <li class="nav-item" href='#' > <Link class="nav-link" to='/settings'><b> Settings </b></Link> </li>
                <li class="nav-item" href='#' > <a class="nav-link" href="/" onClick={handleLogOut}><b> Logout </b></a> </li>
            </ul> */}

            <br />

            <Route path='/login' component={Login} exact={true} />
            <Route path='/' component={Home} exact={true} />
            <Route path='/profile' component={Profile} exact={true} />
            <Route path='/settings' component={Settings} exact={true} />
        </div>
    )
}

export default withRouter(NavComp)