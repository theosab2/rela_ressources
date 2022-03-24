import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const Card = props => {
  const [pseudo, setPseudo] = useState('');
  const [image, setImage] = useState(require('../test_content/waiting.jpg'))

  

  useEffect(() => {
    const getPseudoUser = async() => {
      const api = await fetch('http://10.176.131.87:3001/user/' + props.data.articleCreator, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const res = await api.json();
      setPseudo(res.username);
    }
    getPseudoUser();
  }, [])
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.navigate('Login')}>
      <View style={styles.containerPseudo}>
        <Text style={styles.pseudo} adjustsFontSizeToFit={true}>{pseudo}</Text>
      </View>
      <View style={styles.containerImg}>
        <Image 
        style={styles.img}
        source={image}
        />
      </View>
      <View style={styles.description}>
        <Text>{props.data.articleDescription}</Text>
      </View>
      <View style={styles.icone}>
        <Text>{props.data.articleNbLikes}</Text>
        <Text>ICO2</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    margin: 5,
  },
  containerImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    backgroundColor: "#2f4077",
    borderTopRightRadius: 10
  },
  description: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2f4077'
  },
  icone: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#2f4077',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  containerPseudo: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#2F4077',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pseudo: {
    
  },
  img:{
    backgroundColor: '#ffffff',
    width: '95%',
    height: '95%',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  }
});

export default Card;
