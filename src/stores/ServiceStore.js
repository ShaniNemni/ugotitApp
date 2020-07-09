import { observable, action,computed,toJS} from "mobx";
import LocalStorage from '../utils/localStorage/LocalStorage';
import {LOCAL_STORAGE_KEYS} from '../utils/localStorage/LocalStorageKeys';
import ServiceModule from '../modules/ServiceModule';
export default class ServiceStore {
    @observable
    serviceName = "" ;

    @observable
    selectedServiceDays = observable([]);

    @observable
    fromTime = undefined; 

    @observable
    toTime = undefined; 

    userID = undefined;
    
    //all services
    @observable
    services = observable([]);

    @observable
    loadingService = false;


    constructor(){}

    initServices = () => {
        this.setLoading(true);
        return this.getUserId()
            .then(userId => {
                this.setUserid(userId);
                this.getServices();
            })
            .catch(err => {
                console.log("error with get user id ",err);
                this.setLoading(false);
            })
    }

    getServices = () => {
        const userId = this.userID;
        return ServiceModule.getServiceIdFromLocalStorage()
        .then(servicesIdsRes => {
            let servicesObjects = [];
            if(servicesIdsRes && servicesIdsRes.length > 0){
                servicedIdsArray = servicesIdsRes.split(",");
                const promises = servicedIdsArray.map(serviceId => {
                    const convertedServicedId = serviceId.replace(/['"]+/g,"");
                    let body = {worker:userId,id:convertedServicedId};
                    return ServiceModule.getServiceById(body)
                        .then(serviceObject => {
                            servicesObjects.push(serviceObject);
                        })
                });

                return Promise.all(promises)
                    .then(() => {
                        this.setServices(servicesObjects);
                        this.setLoading(false);
                    })
                    .catch(err => {
                        console.log("error with promise all services id ",err);
                        this.setLoading(false);
                    })
            }
            //in case no services from local storage
            this.setLoading(false)
        })

    }

    //// set loading ////
    @action
    setLoading(loadingValue){
        this.loadingService = loadingValue;
    }

    @computed
    get getLoading(){
        return this.loadingService;
    }

    @action
    setServices(services) {
        this.services.replace(services)
    }

    @computed
    get getAllServices(){
        console.log("getAllServices this.services ",toJS(this.services))
        return toJS(this.services);
    }

    //// service name ////
    @action
    setServiceName(serviceName) {
        this.serviceName = serviceName;
    }

    @computed
    get getServiceName(){
        return this.serviceName;
    }

    //// selected days ////
    @action
    setSelectedDays(serviceDays){
        this.selectedServiceDays.replace(serviceDays);
        console.log("this.selectedServiceDays ",toJS(this.selectedServiceDays));
    }

    @computed
    get getSelectedDays(){
        return toJS(this.selectedServiceDays);
    }

    //// from time ////
    @action
    setFromTime(fromTime){
        this.fromTime = fromTime;
    }

    @computed
    get getFromTime(){
        return this.fromTime;
    }

    //// to time ////
    @action
    setToTime(toTime){
        this.toTime = toTime;
    }

    @computed
    get getToTime(){
        return this.toTime;
    }

    setUserid = (userID) => {
        this.userID = userID;
    }

    // get userId //
    getUserId = () => {
        const userIdKey = LOCAL_STORAGE_KEYS.USER_ID;
        const defaultValue = undefined;

        return LocalStorage.getItem(userIdKey,defaultValue)
            .catch(err => {
                console.log("error with get user id ",err);
            })
    }

   //// check if exist service in selected time ////
    checkServiceExist() {
       const from = this.getFromTime;
       const days = this.getSelectedDays;   
       const userId = this.userID;   

       const body = {worker:userId,from,days};
       return ServiceModule.checkServiceTimeExist(body)
           .then(res => {
               console.log("checkServiceTimeExist res ",res);
               return res;
           })
           .catch(() => {
               return false;
           })

    }

    createService() {
        const from = this.getFromTime;
        const to = this.getToTime;
        const serviceName = this.getServiceName;
        const days = this.getSelectedDays; 
        const userId = this.userID;    

        const body = {worker:userId,name:serviceName,days,from,to};
        console.log("BODY ---- ",body);
        return ServiceModule.createOrUpdateService(body)
            .then(res => {
                if(res) {
                 return this.getServices()
                     .then(() => {
                        return true;
                     })
                     .catch(err => {
                        console.log("error with get services ",err);
                        return false;
                     })
                }
                return res;
            })
            .catch(err => {
                console.log("error with create service ",err);
                throw false;
            })
    }


    deleteService(serviceId){
        const userId = this.userID;
        const body = {worker:userId,id:serviceId}

        return ServiceModule.deleteService(body)
            .then(res => {
                console.log("res deleteService ",res);
                if(res) {
                    return this.getServices()
                        .catch(err => {
                            console.log(" error with getServices ",err)
                        })
                }
                return res;
            })
            .catch(err => {
                console.log("error with delete service ",err);
                throw err;
            })
    }



}