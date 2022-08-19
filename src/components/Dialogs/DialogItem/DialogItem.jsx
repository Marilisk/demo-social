import React from "react";
import { NavLink } from "react-router-dom";
import classes from './../Dialogs.module.css';

import defaultAvatar from './../../../images/default_Avatar.jpg';



const DialogItem = (props) => {
     let path = '/dialogs/' + props.id;
     return <div className={classes.dialog}>
         <NavLink to={path} ><img alt='' src={defaultAvatar}></img>{props.name}</NavLink>
     </div>
 }

 export default DialogItem;