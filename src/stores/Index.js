import ErrorStore from './ErrorStore';
import { ERROR_STORE } from './Stores';

const errorStore = new ErrorStore();

const rootStores = {
    [ERROR_STORE]:errorStore 
}

export default rootStores;