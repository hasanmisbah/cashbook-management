import { useRoute } from "vue-router";

import { APP_TIME_ZONE,  APP_DATE_FORMAT, APP_TIME_FORMAT,  APP_DATE_AND_TIME_SEPARATOR } from '../constants'

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(APP_TIME_ZONE);


/**
 * @author Hasan Misbah
 * @param timeString
 * @param format {string}
 * @return {string | void}
 */
export const formatDate = (timeString, format = APP_DATE_FORMAT) => {

  if (!dayjs(timeString).isValid()) return;

  return dayjs(timeString).format(format);
};

/**
 * @author Hasan Misbah
 * @param timeString {string} date object
 * @param format {string}
 * @return {string | void}
 */
export const formatTime = (timeString, format = APP_TIME_FORMAT) => {

  if (!dayjs(timeString).isValid()) return;

  return dayjs(timeString).format(format);
};

/**
 * @author Hasan Misbah
 * @param timeString {string} date object
 * @param separator {string}
 * @return {string | void}
 */
export const formatDateTime = (timeString, separator = APP_DATE_AND_TIME_SEPARATOR) => {

  if (!dayjs(timeString).isValid()) return;

  const time = formatTime(timeString);
  const date = formatDate(timeString);

  return `${date} at ${time}`;
};

/**
 * @author Hasan Misbah
 * @param timeString | date object
 * @return {string | void}
 */
export const formatTimeAgo = (timeString) => {

  if (!dayjs(timeString).isValid()) return;

  return dayjs(timeString).fromNow();
};


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
