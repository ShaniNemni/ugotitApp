import { observable, action,computed} from "mobx";
import { act } from "react-test-renderer";

export default class ErrorStore {
    @observable
    errorMessage;

    @observable
    displayError;

    constructor(){
        this.errorMessage = '';
        this.displayError = '';
    }

    //// error message text ////
    @action
    setErrorMessage(errorMessage) {
        this.errorMessage = errorMessage;
    }

    @computed
    get getErrorMessage(){
        return this.errorMessage;
    }

    //// error display ////
    @action
    setDisplayError(displayError){
        this.displayError = displayError;
    }

    @computed
    get getDisplayError(){
        return this.displayError;
    }

}