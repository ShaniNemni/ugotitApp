import React,{Component,useState,useEffect} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Platform} from 'react-native';
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
import { GradientHeader } from '../../component/customHeader/CustomHeader';

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
         AuthModule.getWorkerInfoFromLocalStorage()
            .then(res => {
                if(res && res.length > 0) {
                    // after creating user - 3 paramters will return. 
                    const username = res[0];
                    const userId = res[1]; // not in used
                    const profileImage = JSON.parse(res[2]);

                    //profile image
                    setProfileImage(profileImage);
                    setImageProfileExist(true);
                    setIconName('pencil');   

                    //user exist
                    setUserExist(true);

                    //set username
                    onUsernameChange(username);
                } 
            })
            .catch(err =>{
                console.log("error with worker info ",err);
            })

    },[]);
 
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
         setIconName('pencil');
         setProfileImage(source);
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
    const iconTypeByPlatform = Platform.OS === 'ios' ? "MaterialCommunityIcons" :  "Octicons";
    return(
        <View style={[styles.view]}>
            <GradientHeader navigation={navigation} scenceName={SCENCE_KEYS.PROFILE}/>
            <View style={styles.profileView}>
                <View style={[styles.profilePosition]}>
                    <ProfileImage saveImage={saveImage} iconType={iconTypeByPlatform} iconName={iconName} profileImage={profileImage} profileImageExist={profileImageExist}/>
                </View>
                <View style={{marginVertical:'40%'}}>
                    <CustomTextInput placeholder={placeholder} onChangeText={text => onUsernameChange(text)}/>
                </View>
                <View style={[styles.buttonPosition]}>
                    <CustomButton onPress={onCustomButtonPressed} disabled={!validForm()} buttonText={buttonText}/>
                </View>
                {displayError()}
            </View>
        </View>
      )
})

export default Profile;


const styles = StyleSheet.create({
    view:{
        height:'100%',
        width:'100%',
        backgroundColor:WHITE_COLOR
    },
    profileView:{
        height:'80%',
        alignItems:'center',
    },
    buttonPosition:{
        position:'absolute',
        bottom:'15%',
    },
    profilePosition:{
        position:'absolute',
        top:-80,
        zIndex:20
    },
    errorDisplayPosition:{
        position:'absolute',
        bottom:'28%',
    }
})