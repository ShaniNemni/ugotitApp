import LocalStorage from "../utils/localStorage/LocalStorage";
import { LOCAL_STORAGE_KEYS } from "../utils/localStorage/LocalStorageKeys";
import Server from "../utils/server/Server";
import { CHECK_SERVICE_TIME_EXIST, CREATE_OR_UPDATE_SERVICE, GET_SERVICE } from "../utils/server/urls";

class ServiceModule {
    constructor(){
        this.server = Server;
    }

    checkServiceTimeExist = (body) => {
        return this.server.post(CHECK_SERVICE_TIME_EXIST,body)
            .then(res => {
                return res && res.data;
            })
            .catch(err => {
                console.log("error with checkServiceTimeExist ",err);
                throw err;
            })

    }

    createOrUpdateService = (body) => {
        return this.server.post(CREATE_OR_UPDATE_SERVICE,body)
            .then(res => {
                if(res && res.status === 200) {
                    const serviceId = res.data.id;
                    return this.setServiceIDToLocalStorage(serviceId)
                        .then(() => {
                            return true;
                        })
                        .catch(err=> {
                            console.log("error with set service id to localstorage ",err);
                            return false;
                        })
                }
            })
    }

    getServiceById = (body) => {
        return this.server.post(GET_SERVICE,body)
            .then(res => {
                if(res && res.status === 200) {
                    return res.data;
                }
                return [];
            })
            .catch(err => {
                console.log("error with get service by id",err);
                return [];
            })
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
                let storedIds;
                if(res && res.length > 0) {
                    storedIds = JSON.parse(res);
                    storedIds += `,${serviceId}`;
                    
                }else{
                    storedIds = `${serviceId}`;
                }
                
                let stringifyIDs = JSON.stringify(storedIds);
                return LocalStorage.setItem(LOCAL_STORAGE_KEYS.SERVICES_IDS,stringifyIDs)
                    .catch(err => {
                        console.log("error with set IDs ",err);
                    })
            })  
    }

}


export default new ServiceModule();