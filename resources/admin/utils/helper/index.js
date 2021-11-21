import { useRoute } from "vue-router";

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

/**
 * @param routeName {string | Array}
 * @param namedRoute {boolean}
 * @return {boolean}
 */
export const isActiveRoute = (routeName, namedRoute = true) => {

    if (!routeName) return false;

    let route = useRoute();

    if (!namedRoute){
        return routeName instanceof String
        ? route.path === routeName
        : routeName.includes(route.path);
    }

    return routeName instanceof String
        ? routeName === route.name
        : routeName.includes(route.name);
};
