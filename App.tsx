import React from 'react';
// import MyComponent from './app/screens/MyComponent';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoffeeDetail from './app/component/CoffeeDetailComponent';
import SplashScreen from './app/screens/Splash';
import ChaiScreen from './app/screens/CoffeeScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="ChaiScreen" component={ChaiScreen} />
        {/* <Stack.Screen name="MyComponent" component={MyComponent} /> */}
        <Stack.Screen name="CoffeeDetail" component={CoffeeDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
