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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SCENCE_KEYS.PROFILE}>
        <Stack.Screen name={SCENCE_KEYS.PROFILE} component={Profile} />
        <Stack.Screen name={SCENCE_KEYS.SERVICES} component={Services} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
