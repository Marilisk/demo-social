import React, { useRef } from "react";
import c from './../Dialogs.module.css';
import defaultAvatar from './../../../images/default_Avatar.jpg';
import { MessageForm } from "../AddMessageForm/messageForm";
import { useEffect } from "react";

const DialogItem = ({ msgs }) => {
    let msgElements = msgs.messages.map(elem => <div key={elem.id}
        className={elem.authorId === 0 ? c.authorMessage : c.message}>
        {elem.body}
    </div>
    ).reverse();

    const dialog = useRef(null);
    useEffect( () => {
        console.log('dialog useeffect');
        dialog.current.scrollIntoView();
    }, [msgs.messages.length])
    
    return <div>
        <div className={c.dialog}>
            {msgElements}
            <div className={c.scrollRef} ref={dialog}>{/* last Element */}</div>
        </div>
        <MessageForm userId={msgs.userId} />
    </div>
}

export default DialogItem;