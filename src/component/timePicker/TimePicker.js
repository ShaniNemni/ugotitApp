import React,{useState,useEffect} from 'react';
import {View,TouchableOpacitiy,Text,ScrollView,StyleSheet} from 'react-native';
import { LIGHT_GRAY_BACKGROUND, PURPLE_BACKGROUND, BLACK } from '../../utils/localStorage/colors/Colors';

const minuts = ["00","15","30","45"];

const TimePicker = ({type,selectTime,initTime}) => {
    const [timeSelected,setTime] = useState(initTime);

    useEffect(() => {
        setTime(initTime);
    }, [initTime])
    
    const getTimeByType = () => {
        if(type === "hours") {
            let hoursList = [];
            let hour;
            let hourDisplay;
            const firstHour = 0;
            const maxHour = 23;
            for (hour = firstHour ; hour <= maxHour ; hour++)  {
                hourDisplay = hour > 9 ? String(hour) : "0" + hour;
                hoursList.push(hourDisplay);
            }
            return hoursList;
        }

        return minuts;
    }

    const onSelectTime = (time) => {
        setTime(time);
        selectTime(time);
    }

    const getStyleBySelection = (time) => {
        if(timeSelected === time){
            return styles.timeSelected;
        }

        return styles.unSelectedTime;
    }

    const renderSingleTime = (time) => {
        const timeStyle = getStyleBySelection(time);
        return(
              <Text key={time} onPress={() => onSelectTime(time)} style={[styles.textTime,timeStyle]}>{time}</Text>
        )
    }

    const renderTimeView = () => {
        const timeToDisplay = getTimeByType();

        const time = timeToDisplay.map(timeElment => {
            return renderSingleTime(timeElment)
        })

        return(
            <View style={{flexDirection:'column'}}>
                    {time}
            </View>
        )
    }

    return(
        <ScrollView contentContainerStyle={{alignItems:'center',marginVertical:2}} style={[styles.scrollView]}>
            {renderTimeView()}
        </ScrollView>
    )

}

export default TimePicker;

const styles = StyleSheet.create({
    scrollView:{
        height:120,
        backgroundColor:LIGHT_GRAY_BACKGROUND,
        width:50,
        borderRadius:20,
        marginHorizontal:5,
    },
    timeSelected:{
        fontSize:22,
        color:PURPLE_BACKGROUND,
        fontWeight:'bold'
    },
    unSelectedTime:{
        fontSize:18,
        color:BLACK,
    },
    textTime:{
        height:28
    }
})