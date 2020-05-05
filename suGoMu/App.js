import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import store from "./store"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Home from './screens/home'
import Game from './screens/game'
import Finish from './screens/finish'

const Stack = createStackNavigator()

export default function App() {
  return (

    <Provider store={store}>


      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerStyle: { fontWeight: "bold" } }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Sudoku"
            component={Game}
          />
          <Stack.Screen
            name="Finish"
            component={Finish}
          />

        </Stack.Navigator>
      </NavigationContainer>

    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
