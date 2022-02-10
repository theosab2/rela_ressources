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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const StackAccount = () => {
  return(
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name='Login' 
      component={Login} 
      />
      <Stack.Screen name='createAccount' 
      component={CreateAccount} 
      />
    </Stack.Navigator>
  )
}
const TabNavigation = () => {
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } 

          // You can return any component that you like here!
          return <Icon name='paperclip'
          type='evilicon'
          color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='home'
        component={Home}
        options={{
          title: 'Fil d\'actus'
        }}
      />
    </Tab.Navigator>
  )
}
const DrawerNavigation = () => {
  return(
    <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen
            name='Home'
            component={TabNavigation}
            options={{
              title: 'Ressource Relationnelle'
            }}
          />
          <Drawer.Screen
            name='Login'
            component={StackAccount}
            options={{
              title: "Ressource Relationnelle"
            }}
          />
        </Drawer.Navigator>
  )
}

const App = () => {
  return (
    <>
      <NavigationContainer>
        <DrawerNavigation/>
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