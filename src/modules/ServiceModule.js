import LocalStorage from "../utils/localStorage/LocalStorage";
import { LOCAL_STORAGE_KEYS } from "../utils/localStorage/LocalStorageKeys";
import Server from "../utils/server/Server";
import { CHECK_SERVICE_TIME_EXIST, CREATE_OR_UPDATE_SERVICE, GET_SERVICE, DELETE_SERVICE } from "../utils/server/urls";

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

    createOrUpdateService = (body,needToUpdate) => {
        return this.server.post(CREATE_OR_UPDATE_SERVICE,body)
            .then(res => {
                if(res && res.status === 200) {
                    const serviceId = res.data.id; 
                    if(!needToUpdate){
                        return this.setServiceIDToLocalStorage(serviceId)
                            .then(() => {
                                return true;
                            })
                            .catch(err=> {
                                console.log("error with set service id to localstorage ",err);
                                throw false;
                            })
                    }
                    return true;
                }
            })
            .catch(err => {
                console.log("error with createOrUpdateService ",err);
                throw err;
            })
    }

    deleteService = (body) => {
         return this.server.post(DELETE_SERVICE,body)
            .then(res => {
                if(res && res.status === 200) {
                    const serviceId = body.id;
                    return this.removeIdsFromLocalStorage(serviceId)
                        .catch(err => {
                            console.log("error with delete services ",err);
                        })
            
         }})
         .catch(err => {
             console.log("error with delete service ",err);
             throw err;
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
                let storedIds = undefined;
                if(res && res.length > 0) {
                    storedIds = JSON.parse(res);
                    storedIds.push(serviceId);
                }else{
                    storedIds = [serviceId];
                }

                let stringifyIDs = JSON.stringify(storedIds)
                return LocalStorage.setItem(LOCAL_STORAGE_KEYS.SERVICES_IDS,stringifyIDs)
                    .catch(err => {
                        console.log("error with set IDs ",err);
                    })

            })
    }

    removeIdsFromLocalStorage = (serviceId) => {
        return this.getServiceIdFromLocalStorage()
            .then(res => {
                const servicedIdsArrayParsed = JSON.parse(res);
                const servicesFilter = servicedIdsArrayParsed.filter(serviceElementID => serviceElementID !== serviceId);
                const stringifyIDs = JSON.stringify(servicesFilter);

                return LocalStorage.setItem(LOCAL_STORAGE_KEYS.SERVICES_IDS,stringifyIDs)
                    .then(() => {
                        return true;
                    })
                    .catch(err => {
                        console.log("error with setServiceIdsListToLocalStorage ",err);
                        return false;
                    })
            })
            .catch(err => {
                console.log("error with get service ids from local storage ",err);
                return false;
            })
    }

}


export default new ServiceModule();