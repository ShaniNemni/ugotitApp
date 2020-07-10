import React from 'react';
import {View,Text,StyleSheet,Platform} from 'react-native';
import {Icon}  from 'native-base';
import { ERROR_BACKGROUND } from '../../utils/localStorage/colors/Colors';


const ErrorDisplay = ({errorText}) => {
    const viewStyletByPlatform = Platform.OS === 'ios' ? styles.viewIOS : styles.viewANDROID;
    const textStyleByPlatform = Platform.OS === 'ios' ? undefined : styles.errorTextAndroid;
    return(
        <View style={[styles.errorView,styles.errorIconAndText,viewStyletByPlatform]}>
            <Text style={[styles.errorText,textStyleByPlatform]} numberOfLines={1}>{errorText}</Text>  
            <View style={[styles.iconView]}>
                <Icon name={"error"} type={"MaterialIcons"} style={styles.iconView}/>
            </View> 
        </View>
    )
}

export default ErrorDisplay;

const styles = StyleSheet.create({
    errorView:{
        width:343,
        height:44,
        borderRadius:180,
        alignContent:'center',
        backgroundColor:ERROR_BACKGROUND,
        alignSelf:'center',
    },
    viewIOS:{
        justifyContent:'flex-end',
    },
    viewANDROID:{
        justifyContent:'flex-start',
    },
    errorIconAndText:{
        flexDirection:'row',
        alignItems:'center',
    },
    errorText:{
        maxWidth:300,
        fontSize:16,
    },
    errorTextAndroid:{
        textAlign:'right',
        marginHorizontal:8
    },
    iconView:{
        width:30,
        fontSize:25,
        color:'red'
    }
})