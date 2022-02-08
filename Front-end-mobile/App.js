/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/home';
import Login from './screens/login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './screens/createAccount';
import Header from './components/header';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen
            name='Home'
            component={Home}
          />
          <Drawer.Screen
            name='Login'
            component={Login}
          />
          <Drawer.Screen
            name='createAccount'
            component={CreateAccount}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
    /*<View style={styles.container}>
      <View style={styles.header} >
        <Header/>
      </View>
      <View style={styles.home} >
        <Home/>
      </View>
      <View style={styles.footer} >
        <Footer/>
      </View>
      <StatusBar style="auto" />
    </View>*/
  );
}

const styles = StyleSheet.create({

  text: {
    color: "black",
  }
});

export default App;