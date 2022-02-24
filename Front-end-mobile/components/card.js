import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Card = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.navigate('Login')}>
      <View>
        <Text>User</Text>
      </View>
      <View style={styles.img}>
        <Text>IMG</Text>
      </View>
      <View style={styles.description}>
        <Text>Description</Text>
      </View>
      <View style={styles.icone}>
        <Text>ICO1</Text>
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
