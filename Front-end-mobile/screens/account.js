import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Account = () => {
  const [userId, setUserId] = useState('loading');
  const [userData, setUserData] = useState({});

  const getLocalData = async () => {
    try {
      const userId = await AsyncStorage.getItem('@userId');
      setUserId(userId != null ? userId : null)
      getUserData()
    } catch (e) {
      console.log('error1 = ' + e);
    }
  }

  const getUserData = async () => {
    try {
      console.log("userId = " + userId);
      const api = await fetch('http://192.168.1.80:3001/user/' + userId, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const res = await api.json();
      //console.log(res);
      //setUserData(res);
      //console.log(res);
    } catch (e) {
      console.log('error2 = ' + e);
    }
  }

  getLocalData()


  return (
    <View style={styles.container}>
      <Text style={styles.text}>{userData.username}</Text>
      <Text style={styles.text}>{userData.email}</Text>
      <Text style={styles.text}>{userData.name}</Text>
      <Text style={styles.text}>{userData.firstname}</Text>
      <Text style={styles.text}>{userData.phone}</Text>
      <Text style={styles.text}>{userData.role}</Text>
      <Text style={styles.text}>{userData.location.region}</Text>
      <Text style={styles.text}>{userData.location.ville}</Text>
      <Text style={styles.text}>{userData.location.zip}</Text>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  text: {
    color: "black"
  }
});
