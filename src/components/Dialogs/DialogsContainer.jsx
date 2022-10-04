import Dialogs from "./Dialogs.jsx";
import {withAuthRedirect} from './../../HOC/withAuthRedirect.js';


const DialogsContainer = ({isAuth}) => {

    return withAuthRedirect(Dialogs, isAuth);
}


export default DialogsContainer;