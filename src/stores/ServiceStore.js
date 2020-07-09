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
        return this.getUserId()
            .then(userId => {
                console.log("userID constatcor ",userId);
                this.setUserid(userId);
                this.getServices();
            })
            .catch(err => {
                console.log("error with get user id ",err);
            })
    }

    getServices = () => {
        const userId = this.userID;
        return ServiceModule.getServiceIdFromLocalStorage()
        .then(servicesIdsRes => {
            if(servicesIdsRes && servicesIdsRes.length > 0){
                servicedIdsArray = servicesIdsRes.split(",");
                const promises = servicedIdsArray.map(serviceId => {
                    const convertedServicedId = serviceId.replace('"',"");
                    let body = {worker:userId,id:convertedServicedId};
                    return ServiceModule.getServiceById(body)
                        .then(serviceObject => {
                            this.setServices(serviceObject);
                        })
                });

                return Promise.all(promises)
                    .catch(err => {
                        console.log("error with promise all services id ",err);
                    })

            }
        })

    }

    //// set loading ////
    @action
    setLoading(loadingValue){
        console.log("setLoading loadingValue ",loadingValue);
        this.loadingService = loadingValue;
    }

    @computed
    get getLoading(){
        return this.loadingService;
    }

    //// set services ////
    @action
    setServices(service) {
        this.services.push(service);
        console.log("this.services ",toJS(this.services))
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
                console.log("ressssss create service ",res);
            })
            .catch(err => {
                console.log("error with create service ",err);
            })
        
    }



}