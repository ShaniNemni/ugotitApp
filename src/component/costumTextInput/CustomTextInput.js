import React from 'react';
import {TextInput,StyleSheet} from 'react-native';
import { LIGHT_GRAY_BACKGROUND } from '../../utils/localStorage/colors/Colors';

const INPUT_TEXT_WIDTH = 343;
const INPUT_TEXT_HEIGHT = 40;

const CustomTextInput = (props) => {
    return(
        <TextInput
            {...props}
            style={[styles.textInput,styles.textStyle]}
        />
    )
}

export default CustomTextInput;

const styles = StyleSheet.create({
    textInput:{
        height:INPUT_TEXT_HEIGHT,
        width:INPUT_TEXT_WIDTH,
        backgroundColor:LIGHT_GRAY_BACKGROUND,
        borderRadius:10,
    },
    textStyle:{
        textAlign:'right',
        paddingHorizontal:10,
        fontSize:16
                
    }
})