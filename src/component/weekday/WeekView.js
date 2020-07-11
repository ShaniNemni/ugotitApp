import React,{useState,useEffect} from 'react';
import {ScrollView,StyleSheet,View} from 'react-native';
import DayView from './DayView';
import rootStores from '../../stores/Index';
import { SERVICE_STORE } from '../../stores/Stores';
import { observer } from 'mobx-react';
import {DayList} from '../../utils/lists/DayList';

const serviceStore = rootStores[SERVICE_STORE];

const WeekView = observer (() => {
    const [selectedDays,setSelectedDays] = useState([]);

    useEffect(() => {
        if(serviceStore.getCurrentServiceID) {
            const selectedDaysToDisplay = serviceStore.getSelectedDays;
            setSelectedDays(selectedDaysToDisplay);
        }
    }, [selectedDays]);

    const onSelectedDays = (dayId) => {
        let filteredSelectedDays = selectedDays;
        const dayIndex = filteredSelectedDays.findIndex(selected => selected === dayId);

        if(dayIndex === -1) {
            filteredSelectedDays.push(dayId);
        }else{
            filteredSelectedDays = selectedDays.filter(selected => dayId !== selected);
        }
        
        setSelectedDays(filteredSelectedDays);
        serviceStore.setSelectedDays(filteredSelectedDays);
    }

    const renderWeek = () => {
        const dayToDisplay = DayList.map(dayElement => (
            <DayView selectedDays={selectedDays} onSelectedDays={onSelectedDays} key={dayElement.id} day={dayElement}/>
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
})

export default WeekView;