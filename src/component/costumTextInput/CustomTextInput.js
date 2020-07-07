import React from 'react';
import {TextInput,StyleSheet} from 'react-native';
import { LIGHT_GRAY_BACKGROUND, WHITE_COLOR, PURPLE_BACKGROUND } from '../../utils/localStorage/colors/Colors';

const INPUT_TEXT_WIDTH = 343;
const INPUT_TEXT_HEIGHT = 40;

const CustomTextInput = (props) => {
    const width = props.width ? {width:props.width} : {width:INPUT_TEXT_WIDTH};
    const styleForServiceScreen = props.changeTextInputStyle ? styles.serviceInputText : undefined;
    return(
        <TextInput
            {...props}
            style={[styles.textInput,styles.textStyle,width,styleForServiceScreen]}
        />
    )
}

export default CustomTextInput;

const styles = StyleSheet.create({
    textInput:{
        height:INPUT_TEXT_HEIGHT,
        backgroundColor:LIGHT_GRAY_BACKGROUND,
        borderRadius:10,
    },
    textStyle:{
        textAlign:'right',
        paddingHorizontal:10,
        fontSize:16
                
    },
    serviceInputText:{
      backgroundColor:WHITE_COLOR,
      borderWidth:1,
      borderColor:PURPLE_BACKGROUND  
    }
})