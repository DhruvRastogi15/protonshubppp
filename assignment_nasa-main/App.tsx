import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
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
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#800080',
    accent: 'yellow',
  },
};
const App = () => {
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
    </PaperProvider>
  )
}

export default App