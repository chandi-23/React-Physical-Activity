import {createActivityData} from "../../Store/Actions/ActivityActions";
import { connect } from 'react-redux';
import { useState } from 'react';
import "./AdminDashboard.scss"

const AdminDashboard = (props) => {
  const [preferredValueUnit, setPreferredValueUnit] = useState('');
  const [preferredTimeUnit, setPreferredTimeUnit] = useState('');
  const [unitOptions, setUnitOptions] = useState('');
  const [activityId, setActivityId] = useState('');
  const [activityName, setActivityName] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any desired action with the form data
    const formData = {
        "preferredValueUnit":preferredValueUnit,
        "preferredTimeUnit":preferredTimeUnit,
        "unitOptions":unitOptions,
        "activityId":activityId,
        "name":activityName,
        "actionText": "flexy appeal"
  };
  console.log(formData)
  props.createActivityDataAction(formData)  

  };
    return (
        <>
        <form onSubmit={handleSubmit}>
       
        <h1>Admin dashboard</h1>
        <div className="container-activity">
        
        <fieldset>
        <legend><h3>Add an Acitivity</h3> </legend>
        <div className="form-item">
                <label htmlFor="activityId">ActivityId:</label>
                <input
                id="activityId"
                type="text"
                placeholder="ID"
                value={activityId}
                onChange={(event) => setActivityId(event.target.value)}
                autoFocus required/>
        </div>
        <div className="form-item">
                <label htmlFor="activityName">Activity Name:</label>
                <input
                id="activityName"
                type="text"
                placeholder="Name"
                value={activityName}
                onChange={(event) => setActivityName(event.target.value)}
                autoFocus required/>
        </div>
        </fieldset>
        <fieldset>
            <legend><h3>Units</h3></legend>
        <div className="form-item">
                <label htmlFor="preferredValueUnit">Value Unit:</label>
                <input
                id="preferredValueUnit"
                type="text"
                placeholder="ValueUnit"
                value={preferredValueUnit}
                onChange={(event) => setPreferredValueUnit(event.target.value)}
                autoFocus required/>
        </div>

        <div className="form-item">
                <label htmlFor="timeUnit">Time Unit:</label>
                <input
                id="timeUnit"
                type="text"
                placeholder="Time Unit"
                value={preferredTimeUnit}
                onChange={(event) => setPreferredTimeUnit(event.target.value)}
                autoFocus required/>
        </div>

        <div className="form-item">
                <label htmlFor="unitOptions">Measurement Units</label>
                <input
                id="unitOptions"
                type="text"
                placeholder="Units"
                value={unitOptions}
                onChange={(event) => setUnitOptions(event.target.value)}
                autoFocus required/>
        </div>
        </fieldset>
        <input type="submit" value="Add Activity" />
       
        </div>
        </form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUserDetails: state.Login.currentUserDetails
    }
  }

  const mapDisptchToProps = (dispatch) => {
    return {
        createActivityDataAction: (formData) => dispatch(createActivityData(formData)),

    }
  } 

export default connect(mapStateToProps, mapDisptchToProps)(AdminDashboard);

