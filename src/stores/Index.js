import ErrorStore from './ErrorStore';
import ServiceStore from './ServiceStore';

import { ERROR_STORE ,SERVICE_STORE} from './Stores';

const errorStore = new ErrorStore();
const serviceStore = new ServiceStore();

const rootStores = {
    [ERROR_STORE]:errorStore ,
    [SERVICE_STORE]:serviceStore
}

export default rootStores;