
import React,{useState} from 'react';
import { observer } from 'mobx-react';
import {View,FlatList,Text,Image,StyleSheet} from 'react-native';
import { render } from 'react-dom';
import rootStores from '../../stores/Index';
import { SERVICE_STORE, ERROR_STORE } from '../../stores/Stores';
import ServiceItem from './ServiceItem';
import { getImage } from '../../utils/images/Images';
import { GRAY_TEXT } from '../../utils/localStorage/colors/Colors';
import ErrorDisplay from '../../component/errorDisplay/ErrorDisplay';

const serviceStore = rootStores[SERVICE_STORE];
const noServicesToDisplay = 'אין שירותים';
const loadingGif = getImage('loading');

const ServiceList = observer (({openSubView}) => {
    //loading for delete
    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    const renderServiceItem = ({item}) => {
        return <ServiceItem openSubView={openSubView} removeServiceItem={removeServiceItem} service={item}/>
    }

    const removeServiceItem = (serviceID) => {
        setLoading(true);
        setErrorMessage("");
        return serviceStore.deleteService(serviceID) 
            .then(() => {
                setLoading(false);
            }).
            catch(err => {
                setLoading(false);
                setErrorMessage("שגיאה בעת מחיקת שירות");
                console.log("error with remove service",err);
            })
    }

    const renderLoading = () =>{
        if(loading) {
            return(
                <View style={{position:'absolute',top:'30%',alignContent:'center',alignSelf:'center'}}>
                    <Image source={loadingGif} style={{resizeMode:'center',width:100,height:100}} />
                </View>
            )
        }
        
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
                <View style={{height:'90%'}}>
                    <FlatList
                    data={services}
                    renderItem = {renderServiceItem}
                    keyExtractor = {item => item.id}/>
                    {renderLoading()}
                </View>
            ) 
        }

        return(
            <View style={{alignContent:'center'}}>
                <Text style={{color:GRAY_TEXT,textAlign:'center',fontSize:18}}>{noServicesToDisplay}</Text>
            </View>
        )

    }

    const displayErrorMessage = () => {
        const displayError = errorMessage.length > 0;
        if(displayError) {
            return(
                <View style={[styles.errorDisplay]}>
                    <ErrorDisplay errorText={errorMessage}/> 
                </View>
            )
        }
    }

    return(
        <View style={{height:'100%'}}>
            {renderByServicesCount()}
            {displayErrorMessage ()}
        </View>
      )
})

export default ServiceList;

const styles = StyleSheet.create({
    errorDisplay:{
        position:'absolute',
        bottom:-20
    }
})