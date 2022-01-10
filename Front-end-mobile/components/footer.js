import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Footer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Footer</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#B0B0B0',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
