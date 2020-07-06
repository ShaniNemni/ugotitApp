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
                    this.saveImage(body.picture);
                    this.saveUsername(body.name);
                    this.saveUserId(userID);
                }

                return res && res.status === 200;
            })
            .catch(err => {
                console.log("error with create worker ",err);
                throw err;
            })
    }

    saveUsername = async (username) => {
        const usernameKey = LOCAL_STORAGE_KEYS.USERNAME;
        return this.saveToLocalStorage(usernameKey,username)
            .catch(err => {
                console.log("error with save username ",err);
            })
    }

    saveUserId = async (userId) => {
        const userIdKey = LOCAL_STORAGE_KEYS.USER_ID;
        return this.saveToLocalStorage(userIdKey,userId)
            .catch(err => {
                console.log("error with save userID ",err);
            })
    }

    saveImage = async (imagePath) => {
        const imageKey = LOCAL_STORAGE_KEYS.PROFILE_IMAGE;
        const convertImagePath = JSON.stringify(imagePath);
        return this.saveToLocalStorage(imageKey,convertImagePath)
            .catch(err => {
                console.log("error with save image ",err);
            })
    }

    saveToLocalStorage = (key,value) => {
        return LocalStorage.setItem(key,value)
            .catch(err => {
                console.log("error with saveToLocalStorage ",err);
            })
    }

    getFromLocalStorage = async (key,deafultValue) => {
        return LocalStorage.getItem(key,deafultValue)
            .then(value => {
                return value;
            })
            .catch(err => {
                console.log("error with getFromLocalStorage ",err);
            })
    }

    getUsername = async () => {
        const userNameKey = LOCAL_STORAGE_KEYS.USERNAME;
        const deafultValue = undefined;
        return this.getFromLocalStorage(userNameKey,deafultValue)
            .catch(err => {
                console.log("error with getUsername ",err);
            })
    }


    getUserID = async () => {
        const userIDKey = LOCAL_STORAGE_KEYS.USER_ID;
        const deafultValue = undefined;
        return this.getFromLocalStorage(userIDKey,deafultValue)
            .catch(err => {
                console.log("error with getUserID ",err);
            })
    }

    
    getImage = async () => {
        const imageKey = LOCAL_STORAGE_KEYS.PROFILE_IMAGE;
        const deafultValue = undefined;
        return this.getFromLocalStorage(imageKey,deafultValue)
            .then(imagePath => {
                imagePathParse = JSON.parse(imagePath)
                return imagePathParse;
            })
            .catch(err => {
                console.log("error with getImage ",err);
            })
    }
}

export default new AuthModule();