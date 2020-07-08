import React,{useEffect,useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import { GRAY_BACKGROUND, PURPLE_BACKGROUND } from '../../utils/localStorage/colors/Colors';

const DayView = ({day,onSelectedDays}) => {
    
    const [daySelected,setDaySelected] = useState(day.selected);

    function getSelectionStyle (){
        return daySelected ? styles.selectedCircle : styles.unselectedCircle;
    }

    function onSelectedDay () {
        const daySelectedValue = !daySelected;
        const dayId = day.id;
        setDaySelected(daySelectedValue);
        onSelectedDays(daySelectedValue,dayId)
    }

    return(
        <View style={styles.view}>
            <Text>{day.name}</Text>
            <TouchableOpacity onPress={() => onSelectedDay()} style={[styles.selectionCircle,getSelectionStyle()]}/>
        </View>
    )
}

export default DayView;

const styles = StyleSheet.create({
    view:{
        height:60,
        width:80,
        alignItems:'center',
        flexDirection:'column',
        borderWidth:1,
    },
    selectionCircle:{
        height:30,
        width:30,
        borderRadius:15,
        marginVertical:5
    },
    unselectedCircle:{
        backgroundColor:GRAY_BACKGROUND
    },
    selectedCircle:{
        backgroundColor:PURPLE_BACKGROUND
    }
})