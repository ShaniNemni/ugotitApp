import React,{useState} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import { PURPLE_BACKGROUND } from '../../utils/localStorage/colors/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomTextInput from '../../component/costumTextInput/CustomTextInput';
import CustomButton from '../../component/customButton/CustomButton';
import WeekView from '../../component/weekday/WeekView';

const placeholder = "service name";
const buttonText = 'אישור';

const CreateService = ({closeSubview}) => {
    const [serviceName,setServiceName] = useState("");

    function changeTextInput() {
        return serviceName.length > 0;
    }

    return(
        <View style={[styles.view]}>
            <TouchableOpacity onPress={() => closeSubview()} style={[styles.iconView]}>
                <Icon name={"close-circle"} type={"Ionicons"} style={styles.iconStyle}/>
            </TouchableOpacity>

        <View style={{alignItems:'center',height:'80%',width:'100%'}}>
            <View style={{marginVertical:'5%',flexDirection:'row',height:'20%'}}>
                <CustomTextInput changeTextInputStyle={changeTextInput()} onChangeText={text => setServiceName(text)} placeholder={placeholder} width={'60%'}/>
                <Icon name={"lock"} type={"MaterialCommunityIcons"} style={{marginHorizontal:10}}/>
            </View>

            <View style={{height:"40%",borderWidth:1}}>
                {/* <WeekView/> */}
            </View>

            <View style={styles.buttonPosition}>
                <CustomButton buttonText={buttonText}/>
            </View>
        </View>

        </View>
    )
}

export default CreateService;

const styles = StyleSheet.create({
    view:{
        height:'100%',
    },
    iconStyle:{
        color:PURPLE_BACKGROUND,
        fontSize:40
    },
    iconView:{
        width:40,
        alignSelf:'flex-end',
        marginHorizontal:15,
        marginVertical:5
    },
    buttonPosition:{
        position:'absolute',
        bottom:0
    }
})