import React,{useState} from 'react';
import {View,Text,StyleSheet,KeyboardAvoidingView,Image} from 'react-native';
import {Icon} from 'native-base';
import { PURPLE_BACKGROUND, BLACK, ERROR_BACKGROUND, ERROR_TEXT } from '../../utils/localStorage/colors/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomTextInput from '../../component/costumTextInput/CustomTextInput';
import CustomButton from '../../component/customButton/CustomButton';
import WeekView from '../../component/weekday/WeekView';
import { observer } from 'mobx-react';
import rootStores from '../../stores/Index';
import { SERVICE_STORE, ERROR_STORE } from '../../stores/Stores';
import TimePicker from '../../component/timePicker/TimePicker';
import { getImage } from '../../utils/images/Images';

const placeholder = "service name";
const buttonText = 'אישור';
const hourTitle = 'טווח שעות';
const serviceStore = rootStores[SERVICE_STORE];
const errorStore = rootStores[ERROR_STORE];
const loadingGif = getImage('loading');

const CreateService = observer (({closeSubview,iosPlatform,navigation}) => {

    const [fromHour,setFromHour] = useState("00");
    const [fromMinutes,setFromMinutes] = useState("00");
    const [toHour,setToHour] = useState("00");
    const [toMinutes,setToMinutes] = useState("00");
    const [overlapError,serOverlapError] = useState(undefined);
    const [loading , setLoading] = useState(false);

    function changeTextInput() {
        const serviceName = serviceStore.getServiceName;
        return serviceName && serviceName.length > 0;
    }

    function validTime() {
        if(fromHour === toHour){
            return toMinutes > fromMinutes;
        }
        return fromHour < toHour;
    }

    function validServiceForm () {
        const vaidTime = validTime();
        const serviceName = serviceStore.getServiceName;
        const daysSelected = serviceStore.getSelectedDays;

        const validSelectedDays = daysSelected && daysSelected.length > 0;
        const validServiceName = serviceName && serviceName.length > 2;

        if(!validServiceName){
            errorStore.setDisplayError(true);
            errorStore.setErrorMessage("עליך לכתוב את שם השרות. לפחות 2 תווים");
        }else if(!validSelectedDays) {
            errorStore.setDisplayError(true);
            errorStore.setErrorMessage("עליך לבחור לפחות יום אחד");
        }else if(!vaidTime) {
            errorStore.setDisplayError(true);
            errorStore.setErrorMessage("הטווח שעות לא תקין");
        }else if(vaidTime || validSelectedDays || validServiceName){
            errorStore.setDisplayError(false);
        }

        return validServiceName && vaidTime && validSelectedDays;
    }

    function displayError (){
        const errorMessage = errorStore.getErrorMessage;
        const overlapDisplay = overlapError !== undefined;
        const displayErrorMessage = errorStore.getDisplayError;

        const errorMessageToDisplay = overlapDisplay ? overlapError : errorMessage;
        if(displayErrorMessage || overlapDisplay) {
            return(
                 <Text style={[styles.errorText]}>{errorMessageToDisplay}</Text>
            )
        }
    }

    function setServiceName(value) {
        serviceStore.setServiceName(value);
    }

    function renderLoading(){
        if(loading) {
            return(
                <View style={{position:'absolute',top:'30%',alignContent:'center',zIndex:10}}>
                    <Image source={loadingGif} style={{resizeMode:'center',width:100,height:100}} />
                </View>
            )
        }
        
    }

    function timePicker() {
        return(
            <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
            <TimePicker selectTime={setToMinutes}/>
                <Text style={styles.timeSeperate}>{":"}</Text>
            <TimePicker selectTime={setToHour} type={"hours"}/>
                <Text style={styles.timeSeperate}>{"-"}</Text>
            <TimePicker selectTime={setFromMinutes}/>
                <Text style={styles.timeSeperate}>{":"}</Text>
            <TimePicker selectTime={setFromHour} type={"hours"}/>
        </View>

        )
    }

    function checkServiceExistInTheSameHours() {
        serOverlapError(undefined);
        setLoading(true);
        const fromTime = fromHour + ":" + fromMinutes;
        const toTime = toHour + ":" + toMinutes;
        serviceStore.setFromTime(fromTime);
        serviceStore.setToTime(toTime);

        return serviceStore.checkServiceExist()
            .then(serviceTimeExist => {
                if(!serviceTimeExist){
                    createNewService();
                }else{
                    serOverlapError("קיימת חפיפה עם זמני שירות אחרים");
                }
            })
            .catch(err => {
                console.log("cant check service time exist ",err);
            })

    }

    function createNewService() {
        return serviceStore.createService()
            .then(res => {
                setLoading(false);
                if(res) {
                    closeSubview();
                }else{
                    errorStore.setDisplayError(true);
                    errorStore.setErrorMessage("שגיאה בעת יצירת השירות");        
                }
            })
            .catch(err => {
                errorStore.setDisplayError(true);
                errorStore.setErrorMessage("שגיאה בעת יצירת השירות");        
            })
    }

    const closeIconByPlatform = iosPlatform ? "close-circle" : "closecircle";
    const closeTypeIconByPlatfrom = iosPlatform ? "Ionicons" : "AntDesign";
    const iconTypeByPlatform = iosPlatform ? "MaterialCommunityIcons" : "Entypo";
    const flexdirectionByPlatform = iosPlatform ? {flexDirection:'row'} : {flexDirection:'row-reverse'};
    return(
        <KeyboardAvoidingView behavior={iosPlatform ? "padding" : "height"} style={[styles.view]}>
            <TouchableOpacity onPress={() => closeSubview()} style={[styles.iconView]}>
                <Icon name={closeIconByPlatform} type={closeTypeIconByPlatfrom} style={styles.iconStyle}/>
            </TouchableOpacity>

        <View style={{alignItems:'center',height:'80%',width:'100%'}}>
            <View style={[{marginTop:'2%',height:'20%'},flexdirectionByPlatform]}>
                <CustomTextInput changeTextInputStyle={changeTextInput()} onChangeText={text => setServiceName(text)} placeholder={placeholder} width={'60%'}/>
                <Icon name={"lock"} type={iconTypeByPlatform} style={{marginHorizontal:10}}/>
            </View>

            <View style={{height:"16%"}}>
                <WeekView/>
            </View>
            {renderLoading()}
            <View style={{height:"40%"}}>
                <Text style={[styles.hourTitle]}>{hourTitle}</Text>
                {timePicker()}
            </View>
            {displayError()}
            <View style={styles.buttonPosition}>
                <CustomButton onPress={checkServiceExistInTheSameHours} disabled={!validServiceForm()} buttonText={buttonText}/>
            </View>
        </View>

        </KeyboardAvoidingView>
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
        bottom:'2%'
    },
    hourTitle:{
        color:BLACK,
        textAlign:'center',
        fontSize:14,
        fontWeight:'bold'
    },
    timeSeperate:{
        color:BLACK,
        fontSize:30,
        fontWeight:'bold'
    },
    errorText:{
        textAlign:'center',
        color:ERROR_TEXT,
        fontSize:14,
        fontWeight:'bold'
    }
})