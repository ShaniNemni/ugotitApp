import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Platform,Image} from 'react-native';
import ProfileImage from '../../component/profileImage/ProfileImage';
import ErrorDisplay from '../../component/errorDisplay/ErrorDisplay';
import { observer } from 'mobx-react';
import rootStores from '../../stores/Index';
import { ERROR_STORE, SERVICE_STORE } from '../../stores/Stores';
import CustomTextInput from '../../component/costumTextInput/CustomTextInput';
import { WHITE_COLOR } from '../../utils/localStorage/colors/Colors';
import AuthModule from '../../modules/AutModule';
import { getImage } from '../../utils/images/Images';
import CustomButton from '../../component/customButton/CustomButton';
import SCENCE_KEYS from '../scenesManager/SceneConsts';
import { GradientHeader } from '../../component/customHeader/CustomHeader';

//STORES
const errorStore = rootStores[ERROR_STORE];
const serviceStore = rootStores[SERVICE_STORE];
//TITLE CONSTS
const YOUR_NAME_PLACEHOLDER = 'איך קוראים לך?';
const create_button_text = 'יצירת עובד';
const update_button_text = 'עדכון עובד';
//IMAGES
const defaultImage = getImage('defaultProfile');
const loadingGif = getImage('loading');

const Profile = observer (({navigation}) => {

    const [username,onUsernameChange] = useState('');
    const [profileImage,setProfileImage] = useState(defaultImage);
    const [profileImageExist,setImageProfileExist] = useState(false);
    const [userExist,setUserExist] = useState(false);
    const [iconName,setIconName] = useState('plus');
    const [loading,setLoading] = useState(false);
    
    useEffect(() => {
         AuthModule.getWorkerInfoFromLocalStorage()
            .then(res => {
                if(res && res.length > 0) {
                    // after creating user - 3 paramters will return. 
                    const username = res[0] ? res[0] : undefined;
                    const userId = res[1] ? res[1] : undefined; 
                    const profileImage = res[2] ? JSON.parse(res[2]) : undefined;

                    //profile image
                    if(profileImage) {
                        setProfileImage(profileImage);
                        setImageProfileExist(true);
                        setIconName('pencil');   
                    }

                    //user exist
                    if(userId) {
                        setUserExist(true);
                    }

                    //set username
                    if(username) {
                        onUsernameChange(username);
                    }
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

    function renderLoading(){
        if(loading) {
            return(
                <View style={{position:'absolute',top:'30%',alignContent:'center'}}>
                    <Image source={loadingGif} style={{resizeMode:'center',width:100,height:100}} />
                </View>
            )
        }
        
    }

    function saveImage (source){
         setIconName('pencil');
         setProfileImage(source);
         setImageProfileExist(true);
         setLoading(false);
    }

    function validForm(){
        return username && username.length >= 2 && profileImage && profileImage !== defaultImage;
    }

    function onCustomButtonPressed(){
        setLoading(true);
        return AuthModule.createOrUpdateWorker(username,profileImage)
            .then(res => {
                console.log("createWorker res ",res);
                if(res) {
                    serviceStore.initServices()
                        .then(() => {
                            setIconName("plus");
                            onUsernameChange('');
                            setProfileImage(defaultImage);
                            setLoading(false);
                            navigation.navigate(SCENCE_KEYS.SERVICES)
                        })
                        .catch(err => {
                            console.log("error with init services ",err);
                        })
                }
            })
            .catch(err => {
                console.log("error with create worker ",err);
            })
    }
    
    const buttonText = userExist ? update_button_text : create_button_text;
    const iconTypeByPlatform = Platform.OS === 'ios' ? "MaterialCommunityIcons" :  "Octicons";
    return(
        <View style={[styles.view]}>
            <GradientHeader navigation={navigation} scenceName={SCENCE_KEYS.PROFILE}/>
            <View style={styles.profileView}>
                <View style={[styles.profilePosition]}>
                    <ProfileImage saveImage={saveImage} setLoading={setLoading} iconType={iconTypeByPlatform} iconName={iconName} profileImage={profileImage} profileImageExist={profileImageExist}/>
                </View>
                <View style={{marginVertical:'40%'}}>
                    <CustomTextInput defaultValue={username} placeholder={YOUR_NAME_PLACEHOLDER} onChangeText={text => onUsernameChange(text)}/>
                </View>
                {renderLoading()}
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