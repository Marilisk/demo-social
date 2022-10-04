const validate = values => {
    const errors = {};
    if (!values.newMessageBody) {
        errors.newMessageBody = 'напишите хоть что-нибудь';
    } else if (values.newMessageBody.length > 30) {
        errors.newMessageBody = 'длина сообщения не может быть больше 30 символов';
    } 
    increaseHeight(Math.floor(values.newMessageBody.length / 50));
    return errors;
}