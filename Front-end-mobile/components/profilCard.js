import {API_URL} from "@env"
import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ProfilCard = ({userId,date}) => {
    const [userData,setUserData] = useState(null);

    const getUserData = async () => {
        try {
            const api = await fetch(API_URL + '/user/' + userId, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
              });
              const res = await api.json()
              setUserData(res);
        } catch (e) {
            console.log('error',e);
        }
    }

    useEffect(() => {
        if(!userData){getUserData();}
    },[userData])

  return (
    <TouchableOpacity style={styles.container} containerStyle={styles.containerStyle}>
      <Image
        style={styles.img}
        source={require('../test_content/waiting.jpg')}
      />
      <View style={styles.infoContainer}>
          <Text style={styles.name}>{userData ? userData.username : "..."}</Text>
          <Text style={styles.date}>{date && userData ? date : "..."}</Text>
      </View>
      <TouchableOpacity containerStyle={styles.buttonContainer}>
          <Text>Add</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ProfilCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerStyle:{
        height: 60,
        width: '95%',
        backgroundColor: '#869ECE',
        borderRadius: 10,
        justifyContent: 'center',
    },
    img:{
        margin: 5,
        width: 50,
        height:50,
        borderRadius:100,
    },
    infoContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 5,
        width: '60%'
    },
    buttonContainer: {
        backgroundColor: '#CE8686',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 70
    },
    name:{
        color: '#FFFFFF',
        fontSize: 15,
    },
    date:{
        color: '#BEC4D3',
        fontSize: 12
    }
    
})