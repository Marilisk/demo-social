import React from "react";
import c from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem.jsx';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Dialogs = () => {
    const dialogsPage = useSelector(state => state.dialogsPage);
    const [msgs, showMyMsgs] = useState(dialogsPage.dialogsData[0]);
    const [activeItem, changeActiveItem] = useState(0);
    const showAnotherMsgs = (userId, i) => {
        let dialog = dialogsPage.dialogsData[i];
        changeActiveItem(i);
        showMyMsgs(dialog);
    }
    let dialogsElements = dialogsPage.dialogsData.map((elem, i) => {
        return <div onClick={() => showAnotherMsgs(elem.userId, i)} 
            key={elem.userId}
            className={ i === activeItem ? c.active : c.name} >
                {elem.name}
        </div>
    })

    return <div className={c.dialogs}>

        <div className={c.dialogsItems}>
            <h2 className={c.header}>Сообщения</h2>
            {dialogsElements}
        </div>

        <div className={c.dialogsItems}>
            <DialogItem msgs={msgs} />
        </div>

    </div>

}

export default Dialogs;