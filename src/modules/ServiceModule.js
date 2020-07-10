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
        // console.log("body ----- ",body);
        // return this.server.post(DELETE_SERVICE,body)
        //     .then(res => {
        //         console.log("deleteService ------ ",res);
        //         if(res && res.status === 200) {
        //             const serviceId = body.id;
                    return this.removeIdsFromLocalStorage(body.id)
                        .catch(err => {
                            console.log("error with delete services ",err);
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
                    storedIds = serviceId;
                }
                
                let stringifyIDs = JSON.stringify(storedIds);
                console.log("stringifyIDs ---- ",stringifyIDs);
                return LocalStorage.setItem(LOCAL_STORAGE_KEYS.SERVICES_IDS,stringifyIDs)
                    .catch(err => {
                        console.log("error with set IDs ",err);
                    })
            })  
    }

    setServiceIdsListToLocalStorage = (services) => {
        console.log("SET services ",services);
        let stringifyIDs = JSON.stringify(services);
        console.log("SET  stringifyIDs ",stringifyIDs);
        return LocalStorage.setItem(LOCAL_STORAGE_KEYS.SERVICES_IDS,stringifyIDs)
            .catch(err => {
                console.log("error with set services list ",err);
            })
    }


    removeIdsFromLocalStorage = (serviceId) => {
        return this.getServiceIdFromLocalStorage()
            .then(res => {
                const servicedIdsArray = res.split(",");
                let serviceConverted = undefined;
                const servicesFilter = servicedIdsArray.filter(service => {
                    serviceConverted = service.replace(/['"]+/g,"");
                    console.log("service ",service);
                    console.log("serviceConverted ",serviceConverted);
                    if(serviceId !== serviceConverted) {
                        return serviceConverted;
                    }
                    ["1,2"]
                })

                console.log("** servicesFilter ",servicesFilter);
                let stringifyIDs = JSON.stringify(servicesFilter);
                console.log("SET  stringifyIDs ",stringifyIDs);
                console.log("SET  stringifyIDs ",stringifyIDs);

        
                return false;
                // return this.setServiceIdsListToLocalStorage(JSservices)
                //     .then(() => {
                //         console.log("SET SERVICES ----- TRUE ")
                //         return true;
                //     })
                //     .catch(err => {
                //         console.log("error with setServiceIdsListToLocalStorage ",err);
                //         return false;
                //     })
            })
            .catch(err => {
                console.log("error with remove ids from local storage ",err);
                return false;
            })
    }

}


export default new ServiceModule();