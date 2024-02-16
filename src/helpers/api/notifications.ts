import { APICore } from "./apiCore";

const api = new APICore();

function getNotificationsApi (){
    const baseUrl = "/getNotification";
    return api.get(`${baseUrl}`, {});
}

export {getNotificationsApi}