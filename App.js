import * as React from 'react';
import { StyleSheet,View,Text,MaskedViewIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Services from './src/scenes/services/Services';
import Profile from './src/scenes/profile/Profile';

import SCENCE_KEYS from './src/scenes/scenesManager/SceneConsts';
import { PURPLE_BACKGROUND, WHITE_COLOR } from './src/utils/localStorage/colors/Colors';
import LinearGradient from 'react-native-linear-gradient';

/*<LinearGradient colors={["#8B37FF","#EE00C8"]} start={{ x: 0, y: 1 }}end={{ x: 1, y: 1 }} style={{height:180}}>
<Text style={[styles.textHeader]}>{title}</Text>
</LinearGradient>*/

const Stack = createStackNavigator();
export const GradientHeader = props =>  {
  const displayText = props && props.scene.route.name === SCENCE_KEYS.SERVICES;
  const title = 'שירותים';
  return(
    <View style={styles.container}>
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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={({navigation})=> ({
        header: props => <GradientHeader {...props} /> })} initialRouteName={SCENCE_KEYS.PROFILE}>
        <Stack.Screen name={SCENCE_KEYS.PROFILE} component={Profile} />
        <Stack.Screen name={SCENCE_KEYS.SERVICES} component={Services} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

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