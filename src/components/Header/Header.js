
import { Link, Outlet, useNavigate } from "react-router-dom";
import './Header.scss'
import AppLogo from "../../Assets/Images/fa-logo.svg"
import { Button, IconButton, Typography } from "@mui/material";
import { logout } from "../../Store/Actions/LoginAction";
import { connect } from "react-redux";
import Notifications from "@mui/icons-material/Notifications";
import { useState, useEffect } from "react";
import NotificationDialog from "../../Containers/NotificationDialog/NotificationDialog";
import EventNotificationContent from "../../Containers/NotificationDialog/EventNotificationContent";

const Header = (props) => {
  const {currentUserDetails} = props;
  const navigate = useNavigate();
  const [openNotif, setOpenNotif] = useState(false);
  const [userType, setUserType] = useState("")

  const signoutClick =async()=>{
    let res = await props.logout();
    if(res){
      navigate("/login");
    }
  }

  const LoginClick =()=> {
    navigate("/login");
  }

  const onClickOfNotififcation=()=>{
    setOpenNotif(true);
  }

  const handleNotificationClose =()=>{
    setOpenNotif(false);
  }

  useEffect(() => {
    if(currentUserDetails && currentUserDetails.roles && currentUserDetails.roles.length > 0 && currentUserDetails.roles[0]==="admin") {
      setUserType("admin")
    } else if(currentUserDetails && currentUserDetails.roles && currentUserDetails.roles.length > 0 && currentUserDetails.roles[0]==="user") {
      setUserType("user")
    } else {
      setUserType("guest")
    }
  }, currentUserDetails && currentUserDetails.roles);

  return (
    <div className="main-layout-container"> 
        <div className="header-wrapper">
          <div className="header-logo">
              <img alt="app-logo" src={AppLogo} />
          </div>
            <nav className="header-nav"> 
                <Typography paddingRight={2} color='secondary.light'><Link to="/">Dashboard</Link></Typography>
                
                {userType === "user"  && <Typography paddingRight={2} color='secondary.light'><Link to="/journal">Journal</Link></Typography>}
                {userType !== "admin" && <Typography paddingRight={2} color='secondary.light'><Link to="/events">Events</Link></Typography>}
                {userType !== "admin" && <Typography paddingRight={2} color='secondary.light'><Link to="/weather">Weather</Link></Typography>}
                {userType !== "guest" && <Typography color='secondary.light'><Link to="/profile">Profile</Link></Typography>}
                {userType === "user"  && <IconButton size={"large"} children ={<Notifications className="notifications-btn"/>} onClick={onClickOfNotififcation}/> }
                <Typography paddingRight={2} color='secondary.light'>
                  {userType !== "guest"  ? <Button  onClick={signoutClick} variant="outlined" size="small" className="signout-btn">Sign Out</Button> : 
                  <Button  onClick={LoginClick} variant="outlined" size="small" className="signout-btn">Login</Button>}
                  </Typography>
            </nav>
        </div>
        <NotificationDialog open={openNotif} handleClose={handleNotificationClose} content={<EventNotificationContent/>}/>
        <Outlet/>
    </div> 
  )
  
}

const mapStateToProps = (state) => {
  return {
      currentUserDetails: state.Login.currentUserDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logout : () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
