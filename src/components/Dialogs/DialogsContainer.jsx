import { sendMessageActionCreator } from "../redux/dialogs-reducer.js";
import Dialogs from "./Dialogs.jsx";
import {connect} from 'react-redux';
import {withAuthRedirect} from './../../HOC/withAuthRedirect.js';
import { compose } from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageActionCreator(newMessageBody));
        },
    }
};
 
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
) (Dialogs);