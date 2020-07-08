import React , {useState,useEffect} from 'react';
import {View,StyleSheet,TouchableOpacity,Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { GRAY_BACKGROUND, PURPLE_BACKGROUND, WHITE_COLOR } from '../../utils/localStorage/colors/Colors';
import { getImage } from '../../utils/images/Images';
import {Icon} from 'native-base';
import ErrorDisplay from '../errorDisplay/ErrorDisplay';
import rootStores from '../../stores/Index';
import { ERROR_STORE } from '../../stores/Stores';
import AuthModule from '../../modules/AutModule';

const errorStore = rootStores[ERROR_STORE];

const defaultImage = getImage('defaultProfile');
const PROFILE_IMAGE_WIDTH = 131;
const PROFILE_IMAGE_HEIGHT = 129;

const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const imageTypes = [
    'image/jpeg',
    'image/png',
    'image/bmp',
    'image/gif',
    'image/svg+xml',
    'image/x-icon'
];

  

const ProfileImage = ({profileImageExist,profileImage,iconName,saveImage,iconType}) => {

    useEffect(() => {
        //console.log("USE EFFECT !")
    }, [profileImageExist])

    const imageValidation = (type) => {
        if(imageTypes.includes(type)){
            return true;
        }

        const errorMessage = 'עליך לבחור תמונה בלבד'
        errorStore.setErrorMessage(errorMessage);
        errorStore.setDisplayError(true);
        return false;
    }

   const showImagePicker = () => {
       const didntSelectProfileImage = !profileImageExist;
       console.log("didntSelectProfileImage ",didntSelectProfileImage);
       displayErrorMessage(false);

       ImagePicker.showImagePicker(options, (response) => {
        let errorMessageDisplay = '';
            if(didntSelectProfileImage && response.didCancel) {
                errorMessageDisplay = 'עליך לבחור תמונה על מנת להתקדם';
                displayErrorMessage(true,errorMessageDisplay);
            }
            else if (response.didCancel) {} 
            else if (response.error) {
              errorMessageDisplay = 'שגיאה בעת העלאת התמונה';
              displayErrorMessage(true,errorMessageDisplay);
            } else if(imageValidation(response.type)){
              const source = { uri: response.uri };
              saveImage(source);
            }
          });
    }

    const displayErrorMessage = (displayError,errorMessage) => {
        if(displayError) {
            errorStore.setErrorMessage(errorMessage);
            errorStore.setDisplayError(true);
        }else{            
            errorStore.setDisplayError(false);
        }
    }

    const styleByImage = !profileImageExist ? styles.defaultImage : styles.avatar; 
    return(
        <View>
            <View style={[styles.profileImageView,styles.borderStyle,styles.shadow]}>
                <Image resizeMode={"cover"} source={profileImage} style={[styles.avatar,styleByImage]} />

                <TouchableOpacity onPress={() => showImagePicker()} style={[styles.iconView,styles.borderStyle]}>
                    <Icon name={iconName} type={iconType} style={styles.iconStyle}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfileImage;

const styles = StyleSheet.create ({
    profileImageView:{
        width:PROFILE_IMAGE_WIDTH,
        height:PROFILE_IMAGE_HEIGHT,
        borderRadius:PROFILE_IMAGE_WIDTH/2,
        backgroundColor:GRAY_BACKGROUND,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10
    },
    avatar:{
        width:PROFILE_IMAGE_WIDTH,
        borderRadius:PROFILE_IMAGE_WIDTH/2,
        height:PROFILE_IMAGE_HEIGHT,
    },
    defaultImage:{
        width:100,
        height:100,
        resizeMode:'contain'
    },
    borderStyle:{
        borderWidth:4,
        borderColor:WHITE_COLOR
    },
    iconView:{
        position:'absolute',
        bottom:-30,
        left:0,
        width:55,
        height:55,
        borderRadius:55/2,
        backgroundColor:PURPLE_BACKGROUND,        
        justifyContent:'center',
        alignItems:'center',

    },
    shadow:{
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:8
        },
        shadowOpacity:0.25,
        shadowRadius:10.32,
        elevation: 2
    },
    iconStyle:{
        fontSize:35,
        justifyContent:'center',
        alignContent:'center',
        color:WHITE_COLOR
    }
})