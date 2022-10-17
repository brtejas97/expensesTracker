import React, {useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { startGetUserProfile, startUpdateProfile } from "../actions/userProfileAction";
import DeletedList from "./DeletedList"

const Profile = (props) => {
    const userProfile = useSelector((store)=>{
        return store.userProfile
    })
    console.log(userProfile)

    const [trashTgl,setTrashTgl] = useState(false)
    const [name,setName] = useState(userProfile.name ? userProfile.name : '')
    const [salary,setSalary] = useState(userProfile.salary ? userProfile.salary : '')
    const [occupation,setOccupation] = useState(userProfile.occupation ? userProfile.occupation : '')
    const [formTgl,setFormTgl] = useState(false)
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetUserProfile(props))
    },[])

    const handleChange = (e) => {
        const attr = e.target.name
        const value = e.target.value
        if(attr==='name') setName(value)
        else if(attr==='occupation') setOccupation(value)
        else if(attr==='salary') setSalary(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const profileForm = {
            name:name,
            occupation:occupation,
            salary:Number(salary)
        }
        // console.log(profileForm)
        const refreshForm = () => {
            setName('')
            setOccupation('')
            setSalary('')
            setFormTgl(false)
        }
        if(name.length===0||occupation.length===0||salary.length===0){
            if(window.confirm('Some fields are not filled, still submit?')){
                dispatch(startUpdateProfile(profileForm,refreshForm,props))
            }
        }else{
            if(window.confirm('Update profile?')){
                dispatch(startUpdateProfile(profileForm,refreshForm,props))
            }
        }
    }

    const theForm = <div>
        <form onSubmit={handleSubmit}>
            <label>Name: </label>&nbsp;&nbsp;
            <input type="text" name="name" placeholder="your name.." value={name} onChange={handleChange} /><br/><br/>
            <label>Occupation: </label>&nbsp;&nbsp;
            <input type="text" name="occupation" placeholder="your occupation.." value={occupation} onChange={handleChange} /><br/><br/>
            <label>Salary: </label>&nbsp;&nbsp;
            <input type="number" name="salary" placeholder="your salary.." value={salary} onChange={handleChange} /><br/><br/>
            <Button type="submit" variant="info">Update</Button>&nbsp;&nbsp;
            <Button variant="warning" onClick={()=>setFormTgl(false)}>Cancel</Button>
        </form>
    </div>

    return (
        <div>
            <h3>Profile</h3>
            <br/>
            <h6>Email - {userProfile.email}</h6>
            <br/>
            {
                userProfile.name && <h4>Name: {userProfile.name}</h4>
            }
            {
                userProfile.occupation && <h4>Occupation: {userProfile.occupation}</h4>
            }
            {
                userProfile.salary && <h4>Salary: {userProfile.salary}</h4>
            }
            <br/>
            <Button onClick={()=>setFormTgl(true)}>Update profile</Button>
            <br/>
            <br/>
            {
                formTgl && theForm
            }
            <hr/>
            <Button onClick={()=>setTrashTgl(true)} >Expenses in trash</Button>
            <br/><br/>
            {
                trashTgl && <DeletedList setTrashTgl={setTrashTgl} />
            }
        </div>
    )
}

export default withRouter(Profile)