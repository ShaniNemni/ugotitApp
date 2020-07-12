
import React,{useState} from 'react';
import { observer } from 'mobx-react';
import {TouchableOpacity,View,Text,StyleSheet,Platform,Modal} from 'react-native';
import {Icon} from 'native-base';
import { BLACK, GRAY_TEXT, PURPLE_BACKGROUND } from '../../utils/localStorage/colors/Colors';
import HelperMethods from '../../utils/HelperMethos';
import rootStores from '../../stores/Index';
import { SERVICE_STORE } from '../../stores/Stores';
import RemoveServiceModal from '../../component/modal/RemoveServiceModal';

const serviceStore = rootStores[SERVICE_STORE];
const ServiceItem = ({service,removeServiceItem,openSubView}) => {
    const [removeModalOpen,setRemoveModalVisible] = useState(false);
    const [loading,setLoading] = useState(false);

    const getTime = () => {
        const time = service.from + "-" + service.to;
        const timeString = "שעות:" + time;
        return timeString;
    }

    const getDays = () => {
        let daysValue = '';
        let dayHE = '';
        const days = service.days.map(day => {
            dayHE = HelperMethods.dayValueHE(day);
            daysValue += dayHE;
        })

        return "ימים:" + daysValue;
    }

    const onTrashPressed = () => {
        setRemoveModalVisible(true);
    }

    const closeRemoveModal = () => {
        setRemoveModalVisible(false);
    }

    const removeService = () => {
        const serviceId = service.id;
        console.log("serviceid ",serviceId);
        removeServiceItem(serviceId);
        closeRemoveModal();
    }

    const onServicePressed = () => {
        serviceStore.setServiceToUpdate(service)        
        openSubView();
    }

    const iconTypeByPlatform = Platform.OS === 'ios' ? "MaterialCommunityIcons" : "Entypo";
    return(
        <TouchableOpacity onPress={() => onServicePressed()} style={[styles.serviceView]}>
            <RemoveServiceModal onRemove={removeService} onCancel={closeRemoveModal} visibleRemoveModal={removeModalOpen}/>
            <View style={[styles.lockView]}>
                 <Icon name={"lock"} type={iconTypeByPlatform} style={styles.lockIcon}/>
            </View>
            <View style={{height:40,width:150,flexDirection:'column'}}>
                <Text numberOfLines={1} style={[styles.serviceTitle]}>{service.name}</Text>
                <View style={[styles.timeInfo]}>
                    <Text numberOfLines={1} style={[styles.timeText]}>{getDays()}</Text>
                    <Text>{", "}</Text>
                    <Text numberOfLines={1} style={[styles.timeText]}>{getTime()}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => onTrashPressed()} style={[styles.trashView]}>
                <Icon name={"trashcan"} type={"Octicons"} style={styles.trashIcon}/>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default ServiceItem;

const styles = StyleSheet.create({
    serviceView:{
        height:60,
        width:'100%',
        flexDirection:'row',
        borderBottomWidth:1,
    },
    lockView:{
        justifyContent:'center',
        alignItems:'center',
        height:50,
        width:36,
    },
    lockIcon:{
        color:BLACK,
        fontSize:25
    },  
    serviceTitle:{
        maxWidth:150,
        fontSize:18,
        fontWeight:'bold',
        textAlign:'right',
        alignSelf:'flex-start',
    },
    timeInfo:{
        flexDirection:'row',
    },
    timeText:{
        maxWidth:140,
        fontSize:15,
        color:GRAY_TEXT
    },
    trashView:{
        position:'absolute',
        right:'5%',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        width:36,
    },
    trashIcon:{
        color:PURPLE_BACKGROUND,
        fontSize:25
    }
})