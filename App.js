import * as React from 'react';
import {useState} from 'react';
import { StyleSheet,View,Text,MaskedViewIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Services from './src/scenes/services/Services';
import Profile from './src/scenes/profile/Profile';
import Splash from './src/scenes/splash/Splash';

import SCENCE_KEYS from './src/scenes/scenesManager/SceneConsts';

const Stack = createStackNavigator();

function App() {
  const [loading,setLoading] = useState(true);

  const renderSplash = () => {
    return <Splash setLoading={setLoading}/>
  }

  const renderStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SCENCE_KEYS.PROFILE}>
          <Stack.Screen name={SCENCE_KEYS.PROFILE} component={Profile} />
          <Stack.Screen name={SCENCE_KEYS.SERVICES} component={Services} />
        </Stack.Navigator>
      </NavigationContainer>
    );  
  }

  

  const renderByState = () => {
    if(loading) {
        return renderSplash();
    }
    return renderStack();
  }

  return renderByState()
}

export default App;
