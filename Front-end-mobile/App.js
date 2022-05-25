/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import Home from './screens/HomeStack/home';
import Login from './screens/AuthStack/login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Account from './screens/AuthStack/account';
import CreatePost from './screens/AddStack/createPost';
import PostSaved from './screens/SavedStack/postSaved';
import Post from './screens/HomeStack/post';
import IdSetting from './screens/AuthStack/idSetting';
import PwdSetting from './screens/AuthStack/pwdSetting';
import CoorSetting from './screens/AuthStack/coorSetting';
import CreateContentPost from './screens/AddStack/createContentPost';
import Settings from './screens/AuthStack/settings';

const Stack = createStackNavigator();
const HomeStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name='home'
        component={Home}
      />
      <Stack.Screen
        name='Post'
        component={Post}
      />
    </Stack.Navigator>
  )
}
const RelationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name='Relation'
        component={Home}
      />
    </Stack.Navigator>
  )
}
const AddStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name='CreatePost'
        component={CreatePost}
      />
      <Stack.Screen
        name='CreateContentPost'
        component={CreateContentPost}
      />
    </Stack.Navigator>
  )
}
const SaveStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true
      }}>
      <Stack.Screen
        name='MyPost'
        component={PostSaved}
      />
    </Stack.Navigator>
  )
}
const MsgStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true
      }}>
      <Stack.Screen
        name='account'
        component={Home}
      />
    </Stack.Navigator>
  )
}
const AuthStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name='Login'
        component={Login}
      />
      <Stack.Screen
        name='IdSetting'
        component={IdSetting}
      />
      <Stack.Screen
        name='PwdSetting'
        component={PwdSetting}
      />
      <Stack.Screen
        name='CoorSetting'
        component={CoorSetting}
      />
      <Stack.Screen
        name='Account'
        component={Account}
      />
      <Stack.Screen
        name='Settings'
        component={Settings}
      />
    </Stack.Navigator>
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
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name='Home'
            component={HomeStack}
          />
          <Stack.Screen
            name='NewPost'
            component={AddStack}
          />
          <Stack.Screen
            name='SavedPost'
            component={PostSaved}
          />
          <Stack.Screen
            name='Auth'
            component={AuthStack}
          />
          <Stack.Screen
            name='Save'
            component={SaveStack}
          />
          <Stack.Screen
            name='Msg'
            component={MsgStack}
          />
          <Stack.Screen
            name='Relation'
            component={RelationStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

  text: {
    color: "black",
  }
});

export default App;