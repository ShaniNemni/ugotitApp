import LocalStorage from "../utils/localStorage/LocalStorage";
import { LOCAL_STORAGE_KEYS } from "../utils/localStorage/LocalStorageKeys";
import Server from "../utils/server/Server";
import {CREATE_USER} from '../utils/server/urls';

class AuthModule {
    constructor(){
        this.server = Server;
    }

    createOrUpdateWorker = async (name,picture) => {
        const userID = await this.getUserID();
        let body = {name,picture};
        if(userID){
            body = {name,picture,id:userID};
        }

        return this.setWorker(body)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log("error with createOrUpdateWorker ",err);
                throw err;
            })
    }

    setWorker = (body) => {
        return this.server.post(CREATE_USER,body)
            .then(res => {
                if(res && res.status === 200){
                    const userID = res.data.id;
                    const username = body.name;
                    const imageProfile = body.picture;
                    return this.saveAllWorkerInfo(userID,username,imageProfile)
                        .then(res=> {
                            return res;
                        })
                        .catch(err => {
                            throw err;
                        })
                }

                return false;
            })
            .catch(err => {
                console.log("error with create worker ",err);
                throw err;
            })
    }

    saveAllWorkerInfo = (userId,username,imagePath) => {
        const userNameKey = LOCAL_STORAGE_KEYS.USERNAME;
        const userIDKey = LOCAL_STORAGE_KEYS.USER_ID;
        const imageKey = LOCAL_STORAGE_KEYS.PROFILE_IMAGE;

        const imagePathConvert= JSON.stringify(imagePath);

        const userNamePromise = LocalStorage.setItem(userNameKey,username); 
        const userIdPromise = LocalStorage.setItem(userIDKey,userId); 
        const imagePromise = LocalStorage.setItem(imageKey,imagePathConvert); 

        return Promise.all([userNamePromise,userIdPromise,imagePromise])
            .then(res => {
                if(res && res.length === 3){
                    return true;
                }

                return false;
            })
            .catch(err => {
                console.log("error with save all worker info ",err);
                throw err;
            })

    }

    getWorkerInfoFromLocalStorage = () => {
        const userNameKey = LOCAL_STORAGE_KEYS.USERNAME;
        const userIDKey = LOCAL_STORAGE_KEYS.USER_ID;
        const imageKey = LOCAL_STORAGE_KEYS.PROFILE_IMAGE;
        const defaultValue = undefined;

        const userNamePromise = LocalStorage.getItem(userNameKey,defaultValue); 
        const userIdPromise = LocalStorage.getItem(userIDKey,defaultValue); 
        const imagePromise = LocalStorage.getItem(imageKey,defaultValue); 

        return Promise.all([userNamePromise,userIdPromise,imagePromise])
            .then(results => {
                return results;
            })
            .catch(err => {
                console.log("error with get worker info ",err);
                throw err;
            })
    }

    removeWorkerDataFromLocalStorage = () => {
        const userNameKey = LOCAL_STORAGE_KEYS.USERNAME;
        const userIDKey = LOCAL_STORAGE_KEYS.USER_ID;
        const imageKey = LOCAL_STORAGE_KEYS.PROFILE_IMAGE;

        const usernamePromise = LocalStorage.removeItem(userNameKey);
        const useridPromise = LocalStorage.removeItem(userIDKey);
        const imagePromise = LocalStorage.removeItem(imageKey);

        return Promise.all([usernamePromise,useridPromise,imagePromise])
            .then(res => {
                if(res && res[0] && res[1] && res[2]){
                    return true;
                }
                return false;
            })
            .catch(err => {
                console.log("error with remove all worker info ",err);
                throw err;
            })


    }

    getUserID = () => {
        const userIDKey = LOCAL_STORAGE_KEYS.USER_ID;
        const deafultValue = undefined;
        return LocalStorage.getItem(userIDKey,deafultValue)
            .then(value => {
                return value;
            })
            .catch(err => {
                console.log("error with getUserID ",err);
            })
    }
}

export default new AuthModule();