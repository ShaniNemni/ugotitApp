import LocalStorage from "../utils/localStorage/LocalStorage";
import { LOCAL_STORAGE_KEYS } from "../utils/localStorage/LocalStorageKeys";
import Server from "../utils/server/Server";
import {CREATE_USER} from '../utils/server/urls';

class ServiceModule {
    constructor(){
        this.server = Server;
    }

    getServiceIdFromLocalStorage = () => {
        const serviceIdKey = LOCAL_STORAGE_KEYS.SERVICES_IDS;
        const deafultValue = undefined;

        return LocalStorage.getItem(serviceIdKey,deafultValue)
            .then(value => {
                return value;
            })
            .catch(err => {
                console.log("error with getServiceIdFromLocalStorage ",err);
            })
    }

    setServiceIDToLocalStorage = (serviceId) => {
        return this.getServiceIdFromLocalStorage()
            .then(res => {
                console.log("res ",res);
                if(res) {
                    let storedIds = JSON.parse(res);
                    storedIds.push(serviceId)
                    console.log("storedIds ",storedIds);
                }else{

                }
            })  
    }

}


export default new ServiceModule();