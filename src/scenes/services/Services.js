import React,{Component,useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TouchableHighlight,Animated} from 'react-native';
import { GradientHeader } from '../../component/customHeader/CustomHeader';
import SCENCE_KEYS from '../scenesManager/SceneConsts';
import CustomButton from '../../component/customButton/CustomButton';
import {Icon} from 'native-base';
import { PURPLE_BACKGROUND } from '../../utils/localStorage/colors/Colors';
import CreateService from './CreateService';

const buttonText =  'סיום';
const addServiceButton = 'הוספת שירות';

const Services = ({}) => {
    const [bounceValue,setBounceValue] = useState(new Animated.Value(100));
    const [isHidden , setHidden] = useState(true);

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
   

    return(
        <View style={[styles.view]}>
            <GradientHeader scenceName={SCENCE_KEYS.SERVICES}/>
            <View style={[styles.serviceView]}>

                <TouchableOpacity onPress={() => toggleCreateService()} style={[styles.addServiceButton]}>
                    <Text style={[styles.textStyle]}>{addServiceButton}</Text>
                    <View style={[styles.iconView]}>
                        <Icon name={"plus-circle-outline"} type={"MaterialCommunityIcons"} style={[styles.iconStyle]}/>
                    </View>
                </TouchableOpacity>   
                
              { !isHidden &&
                    <Animated.View style={[styles.subView,{transform: [{translateY: bounceValue}]}]}>
                        <CreateService closeSubview = {toggleCreateService}/>
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
        alignSelf:'flex-start',
        flexDirection:'row',
        width:130,
        position:'absolute',
        bottom:'20%',
        left:'10%',
        alignItems:'center'
    },
    iconView:{
        width:30
    }, 
    iconStyle:{
        color:PURPLE_BACKGROUND,
        fontSize:25,
        fontFamily:'bold'
    } ,
    textStyle:{
        width:80,
        fontSize:15,
        color:PURPLE_BACKGROUND
    },
    buttonPosition:{
        position:'absolute',
        bottom:'5%',
    },
    subView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: '80%',
      }
    
})
