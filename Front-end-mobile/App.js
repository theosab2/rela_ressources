//import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/home';
import Login from './screens/login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './screens/createAccount';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
          />
          <Stack.Screen
            name='Login'
            component={Login}
          />
          <Stack.Screen
            name='createAccount'
            component={CreateAccount}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flex: 1,    
  },
  home: {
      flex: 8,
  },
  footer: {
      flex: 1,
  }
});

export default App;