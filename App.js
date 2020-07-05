import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Services from './src/scenes/services/Services';
import Profile from './src/scenes/profile/Profile';

import SCENCE_KEYS from './src/scenes/scenesManager/SceneConsts';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCENCE_KEYS.PROFILE}>
        <Stack.Screen name={SCENCE_KEYS.PROFILE} component={Profile} />
        <Stack.Screen name={SCENCE_KEYS.SERVICES} component={Services} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
