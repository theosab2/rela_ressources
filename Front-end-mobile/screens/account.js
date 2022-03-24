import { StyleSheet, Text, View, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Account = () => {
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    const getLocalData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('@userId');
        if(storedId != null){
          getUserData(storedId)
        }else{
          
        }
      } catch (e) {
        console.log(e);
      }
    }
    const getUserData = async (storedId) => {
      try {
        const api = await fetch('http://192.168.1.80:3001/user/' + storedId, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const res = await api.json();
        console.log(res);
        setUserData(res);
      } catch (e) {
        console.log(e);
      }
    } 
    getLocalData();
  }, []);


  

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#869ece', '#ffffff' ]}
        style={styles.linearGradient}
        locations={[0, 1]}
      >
        <View
          style={styles.card}
        >
          <View style={styles.profilCadre}>
            <Image
              style={styles.profilImage}
              source={require('../test_content/zombie.png')}
            />
          </View>
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.name}>{userData.name} {userData.firstname}</Text>
          <Text style={styles.text}>{userData.email}</Text>
          <Text style={styles.text}>{userData.phone}</Text>
          <Text style={styles.text}>{userData.role}</Text>
        </View>
        <View style={styles.buttonList}>
          <TouchableOpacity containerStyle={styles.buttonContainerLeft} style={styles.buttonLeft}>
            <Icon
              name='people'
              type='ionicon'
              color='#bec4d3'
            />
            <Text style={styles.text}>Relations</Text>
          </TouchableOpacity>
          <TouchableOpacity containerStyle={styles.buttonContainer} style={styles.button}>
            <Icon
              name='pencil'
              type='ionicon'
              color='#bec4d3'
            />
            <Text style={styles.text}>Créations</Text>
          </TouchableOpacity>
          <TouchableOpacity containerStyle={styles.buttonContainerRight} style={styles.buttonRight}>
            <Icon
              name='chatbox-ellipses'
              type='ionicon'
              color='#bec4d3'
            />
            <Text style={styles.text}>Messages</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    height: '75%',
    width: '95%',
    backgroundColor: '#2F4077',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonList:{
    height: '20%',
    width: '95%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#2F4077',
    flexDirection:'row',
  },
  buttonContainer:{
    flex: 1,
    
  },
  buttonContainerLeft:{
    flex: 1,
    borderBottomLeftRadius: 10,
  },
  buttonContainerRight:{
    flex: 1,
    borderBottomRightRadius: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#869ece',
    borderWidth: 1,
    borderTopWidth:0,
  },
  buttonLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#869ece',
    borderWidth: 1,
    borderTopWidth:0,
    borderBottomLeftRadius: 10
  },
  buttonRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#869ece',
    borderWidth: 1,
    borderTopWidth:0,
    borderBottomRightRadius: 10
  },
  username:{
    fontSize: 30,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 20
  },
  text: {
    margin: 10
  },
  profilCadre:{
    borderTopLeftRadius: 500,
    borderBottomLeftRadius:500,
    borderBottomRightRadius:500,
    borderTopRightRadius: 500,
    borderColor: '#869ece',
    borderWidth:3,
    width: 215,
    height:215,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilImage:{
    borderTopLeftRadius: 500,
    borderBottomLeftRadius:500,
    borderBottomRightRadius:500,
    borderTopRightRadius: 500,
    width: 200,
    height:200
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  }
});
