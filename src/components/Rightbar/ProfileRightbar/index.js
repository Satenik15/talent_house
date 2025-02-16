import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import {  FaMinus } from "react-icons/fa";
import {connect} from "react-redux";
import axios from 'axios';
import { GoRuby, GoCheck } from "react-icons/go";
import {followActionCreator, unfollowActionCreator, setUsersActionCreator} from '../../../_reducers/userReducer';

const GITHUB_USERS_API_URL = 'https://api.github.com/users';

const ProfileRightbar = (props) => {
    console.log('ProfileRightbar props', props);

    useEffect(()=>{
        axios.request(GITHUB_USERS_API_URL).then((response) => {
            console.log("users", response.data);
            
            props.setUser(response.data);
        }).catch(function (error) {
            console.error(error);

        });
    },[]);

    return(
        <div className ={styles.jobsContainer}>
                    <img className ={styles.followersImg} src = "/logo512.png" alt="followers" />
                    <span className ={styles.followerText}>
                    <GoRuby className = {styles.github}/> <b>{props.users.length}</b> Followers
                    </span>
                    <div className = {styles.jobsWrapper}>
                <ul calassName = {styles.jobsList}>
                    {props.users.map(user => {
                    return (
                    <li key = {user.id}
                    className = {styles.companyDetails}>
                        <div className = {styles.companyLogoContainer}>
                        <img className = {styles.companyLogo} src ={user.avatar_url} alt = "user"/>
                        </div>
                        <a href ={user.html_url} target="_blank" rel="noreferrer">
                        <div className = {styles.companyDesc}>
                        <h4 className = {styles.companyName}>{user.login}</h4>
                        <span className = {styles.position}></span>
                        </div>
                        </a>
                        <div className = {styles.follow}>
                        {user.follow 
                        ? (<span onClick = {() => (props.unfollow(user.id))}> <GoCheck /> </span>)
                        : (<span onClick = {() => (props.follow(user.id))}> <FaMinus /> </span>) }
                        </div>
                    </li>)})}
                </ul>
            </div>
            <div className={styles.containerBtn}>
                <button className = {styles.rightbarButton}>Show more</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowActionCreator(userId))
        },
        setUser: (users) => {
            dispatch(setUsersActionCreator(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRightbar);