import * as React from 'react';
import { StyleSheet,View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Services from './src/scenes/services/Services';
import Profile from './src/scenes/profile/Profile';

import SCENCE_KEYS from './src/scenes/scenesManager/SceneConsts';
import { PURPLE_BACKGROUND } from './src/utils/localStorage/colors/Colors';

const Stack = createStackNavigator();
export const GradientHeader = props => (
  <View style={[styles.header]}>

  </View>
)

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
    header:{
      height:180,
      zIndex:0,
      backgroundColor:PURPLE_BACKGROUND
    }
})