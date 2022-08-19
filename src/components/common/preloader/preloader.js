import React from 'react';
import preloader from './../../../images/loading_icon.gif';
import classes from './preloader.module.css';

let Preloader = (props) => {
    return <div className={classes.preloaderWrapper}>
        <img className={classes.preloader} alt='' src={preloader} />
    </div>

}

export default Preloader;