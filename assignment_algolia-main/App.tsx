import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Details from './screens/Details';
const stack = createNativeStackNavigator();
const HomeStack = () => (
  <stack.Navigator initialRouteName="Home">
    <stack.Screen
      name="Home"
      component={Home}

    />
    <stack.Screen
      name="Detail"
      component={Details}

    />
  </stack.Navigator>

)

const App = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  )
}

export default App
