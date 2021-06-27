import * as PNotifyMobile from '@pnotify/mobile/';
import * as PNotifyCountdown from '@pnotify/countdown';
import { alert, defaultModules } from '@pnotify/core';
defaultModules.set(PNotifyMobile, {});
export default {
    toMachResults: {
        type: 'error',
        title: 'Too many matches found.',
        text: 'Please enter specific query!',
        delay: 2000,
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {}]
        ])
    },
    noResult: {
        type: 'error',
        title: 'No matches found.',
        text: 'Please enter different query!',
        delay: 2000,
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },
    successResult: {
        type: 'success',
        title: 'Country found.',
        delay: 2000,
        // text: 'Please enter different query!',
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },
    coupleResults: {
        type: 'notice',
        title: 'Found more than one country.',
        text: 'Choose country you are searching for!',
        delay: 3000,
        // text: 'Please enter different query!',
        modules: new Map([
            ...defaultModules,
            [PNotifyCountdown, {

            }]
        ])
    },
};