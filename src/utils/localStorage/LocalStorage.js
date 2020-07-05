import AsyncStorage from '@react-native-community/async-storage';

class LocalStorage{
    constructor(){}

    setItem = async (key,value) => {
        return AsyncStorage.setItem(key,value)
            .catch(err => {
                console.log("error with set item to local storage ",err);
                throw err;
            })
    }

    getItem = async (key,defaultValue) => {
        return AsyncStorage.getItem(key)
            .then(itemValue => {
                if(itemValue){
                    return itemValue;
                    //return JSON.parse(itemValue);
                }
                return defaultValue;
            })
            .catch(err => {
                console.log("Error to getItem from localstorage ",err);
                throw defaultValue;
            })
    }

    removeItem = async (key) => {
        return AsyncStorage.removeItem(key)
            .catch(err => {
                console.log("error with remove item from local storage ",err);
                throw err;   
            })
    }

}

export default new LocalStorage();
