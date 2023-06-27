import {HTTP} from '../../HTTP';
import {showLoaderAction, hideLoaderAction} from './LoaderAction.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ActivityActionTypes = {
    FETCH_ACTIVITY_STATS: 'FETCH_ACTIVITY_STATS',
    POST_ACTIVITY_STATS: 'POST_ACTIVITY_STATS',
    UPDATE_ACTIVITY_STATS: 'UPDATE_ACTIVITY_STATS'
}


export const getActivitiesForUser = (userDetails, initial=false) => {
    return async(dispatch, getState) => {
        let username = userDetails.userUUID;
        let headers =  HTTP.generateHeaders("application/json");
        try {
            const url = `https://node-final-project-j4jc.onrender.com:9000/useractivity/${username}`;
            const response = await HTTP.get(url, headers);
            dispatch(fetchActivityListComplete(response.data));
        } 
        catch(error){
                console.log("error in getActivityStatsForUser action :"+ error);
        } finally {
        }
        }
}

export const fetchActivityListComplete = (activities) =>{
    return {
        type: ActivityActionTypes.FETCH_ACTIVITY_STATS,
        payload: activities
    }
}

export const assignActivityToUser =(userActivity)=>{
    return async(dispatch, getState) => {
        try {
            const url = `https://node-final-project-j4jc.onrender.com:9000/users/${userActivity.userUUID}/useractivity`;
            const response = await HTTP.post(url, userActivity);
            dispatch(postActivityListComplete(response.data));
            return response.status===200;
        } 
        catch(error){
                console.log("error in assignActivityToUser action :"+ error);
        } finally {
            
        }
        }
}

export const postActivityListComplete = (activities) =>{
    return {
        type: ActivityActionTypes.POST_ACTIVITY_STATS,
        payload: activities
    }
}

export const updateUserActivity =(userActivity)=>{
    return async(dispatch, getState) => {
        try {
            const url = `https://node-final-project-j4jc.onrender.com:9000/users/${userActivity.userUUID}/useractivity/${userActivity.userActivityId}`;
            const response = await HTTP.put(url, userActivity);
            dispatch(fetchActivityListComplete(response.data));
        } 
        catch(error){
                console.log("error in updateUserActivity action :"+ error);
        } finally {
            
        }
        }
}

export const updateActivityListComplete = (activities) =>{
    return {
        type: ActivityActionTypes.UPDATE_ACTIVITY_STATS,
        payload: activities
    }
}

export const createActivityData =(activityData)=>{
    return async(dispatch, getState) => {
        console.log(activityData)
        
        try {
            const url = `https://node-final-project-j4jc.onrender.com:9000/activityMasterData`;
            const response = await HTTP.post(url, activityData);
            if(response.status===200){
                toast.success(`${activityData.name} activity has been created`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if(response.status===500){
                toast.error(`Your ${activityData.name} activity could not be added. Try again later`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            
            // dispatch(fetchActivityListComplete(response.data));
        } 
        catch(error){
                console.log("error in createActivityData action :"+ error);
        }
        }
}