export const required = value => {
    if (value) return undefined;
    return 'поле обязательно для заполнения'; 
};

export const maxLengthCreator = (maxSymbols) => {
    return function maxLength(value) {
        if (value && value.length > maxSymbols) return `Maximum length is ${maxSymbols} symbols`;
        return undefined;
    }
}

