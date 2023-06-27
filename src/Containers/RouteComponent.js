import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './Login/Login.js';
import SignUp from './SignUp/SignUp.js';
import ForgotPassword from './ForgotPassword/ForgotPassword.js';
import Header from '../components/Header/Header.js';
import Dashboard from './Dashboard/Dashboard.js';
import Journal from './Journal/Journal.js';
import UserProfile from './UserProfile/UserProfile.js';
import Events from './Events/Events.js';
import Weather from './Weather/Weather.js'
import Loader from './../components/Loader/Loader.js'
import {ProtectedRoute} from './ProtectedRoute.js';
import PopUpForm from './Activity/PopUpForm.js';
import GuestDashboard from '../components/GuestDashboard/GuestDashboard.js';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard.js';

//addding ProtectedRoute to enable only after login
const RoutesComponent = (props) => {
  const {currentUserDetails} = props
  const [userType, setUserType] = useState("")
  // const auth = localStorage.getItem("user");

  useEffect(() => {
    if(currentUserDetails && currentUserDetails.roles && currentUserDetails.roles.length > 0 && currentUserDetails.roles[0]==="admin") {
      setUserType("admin")
    } else if(currentUserDetails && currentUserDetails.roles && currentUserDetails.roles.length > 0 && currentUserDetails.roles[0]==="user") {
      setUserType("user")
    } else {
      setUserType("guest")
    }
  }, currentUserDetails && currentUserDetails.roles);

  console.log(userType, "sdjnfskjdnf")
  return (
    <Router>
      <Routes>
        <Route element = {<Header/>}>
        {userType === 'admin' && 
        <>
        <Route path="/" element = {<AdminDashboard/> }/>
        <Route path="/profile" element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>
          </>
        }
        
        {userType === "guest" && 
        <>
        <Route path="/" element = {<GuestDashboard/> }/> 
        <Route path="/events" element = {<Events/>} />
        <Route path="/loader" element = {<Loader/>} />
        <Route path="/weather" element = {<Weather/>} />
        </>
        }
        
         
  
        {userType === "user" &&
        <>
        <Route path="/" element = {<ProtectedRoute/>}>
          <Route path="/" element = {<Dashboard/> }/>
          </Route>

        <Route path="/journal" element = {<ProtectedRoute/>}>
          <Route path="/journal" element = {<Journal/>} />
        </Route>

        {/* <Route path="/events" element = {<ProtectedRoute/>}> */}
          <Route path="/events" element = {<Events/>} />
        {/* </Route> */}
        {/* <Route path="/weather" element = {<ProtectedRoute/>}> */}
          <Route path="/weather" element = {<Weather/>} />
        {/* </Route> */}
        {/* <Route path="/loader" element = {<ProtectedRoute/>}> */}
          <Route path="/loader" element = {<Loader/>} />
        {/* </Route> */}
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>
          </>
        }
          

          </Route>
          <Route path="/form" element = {<PopUpForm/>} />
          
        <Route path="/login" element = {<Login/>} />
        <Route path="/signup" element = {<SignUp/>} />
        <Route path="/forgot-password" element = {<ForgotPassword/>} />
      </Routes>
  </Router>
  )
}
const mapStateToProps = (state) => {
  return {
      currentUserDetails: state.Login.currentUserDetails
  }
}

export default connect(mapStateToProps, null)(RoutesComponent);


