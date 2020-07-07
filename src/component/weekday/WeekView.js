import React,{useState} from 'react';
import {ScrollView,StyleSheet,View} from 'react-native';
import DayView from './DayView';


const daysList = [{id:6,name:'שישי',selected:false},{id:5,name:'חמישי',selected:false},{id:4,name:'רביעי',selected:false},{id:3,name:'שלישי',selected:false},{id:2,name:'שני',selected:false},{id:1,name:'ראשון',selected:false}]

const WeekView = () => {

    const [days,setSelectedDays] = useState(daysList);

    // const onSelectedDay = (selectedDay) => {
    //     const dayIndex = days.findIndex(dayElement => dayElement.id === selectedDay.id);
    //     const checkDaySelected = days[dayIndex].selected;
    //     days[dayIndex].selected = !checkDaySelected;
    //     console.log("DAYS ----- ",days);
    //     setSelectedDays(days);
    // }

    const onSelectedDays = (selectedDay) => {
        const dayIndex = days.findIndex(dayElement => dayElement.id === selectedDay.id);
        days[dayIndex] = selectedDay;
        setSelectedDays(days);
        console.log("DAYS ----- ",days);
    }

    const renderWeek = () => {
        const dayToDisplay = days.map(dayElement => (
            <DayView onSelectedDays={onSelectedDays} key={dayElement.id} day={dayElement}/>
        ))

        return(
            <ScrollView horizontal={true} style={{marginHorizontal:10}}>
                    {dayToDisplay}
            </ScrollView>
        )
    }

    return(
        renderWeek()
    )
}

export default WeekView;