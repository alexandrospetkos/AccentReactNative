import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Routes from '../common/navigation/Routes';

// Screens
import HomeScreen from '../modules/home/Screens/Home/Home';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          cardStack: {gesturesEnabled: false},
          animation: 'none',
        }}
        initialRouteName={Routes.Home}
      >
        <Stack.Screen
          name={Routes.Home}
          component={HomeScreen}
          //options={{animation: 'fade_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;