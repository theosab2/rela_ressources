import { StyleSheet, Text, View, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';



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
        <View>

        </View>
        <View style={styles.profilCadre}>
          <Image
            style={styles.profilImage}
            source={require('../test_content/zombie.png')}
          />
        </View>
        
        <Text style={styles.text}>{userData.username}</Text>
        <Text style={styles.text}>{userData.email}</Text>
        <Text style={styles.text}>{userData.name}</Text>
        <Text style={styles.text}>{userData.firstname}</Text>
        <Text style={styles.text}>{userData.phone}</Text>
        <Text style={styles.text}>{userData.role}</Text>
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
  text: {
    color: "black"
  },
  profilCadre:{
    borderTopLeftRadius: 500,
    borderBottomLeftRadius:500,
    borderBottomRightRadius:500,
    borderTopRightRadius: 500,
    borderColor: '#2F4077',
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
