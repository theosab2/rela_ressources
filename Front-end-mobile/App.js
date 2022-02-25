/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import Home from './screens/home';
import Login from './screens/login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './screens/createAccount';
import Header from './components/header';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import CreatePost from './screens/createPost';
import PostSaved from './screens/postSaved';

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
const TabNavigation = ({navigation}) => {
  return(
    <Tab.Navigator
      initialRouteName='home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color}) => {
          let iconName;
          if (route.name === 'home') {
            iconName = focused
              ? 'newspaper'
              : 'newspaper-outline';
          }
          if (route.name === 'createPost'){
            iconName = focused
              ? 'add-circle'
              : 'add-circle-outline';
          } 
          if (route.name === 'postSaved'){
            iconName = focused
              ? 'folder-open'
              : 'folder-outline';
          } 

          // You can return any component that you like here!
          return <Icon name={iconName}
          type='ionicon'
          color={color} />;
        },
        tabBarActiveTintColor: '#2F4077',
        tabBarInactiveTintColor: '#869ECE',
      })}
    >
      <Tab.Screen name='home'
        component={Home}
        options={{
          headerLeft: props => (<Icon name='menu'
          type='ionicon'
          color='#869ECE'
          size={40}
          onPress={() => navigation.openDrawer()}/>),
          headerRight: () => (<Icon name='person-circle-outline'
          type='ionicon'
          color='#869ECE'
          size={40}
          onPress={() => navigation.navigate('Login')}/>),
          title: 'Fil d\'actus'
        }}
      />
      <Tab.Screen name='createPost'
        component={CreatePost}
        options={{
          headerLeft: props => (<Icon name='menu'
          type='ionicon'
          color='#869ECE'
          size={40}
          onPress={() => navigation.openDrawer()}/>),
          headerRight: () => (<Icon name='person-circle-outline'
          type='ionicon'
          color='#869ECE'
          size={40}
          onPress={() => navigation.navigate('Login')}/>),
          title: 'Créer une ressource'
        }}
      />
      <Tab.Screen name='postSaved'
        component={PostSaved}
        options={{
          headerLeft: () => (<Icon name='menu'
          type='ionicon'
          color='#869ECE'
          size={40}
          onPress={() => navigation.openDrawer()}/>),
          headerRight: () => (<Icon name='person-circle-outline'
          type='ionicon'
          color='#869ECE'
          size={40}
          onPress={() => navigation.navigate('Login')}/>),
          title: 'Vos ressources'
        }}
        screenOptions= {{
          
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
              title: 'Accueil',
              headerShown: false
            }}
          />
          <Drawer.Screen
            name='Login'
            component={StackAccount}
            options={{
              title: "Compte",
              headerShown: false
            }}
          />
        </Drawer.Navigator>
  )
}

const App = () => {

  useEffect(() => {
    LogBox.ignoreLogs([
      "[react-native-gesture-handler] ",
    ]);
  })
  
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