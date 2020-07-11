import { observable, action,computed,toJS} from "mobx";
import LocalStorage from '../utils/localStorage/LocalStorage';
import {LOCAL_STORAGE_KEYS} from '../utils/localStorage/LocalStorageKeys';
import ServiceModule from '../modules/ServiceModule';
export default class ServiceStore {
    @observable
    currentServiceId = undefined;

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

    clearAllServiceFields = () => {
        this.setCurrentServiceID(undefined);
        this.setServiceName("");
        this.setSelectedDays(observable([])); 
        this.setFromTime(undefined);
        this.setToTime(undefined);
    }

    setServiceToUpdate = (service) => {
        this.setCurrentServiceID(service.id);
        this.setServiceName(service.name);
        this.setSelectedDays(service.days); 
        this.setFromTime(service.from);
        this.setToTime(service.to);
    }

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
                servicesIdsRes = servicesIdsRes.split(",");
                const promises = servicesIdsRes.map(serviceId => {
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
            this.setLoading(false);
            this.setServices([]);
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
    setCurrentServiceID(serviceId) {
        this.currentServiceId = serviceId;
    }

    @computed
    get getCurrentServiceID(){
        return this.currentServiceId;
    }

    @action
    setServices(services) {
        this.services.replace(services)
    }

    @computed
    get getAllServices(){
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
       const to = this.getToTime;
       const days = this.getSelectedDays;   
       const userId = this.userID;   

       const bodyFrom = {worker:userId,from,days};
       const bodyTo = {worker:userId,to,days};

       //return true if overlap exist
       const checkFromOverlap = ServiceModule.checkServiceTimeExist(bodyFrom);
       const checkToOverlap = ServiceModule.checkServiceTimeExist(bodyTo);

       return Promise.all([checkFromOverlap,checkToOverlap])
            .then(res => {
                return res[0] && res[1];
            })
           .catch(() => {
               return false;
           })

    }

    createOrUpdateService() {
        let body = undefined;
        const from = this.getFromTime;
        const to = this.getToTime;
        const serviceName = this.getServiceName;
        const days = this.getSelectedDays; 
        const userId = this.userID;   
        const serviceId = this.getCurrentServiceID;
        const needToUpdate = serviceId !== undefined;
        if(serviceId) {
            body = {id:serviceId,worker:userId,name:serviceName,days,from,to};
        }else{
            body = {worker:userId,name:serviceName,days,from,to};
        }

        return ServiceModule.createOrUpdateService(body,needToUpdate)
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