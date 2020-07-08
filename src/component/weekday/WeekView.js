import React,{useState,useEffect} from 'react';
import {ScrollView,StyleSheet,View} from 'react-native';
import DayView from './DayView';
import rootStores from '../../stores/Index';
import { SERVICE_STORE } from '../../stores/Stores';


let daysList = [{id:1,name:'ראשון',selected:false},{id:2,name:'שני',selected:false},{id:3,name:'שלישי',selected:false},{id:4,name:'רביעי',selected:false},{id:5,name:'חמישי',selected:false},{id:6,name:'שישי',selected:false}]
const serviceStore = rootStores[SERVICE_STORE];

const WeekView = () => {

    const [days,setDays] = useState(daysList);

    const onSelectedDays = (daySelectedValue,dayId) => {
        const dayIndex = days.findIndex(dayElment => dayElment.id === dayId);
        days[dayIndex].selected = daySelectedValue;
        setDays(days);
        setSelectedDays();
    }

    const setSelectedDays = () => {
        let idsDays = [];
        
        days.map(dayElemnt => {
            if(dayElemnt.selected === true){
                idsDays.push(dayElemnt.id);
            }
        });

        serviceStore.setSelectedDays(idsDays);
    }

    const renderWeek = () => {
        const dayToDisplay = daysList.map(dayElement => (
            <DayView onSelectedDays={onSelectedDays} key={dayElement.id} day={dayElement}/>
        ))

        return(
            <ScrollView horizontal={true} style={{marginHorizontal:10,flexDirection:'row'}}>
                    {dayToDisplay}
            </ScrollView>
        )
    }

    return(
        renderWeek()
    )
}

export default WeekView;