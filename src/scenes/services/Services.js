import React,{Component,useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TouchableHighlight,Animated,Platform} from 'react-native';
import { GradientHeader } from '../../component/customHeader/CustomHeader';
import SCENCE_KEYS from '../scenesManager/SceneConsts';
import CustomButton from '../../component/customButton/CustomButton';
import {Icon} from 'native-base';
import { PURPLE_BACKGROUND } from '../../utils/localStorage/colors/Colors';
import CreateService from './CreateService';
import { observer } from 'mobx-react';
import rootStores from '../../stores/Index';
import { SERVICE_STORE, ERROR_STORE } from '../../stores/Stores';
import ServiceList from './ServiceList';
import AutModule from '../../modules/AutModule';

const buttonText =  'סיום';
const addServiceButton = 'הוספת שירות';
const serviceStore = rootStores[SERVICE_STORE];
const errorStore = rootStores[ERROR_STORE];

const Services = observer(({navigation}) => {
    const [bounceValue,setBounceValue] = useState(new Animated.Value(100));
    const [isHidden , setHidden] = useState(true);    
    const [errorText,setErrorText ] = useState("");

    function toggleCreateService(createNewService){
        if(createNewService) {
            serviceStore.clearAllServiceFields();
        }
        
        let toValue = 100;
        if(isHidden) {
            toValue = 0;
        } 

        Animated.spring(
            bounceValue,
            {
              toValue: toValue,
              velocity: 3,
              tension: 50,
              friction: 8,
              useNativeDriver:true
            }
          ).start();
      
          setHidden(!isHidden);
    }

    function validButton(){
        const getServices = serviceStore.getAllServices;
        return getServices.length > 0;
    }

    function onFinishPresed() {
        setErrorText("");
        errorStore.setErrorMessage("");
        errorStore.setDisplayError(false);

        return AutModule.removeWorkerDataFromLocalStorage()
             .then(res => {
                 if(res) {
                    navigation.navigate(SCENCE_KEYS.PROFILE);
                 }else{
                    setErrorText("שגיאה בעת לחיצה על סיום")
                    }
             })
             .catch(err => {
                 console.log("error with remove worker data ",err);
                 setErrorText("שגיאה בעת לחיצה על סיום")
            })
    }

    function renderDisplayError() {
        const displayError = errorText.length > 0;
    
        if(isHidden && displayError ) {
            return(
                 <Text>{errorText}</Text>
            )
        } 
    }
   
    const iosPlatform = Platform.OS === 'ios';
    const iconNameByPlatform = iosPlatform ? "plus-circle-outline" : "pluscircle";
    const iconTypeByPlatform = iosPlatform ? "MaterialCommunityIcons" : "AntDesign";
    const styleByPlatform = iosPlatform ? styles.iosButtonView : styles.androidButtonView;
    return(
        <View style={[styles.view]}>
            <GradientHeader displayOpacitiy={!isHidden} scenceName={SCENCE_KEYS.SERVICES}/>
            <View style={[styles.serviceView]}>
                <View style={{height:'58%',alignSelf:'flex-start',width:'100%'}}>
                    <ServiceList openSubView = {toggleCreateService}/>
                </View>

                <TouchableOpacity onPress={() => toggleCreateService(true)} style={[styles.addServiceButton,styleByPlatform]}>
                    <View style={[styles.iconView]}>
                        <Icon name={iconNameByPlatform} type={iconTypeByPlatform} style={[styles.iconStyle]}/>
                    </View>
                    <Text style={[styles.textStyle]}>{addServiceButton}</Text>
                </TouchableOpacity>   
                
              { !isHidden &&
                    <Animated.View style={[styles.subView,{transform: [{translateY: bounceValue}]}]}>
                        <CreateService iosPlatform={iosPlatform} closeSubview = {toggleCreateService}/>
                    </Animated.View> }

                {renderDisplayError()}
                {isHidden && <View style={[styles.buttonPosition]}>
                    <CustomButton onPress={onFinishPresed} disabled={!validButton()} buttonText={buttonText}/>
                </View>}
            </View>
        </View>
    )
})

export default Services;

const styles = StyleSheet.create({
    view:{
        height:'100%',
        width:'100%'
    },
    serviceView:{
        height:'80%',
        alignItems:'center'
    },  
    addServiceButton:{
        flexDirection:'row',
        width:130,
        position:'absolute',
        bottom:'30%',
        alignItems:'center'
    },
    iosButtonView:{
        alignSelf:'flex-start',
        left:'10%',
    },
    androidButtonView:{
        alignSelf:'flex-end',
        right:'5%',
    },
    iconView:{
        width:30,
        marginHorizontal:5
    }, 
    iconStyle:{
        color:PURPLE_BACKGROUND,
        fontSize:25,
        fontFamily:'bold'
    } ,
    textStyle:{
        width:100,
        fontSize:15,
        color:PURPLE_BACKGROUND
    },
    buttonPosition:{
        position:'absolute',
        bottom:'15%',
    },
    subView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: '95%',
      }
    
})
