import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Icon}  from 'native-base';
import { ERROR_BACKGROUND } from '../../utils/localStorage/colors/Colors';


const ErrorDisplay = ({errorText}) => {
    return(
        <View style={[styles.errorView,styles.errorIconAndText]}>
            <Text style={styles.errorText} numberOfLines={1}>{errorText}</Text>  
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
        justifyContent:'flex-end',
        alignSelf:'center',
    },
    errorIconAndText:{
        flexDirection:'row',
        alignItems:'center',
    },
    errorText:{
        maxWidth:300,
        fontSize:16,
    },
    iconView:{
        width:30,
        fontSize:25,
        color:'red'
    }
})