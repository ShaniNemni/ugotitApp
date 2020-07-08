import { observable, action,computed,toJS} from "mobx";

export default class ServiceStore {
    @observable
    serviceName = "" ;

    @observable
    selectedServiceDays = observable([]);

    @observable
    fromHour = undefined; 

    @observable
    toHour = undefined; 


    constructor(){}

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

}