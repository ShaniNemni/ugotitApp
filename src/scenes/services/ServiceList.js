
import React from 'react';
import { observer } from 'mobx-react';
import {View,FlatList,Text,Image} from 'react-native';
import { render } from 'react-dom';
import rootStores from '../../stores/Index';
import { SERVICE_STORE } from '../../stores/Stores';
import ServiceItem from './ServiceItem';
import { getImage } from '../../utils/images/Images';
import { GRAY_TEXT } from '../../utils/localStorage/colors/Colors';

const serviceStore = rootStores[SERVICE_STORE];
const noServicesToDisplay = 'אין שירותים';
const loadingGif = getImage('loading');

const ServiceList = observer (({openSubView}) => {
    
    const renderServiceItem = ({item}) => {
        return <ServiceItem openSubView={openSubView} removeServiceItem={removeServiceItem} service={item}/>
    }

    const removeServiceItem = (serviceID) => {
        console.log("serviceID ------- ",serviceID);
        return serviceStore.deleteService(serviceID) 
            .then(res => {
                console.log("removeIdsFromLocalStorage res ---------- ",res);
            })
    }

    const renderByServicesCount = () => {
        const services = serviceStore.getAllServices;
        const loadingServices = serviceStore.getLoading;
        if(loadingServices) {
            return (
                 <View style={{position:'absolute',top:'30%',alignContent:'center',alignSelf:'center'}}>
                     <Image source={loadingGif} style={{resizeMode:'center',width:100,height:100}} />
                 </View>
            )
        }

        if(services && services.length > 0) {
            return (
                <FlatList
                data={services}
                renderItem = {renderServiceItem}
                keyExtractor = {item => item.id}/>
            ) 
        }

        return(
            <View style={{alignContent:'center'}}>
                <Text style={{color:GRAY_TEXT,textAlign:'center',fontSize:18}}>{noServicesToDisplay}</Text>
            </View>
        )

    }

    return(
        <View style={{height:'100%'}}>
            {renderByServicesCount()}
        </View>
      )
})

export default ServiceList;