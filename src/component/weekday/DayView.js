import React,{useEffect,useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import { GRAY_BACKGROUND, PURPLE_BACKGROUND } from '../../utils/localStorage/colors/Colors';

const DayView = ({day,onSelectedDays}) => {
    // console.log("DAY recived ---- ",day);
    // const [dayDisplay,setDaySelection] = useState(day);

    // useEffect(() => {
        
    // }, [input])
    // const onSelectedDay = () => {
    //     const checkDaySelected = dayDisplay.selected;
    //     dayDisplay.selected = !checkDaySelected;
    //     console.log("day ",dayDisplay);
    //     setDaySelection(dayDisplay);
    //     onSelectedDays(dayDisplay);
    // }

    // const getSelectionStyle = () => {
    //     console.log("getSelectionStyle ",dayDisplay.selected);
    //     return dayDisplay.selected ? styles.selectedCircle : styles.unselectedCircle;
    // }

    return(
        <View style={styles.view}>
            <Text>{day.name}</Text>
            {/* <TouchableOpacity onPress={() => onSelectedDay(dayDisplay)} style={[styles.selectionCircle,getSelectionStyle()]}/> */}
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