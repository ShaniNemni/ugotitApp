import React,{useState} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import { PURPLE_BACKGROUND } from '../../utils/localStorage/colors/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomTextInput from '../../component/costumTextInput/CustomTextInput';
import CustomButton from '../../component/customButton/CustomButton';
import WeekView from '../../component/weekday/WeekView';
import { observer } from 'mobx-react';
import rootStores from '../../stores/Index';
import { SERVICE_STORE } from '../../stores/Stores';

const placeholder = "service name";
const buttonText = 'אישור';
const serviceStore = rootStores[SERVICE_STORE];
const CreateService = observer (({closeSubview,iosPlatform}) => {

    function changeTextInput() {
        const serviceName = serviceStore.getServiceName;
        return serviceName.length > 0;
    }

    function validServiceForm () {
        const serviceName = serviceStore.getServiceName;
        return serviceName.length > 2;
    }

    function setServiceName(value) {
        serviceStore.setServiceName(value);
    }

    const closeIconByPlatform = iosPlatform ? "close-circle" : "closecircle";
    const closeTypeIconByPlatfrom = iosPlatform ? "Ionicons" : "AntDesign";
    const iconTypeByPlatform = iosPlatform ? "MaterialCommunityIcons" : "Entypo";
    const flexdirectionByPlatform = iosPlatform ? {flexDirection:'row'} : {flexDirection:'row-reverse'};
    return(
        <View style={[styles.view]}>
            <TouchableOpacity onPress={() => closeSubview()} style={[styles.iconView]}>
                <Icon name={closeIconByPlatform} type={closeTypeIconByPlatfrom} style={styles.iconStyle}/>
            </TouchableOpacity>

        <View style={{alignItems:'center',height:'80%',width:'100%'}}>
            <View style={[{marginVertical:'2%',height:'20%'},flexdirectionByPlatform]}>
                <CustomTextInput changeTextInputStyle={changeTextInput()} onChangeText={text => setServiceName(text)} placeholder={placeholder} width={'60%'}/>
                <Icon name={"lock"} type={iconTypeByPlatform} style={{marginHorizontal:10}}/>
            </View>

            <View style={{height:"20%"}}>
                {<WeekView/>}
            </View>

            <View style={styles.buttonPosition}>
                <CustomButton disabled={!validServiceForm()} buttonText={buttonText}/>
            </View>
        </View>

        </View>
    )
})

export default CreateService;

const styles = StyleSheet.create({
    view:{
        height:'100%',
    },
    iconStyle:{
        color:PURPLE_BACKGROUND,
        fontSize:30
    },
    iconView:{
        width:40,
        alignSelf:'flex-end',
        marginHorizontal:15,
        marginVertical:5
    },
    buttonPosition:{
        position:'absolute',
        bottom:'5%'
    }
})