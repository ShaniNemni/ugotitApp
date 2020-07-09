import React,{useEffect} from 'react';
import {View,Image,Text,StyleSheet} from 'react-native';
import { getImage } from '../../utils/images/Images';

const appLogo = getImage("appLogo");
const Splash = ({setLoading}) => {

    useEffect(() =>{
        setLoading(false);
    })

    return(
        <View style={[styles.view]}>
            <Image source={appLogo} style={[styles.imageLogo]}/>
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    view:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    imageLogo:{
        width:150,
        height:150,
        resizeMode:'contain'
    }
})