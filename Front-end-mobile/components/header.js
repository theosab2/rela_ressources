import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Header = ({ navigation }) => {
  const LoginState = async () => {
    try {
      const storedId = await AsyncStorage.getItem('@userId');
      if (storedId != null) {
        navigation.navigate('Auth', { screen: 'Account' })
      } else {
        navigation.navigate('Auth', { screen: 'Login' })
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View style={styles.container}>
      <Avatar
        size={55}
        icon={{ name: 'navicon', type: 'evilicon', size: 40 }}
        onPress={() => {
          console.log('Menu');
        }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ressources Relationnelles</Text>
      </View>
      <Avatar
        size={55}
        icon={{ name: 'user', type: 'evilicon', size: 40 }}
        onPress={() => LoginState()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%'
  },
  title: {
    textAlign: 'center',
  }
});

export default Header;
