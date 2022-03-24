import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Card = props => {
  const [pseudo, setPseudo] = useState('');

  

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
      <View>
        <Text>{pseudo}</Text>
      </View>
      <View style={styles.img}>
        <Text>IMG</Text>
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
  img: {
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    display: 'flex',
    alignItems: 'center',
  },
  icone: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Card;
