import React , {useState} from 'react';
import {View,StyleSheet,TouchableOpacity,Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { GRAY_BACKGROUND, PURPLE_BACKGROUND, WHITE_COLOR } from '../utils/localStorage/colors/Colors';
import { getImage } from '../utils/images/Images';
import {Icon} from 'native-base';

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
  

const ProfileImage = ({}) => {

   const [profileImage,setProfileImage] = useState(defaultImage);
   const [iconName,setIconName] = useState('plus');

   const showImagePicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
                console.log("source ",source);
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              setProfileImage(source);
              setIconName('pencil');
            }
          });
    }

    return(
        <View style={[styles.profileImageView,styles.borderStyle,styles.shadow]}>
            <Image source={profileImage} style={styles.avatar} />

            <TouchableOpacity onPress={() => showImagePicker()} style={[styles.iconView,styles.borderStyle]}>
                <Icon name={iconName} type={"MaterialCommunityIcons"} style={styles.iconStyle}/>
            </TouchableOpacity>
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
        //resizeMode:'contain',
        width:PROFILE_IMAGE_WIDTH,
        borderRadius:PROFILE_IMAGE_WIDTH/2,
        height:PROFILE_IMAGE_HEIGHT,
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