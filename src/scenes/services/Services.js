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
import { SERVICE_STORE } from '../../stores/Stores';

const buttonText =  'סיום';
const addServiceButton = 'הוספת שירות';
const serviceStore = rootStores[SERVICE_STORE];

const Services = ({}) => {
    const [bounceValue,setBounceValue] = useState(new Animated.Value(100));
    const [isHidden , setHidden] = useState(true);    
    const [services, setServices] = useState([]);

    useEffect(() => {
        const servicesObjects = serviceStore.getServices;
        console.log("servicesObjects ",servicesObjects);
        setServices(servicesObjects);
    }, [])

    function toggleCreateService(){
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
   
    const iosPlatform = Platform.OS === 'ios';
    const iconNameByPlatform = iosPlatform ? "plus-circle-outline" : "pluscircle";
    const iconTypeByPlatform = iosPlatform ? "MaterialCommunityIcons" : "AntDesign";
    const styleByPlatform = iosPlatform ? styles.iosButtonView : styles.androidButtonView;
    return(
        <View style={[styles.view]}>
            <GradientHeader scenceName={SCENCE_KEYS.SERVICES}/>
            <View style={[styles.serviceView]}>

                <TouchableOpacity onPress={() => toggleCreateService()} style={[styles.addServiceButton,styleByPlatform]}>
                    <View style={[styles.iconView]}>
                        <Icon name={iconNameByPlatform} type={iconTypeByPlatform} style={[styles.iconStyle]}/>
                    </View>
                    <Text style={[styles.textStyle]}>{addServiceButton}</Text>
                </TouchableOpacity>   
                
              { !isHidden &&
                    <Animated.View style={[styles.subView,{transform: [{translateY: bounceValue}]}]}>
                        <CreateService iosPlatform={iosPlatform} closeSubview = {toggleCreateService}/>
                    </Animated.View> }


                {isHidden && <View style={[styles.buttonPosition]}>
                    <CustomButton buttonText={buttonText}/>
                </View>}
            </View>
        </View>
    )
}

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
