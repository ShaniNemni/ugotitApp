import React from 'react';
import {TouchableOpacity,Text,StyleSheet} from 'react-native';
import { PURPLE_BACKGROUND, WHITE_COLOR, GRAY_BACKGROUND } from '../../utils/localStorage/colors/Colors';

const INPUT_TEXT_WIDTH = 343;
const INPUT_TEXT_HEIGHT = 50;

const CustomButton = (props) => {
    //disabled //fo
    const buttonDisabled = props.disabled ? styles.buttonDisabled : undefined;
    return(
        <TouchableOpacity {...props} style={[styles.buttonView,buttonDisabled]}>
            <Text style={[styles.buttonText]}>{props.buttonText}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    buttonView:{
        width:INPUT_TEXT_WIDTH,
        height:INPUT_TEXT_HEIGHT,
        backgroundColor:PURPLE_BACKGROUND,
        borderRadius:10,
        justifyContent:'center'
    },
    buttonDisabled:{
        backgroundColor:GRAY_BACKGROUND,
    },
    buttonText:{
        color:WHITE_COLOR,
        textAlign:'center',
        fontSize:22
    }
})