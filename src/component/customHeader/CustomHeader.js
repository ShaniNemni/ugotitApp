import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View,Text,StyleSheet} from 'react-native';
import { WHITE_COLOR } from '../../utils/localStorage/colors/Colors';
import SCENCE_KEYS from '../../scenes/scenesManager/SceneConsts';

export const GradientHeader = ({scenceName,displayOpacitiy})=>  {
    const displayText = scenceName === SCENCE_KEYS.SERVICES;
    const title = 'שירותים';
    const opacitiyView = displayOpacitiy ? {opacity:0.3} : undefined;
    return(
      <View style={[styles.container,opacitiyView]}>
        <LinearGradient
          colors={["#8B37FF","#EE00C8"]}
          start={{ x: 0, y: 1 }}end={{ x: 1, y: 1 }}
          style={styles.linearGradient}
        >
        {displayText &&  <Text style={styles.textHeader}>{title}</Text> }
        </LinearGradient>
    </View>
    )
}

const styles = StyleSheet.create({
    textHeader:{
      color:WHITE_COLOR,
      textAlign:'center',
      fontSize:40,
      fontWeight:'bold'
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    linearGradient: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 180,
      width:'100%'
    },
  
})
  