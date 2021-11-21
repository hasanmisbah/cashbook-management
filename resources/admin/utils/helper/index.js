
export const getFromLocalStorage = (key, decode = true) => {
    const value = localStorage.getItem(key);

    return decode
        ? JSON.parse(value)
        : value
        ;
};

export const pullFromLocalStorage = (key, decode = true) => {
    const value = getFromLocalStorage(key, decode);

    localStorage.removeItem(key);

    return value;
};

export const setToLocalStorage = (key, value, encode = true) => {
    const finalValue = encode
        ? JSON.stringify(value)
        : value
    ;

    localStorage.setItem(key, finalValue);

    return finalValue;
};

