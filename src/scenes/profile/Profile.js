import React,{Component,useState,useEffect} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import ProfileImage from '../../component/profileImage/ProfileImage';
import ErrorDisplay from '../../component/errorDisplay/ErrorDisplay';
import { observer,inject } from 'mobx-react';
import rootStores from '../../stores/Index';
import { ERROR_STORE } from '../../stores/Stores';
import CustomTextInput from '../../component/costumTextInput/CustomTextInput';
import { WHITE_COLOR } from '../../utils/localStorage/colors/Colors';
import AuthModule from '../../modules/AutModule';
import { getImage } from '../../utils/images/Images';
import CustomButton from '../../component/customButton/CustomButton';
import SCENCE_KEYS from '../scenesManager/SceneConsts';

const errorStore = rootStores[ERROR_STORE];
const YOUR_NAME_PLACEHOLDER = 'איך קוראים לך?';
const create_button_text = 'יצירת עובד';
const update_button_text = 'עדכון עובד';
const defaultImage = getImage('defaultProfile');

const Profile = observer (({navigation}) => {

    const [username,onUsernameChange] = useState('');
    const [profileImage,setProfileImage] = useState(defaultImage);
    const [profileImageExist,setImageProfileExist] = useState(false);
    const [userExist,setUserExist] = useState(false);
    const [iconName,setIconName] = useState('plus');

    useEffect(() => {
         async function getImageFromLocalStorge(){
             let image_response = await AuthModule.getImage();
             if(image_response){
                 setProfileImage(image_response);
                 setImageProfileExist(true)
                 setIconName('pencil');
             }
         }

         async function getUserIDFromLocalStorage(){
            let userID_response = await AuthModule.getUserID();
            if(userID_response) {
                setUserExist(true);
            }
         }

         async function getUsernameFromLocalStorage(){
             let username_response = await AuthModule.getUsername();
             if(username_response){
                onUsernameChange(username_response);
             }
         }
         
         getImageFromLocalStorge();
         getUserIDFromLocalStorage();
         getUsernameFromLocalStorage();
    },[profileImage,username]);
 
    function displayError (){
        const displayError = errorStore.getDisplayError;
        if(displayError){
            const errorMessage = errorStore.getErrorMessage;
            return (
                <View style={[styles.errorDisplayPosition]}>
                    <ErrorDisplay errorText={errorMessage}/>
                </View>
            )
        }
    }

    function saveImage (source){
        return AuthModule.saveImage(source)
            .then(() => {
                setIconName('pencil');
                setProfileImage(source);
            })
            .catch(err => {
                console.log("error with save image in Localstorage ",err);
            })
    }

    function validForm(){
        return username && username.length >= 2 && profileImage && profileImage !== defaultImage;
    }

    function onCustomButtonPressed(){
        return AuthModule.createOrUpdateWorker(username,profileImage)
            .then(res => {
                console.log("createWorker res ",res);
                if(res) {
                    navigation.navigate(SCENCE_KEYS.SERVICES)
                }
            })
            .catch(err => {
                console.log("error with create worker ",err);
            })
    }
    
    const buttonText = userExist ? update_button_text : create_button_text;
    const placeholder = userExist ? username : YOUR_NAME_PLACEHOLDER;
    return(
        <View style={styles.profileView}>
            <View style={[styles.profilePosition]}>
                <ProfileImage saveImage={saveImage} iconName={iconName} profileImage={profileImage} profileImageExist={profileImageExist}/>
            </View>
            <View style={{marginVertical:'40%'}}>
                <CustomTextInput placeholder={placeholder} onChangeText={text => onUsernameChange(text)}/>
            </View>
            <View style={[styles.buttonPosition]}>
                <CustomButton onPress={onCustomButtonPressed} disabled={!validForm()} buttonText={buttonText}/>
            </View>
            {displayError()}
        </View>
      )
})

export default Profile;


const styles = StyleSheet.create({
    profileView:{
        height:'100%',
        width:'100%',
        alignItems:'center',
        backgroundColor:WHITE_COLOR
    },
    buttonPosition:{
        position:'absolute',
        bottom:'5%'
    },
    profilePosition:{
        position:'absolute',
        top:-50,
        zIndex:20
    },
    errorDisplayPosition:{
        position:'absolute',
        bottom:'15%'
    }
})