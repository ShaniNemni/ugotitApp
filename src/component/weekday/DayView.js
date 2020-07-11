import React,{useEffect,useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import { GRAY_BACKGROUND, PURPLE_BACKGROUND } from '../../utils/localStorage/colors/Colors';

const DayView = ({day,onSelectedDays,selectedDays,serviceToUpdate}) => {
    
    const [daySelected,setDaySelected] = useState(false);
    
    useEffect(() => {
            //if -1 , index not exist , so the day not selected
            const findIfSelected = selectedDays && selectedDays.length > 0 ? selectedDays.findIndex(selected => selected === day.id) : -1; 
            const selectedSign = findIfSelected !== -1;
            setDaySelected(selectedSign);
    }, [selectedDays])


    function getSelectionStyle (){
        return daySelected ? styles.selectedCircle : styles.unselectedCircle;
    }

    function onSelectedDay () {
        const daySelectedValue = !daySelected;
        const dayId = day.id;
        setDaySelected(daySelectedValue);
        onSelectedDays(dayId)
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